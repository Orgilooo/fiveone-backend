const { logger } = require("../common/log");
const { calcToken } = require("../common/auth");

const getCategories = async (request, response, pool) => {
  try {
    const result = await pool.query("SELECT * FROM categories");
    return response.status(200).json({
      data: result.rows,
      token: request.token,
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};

const insertCategories = async (request, response, pool) => {
  try {
    const { name, description  } = request.body;
    await pool.query(
      "INSERT INTO categories ( name, description) values ($1, $2)",
      [ name, description]
    );
    return response.status(200).json({
      message: "success",
      token: request.token,
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};

const updateCategories = async (request, response, pool) => {
  try {
    const { name, description, id } = request.body;
    await pool.query(
      "UPDATE categories SET name=COALESCE($1, name), description=COALESCE($2, description) where id = $3",
      [ name, description, id]
    );
    return response.status(200).json({
      message: "success",
      token: request.token,
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};

const deleteCategories = async (request, response, pool) => {
  try {
    const { id } = request.body;
    console.log("id: ", id);
    await pool.query("DELETE FROM categories WHERE id = $1", [id]);
    return response.status(200).json({
      message: "success",
      token: request.token,
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};

module.exports = {
  getCategories,
  insertCategories,
  deleteCategories,
  updateCategories
};
