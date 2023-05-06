const { logger } = require("../common/log");
const { calcToken } = require("../common/auth");

const getCoupon = async (request, response, pool) => {
  try {
    const result = await pool.query(`SELECT a.*, b.company_name, b.img as company_img FROM coupon a 
    left join company b on a.company_id = b.id `);
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
    const {id} = request.params
    const result = await pool.query(`select * from company where id = $1`,[id] );
    const coupons = await pool.query(`select * from coupon where company_id = $1`,[id] );
    const { company_id, category_id, coupon_limit, start_date, end_date, free, status, img, description, name, company_img } = request.body;
    await pool.query(
      "INSERT INTO coupon ( company_id, category_id, coupon_limit, start_date, end_date, free, status, img, description, name, company_img ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
      [ company_id, category_id, coupon_limit, start_date, end_date, free, status, img, description, name, company_img ]
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
    const { company_id, category_id, coupon_limit, start_date, end_date, free, status, img, description, name, company_img, id } = request.body;
   console.log(id, status)
    await pool.query(
      "UPDATE coupon SET company_id=COALESCE($1, company_id), category_id=COALESCE($2, category_id), coupon_limit=COALESCE($3, coupon_limit), start_date=COALESCE($4, start_date), end_date=COALESCE($5, end_date), free=COALESCE($6, free), status=COALESCE($7, status), img=COALESCE($8, img), description=COALESCE($9, description), name=COALESCE($10, name), company_img=COALESCE($11, company_img) where id = $12 ",
      [ company_id, category_id, coupon_limit, start_date, end_date, free, status, img, description, name, company_img, id ]
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
