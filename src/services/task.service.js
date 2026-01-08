const taskModel = require("@/models/task.model");
const paginationService = require("@/services/pagination.service");

class TaskService {
  model = taskModel;

  constructor() {
    paginationService.apply(this);
  }
}

module.exports = new TaskService();
