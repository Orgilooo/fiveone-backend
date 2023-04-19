const { logger } = require("../common/log");
const { calcToken } = require("../common/auth");

const getCoupon = async (request, response, pool) => {
  try {
    const result = await pool.query("SELECT * FROM coupon");
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

const insertCoupon = async (request, response, pool) => {
  try {
    const { company_id, category_id, coupon_limit, free, start_date, status, img, description } = request.body;
    await pool.query(
      "INSERT INTO coupon ( company_id, category_id, coupon_limit, free, start_date, status, img, description ) values ($1, $2, $3, $4, $5, $6, $7, $8)",
      [ company_id, category_id, coupon_limit, free, start_date, status, img, description ]
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

const updateCoupon = async (request, response, pool) => {
  try {
    const { company_id, category_id, coupon_limit, free, start_date, status, img, description, id } = request.body;
    await pool.query(
      "UPDATE coupon SET company_id=COALESCE($1, company_id), category_id=COALESCE($2, category_id), coupon_id=COALESCE($3, coupon_id), free=COALESCE($4, free), start_date=COALESCE(5, start_date), status=COALESCE($6, status), img=COALESCE($7, img), description=COALESCE($8, description), where id = $9 ",
      [ company_id, category_id, coupon_limit, free, start_date, status, img, description ]
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

const deleteCoupon = async (request, response, pool) => {
  try {
    const { id } = request.body;
    console.log("id: ", id);
    await pool.query("DELETE FROM Coupon WHERE id = $1", [id]);
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
  getCoupon,
  insertCoupon,
  deleteCoupon,
  updateCoupon
};
