const pool = require("@/config/database");

const taskModel = {
  finAll: async (limit, offset, filter) => {
    const queryStr = Object.entries(filter).map(([key, value]) => {
      value = typeof value === "number" ? value : `"${value}"`;
      return `${key} = ${value}`;
    }).join(" and ");

    console.log(queryStr);
    

    const [rows, field] = await pool.query(
      `select * from tasks ${queryStr ? `where ${queryStr}` : ""} limit ${limit} offset ${offset}`
    );
    return rows;
  },

  findOne: async (id) => {
    const [rows] = await pool.query(`select * from tasks where id = ${id}`);
    if (rows.length) return rows;
    else return null;
  },

  create: async (taskData) => {
    const [rows] = await pool.query(
      `insert into tasks (title) values ("${taskData.title}")`
    );
    return rows;
  },

  update: async (id, taskData) => {
    const [rows] = await pool.query(
      `update tasks set title = "${taskData.title}" where id = ${id}`
    );
    return rows;
  },

  destroy: async (id) => {
    const [rows] = await pool.query(`delete from tasks where id = ${id}`);
    return rows;
  },

  count: async () => {
    const [total] = await pool.query("select count(*) as count from tasks");
    return total[0].count;
  },
};

module.exports = taskModel;
