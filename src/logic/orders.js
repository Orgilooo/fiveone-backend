const { logger } = require("../common/log");
const { calcToken } = require("../common/auth");

const getOrders = async (request, response, pool) => {
  try {
    const result = await pool.query("SELECT * FROM orders");
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

const insertOrders = async (request, response, pool) => {
  try {
    const { customer_id, coupon_id, created_date, status  } = request.body;
    await pool.query(
      "INSERT INTO orders ( customer_id, coupon_id, created_date, status) values ($1, $2, $3, $4)",
      [ customer_id, coupon_id, created_date, status]
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

const updateOrders = async (request, response, pool) => {
  try {
    const { customer_id, coupon_id, created_date, status, id } = request.body;
    await pool.query(
      "UPDATE orders SET customer_id=COALESCE($1, customer_id), coupon_id=COALESCE($2, coupon_id), created_date=COALESCE($3, created_date), status=COALESCE($4, status) where id = $5",
      [ customer_id, coupon_id, created_date, status, id]
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

const deleteOrders = async (request, response, pool) => {
  try {
    const { id } = request.body;
    console.log("id: ", id);
    await pool.query("DELETE FROM orders WHERE id = $1", [id]);
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
  getOrders,
  insertOrders,
  deleteOrders,
  updateOrders
};
