class PaginationService {
  apply(service) {
    if (!service.model) {
      throw Error("Model is require for pagination");
    }
    service.pagination = async (pageCount, limitCount, filter) => {
      const page = pageCount || 1;
      const limit = limitCount < 500 ? limitCount : 500;
      const offset = (page - 1) * limit;
      const tasks = await service.model.finAll(limit, offset, filter);
      const total = await service.model.count();
      const pagination = {
        current_page: page,
        total: total,
        per_page: limit,
      };
      if (tasks.length) {
        pagination.from = offset + 1;
        pagination.to = offset + tasks.length;
      }
      return {
        tasks,
        pagination,
      };
    };
  }
}

module.exports = new PaginationService();
