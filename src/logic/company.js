const { logger } = require("../common/log");
const { calcToken } = require("../common/auth");

const getCompany = async (request, response, pool) => {
  try {
    const result = await pool.query("select * from company");
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

const getCompanyDetail = async (request, response, pool) => {
  try {
    const {id} = request.params
    const result = await pool.query(`select * from company where id = $1`,[id] );
    const coupons = await pool.query(`select * from coupon where company_id = $1`,[id] );

    return response.status(200).json({
      company: result.rows[0],
      coupons: coupons.rows,
      token: request.token,
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};

const insertCompany = async (request, response, pool) => {
  try {
    const { company_id, company_name, password, email, phone_number, address, register, img, description  } = request.body;
    await pool.query(
      "INSERT INTO company ( company_name, password, email, phone_number, address, register, img, description) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      [ company_id, company_name, password, email, phone_number, address, register, img, description]
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

const updateCompany = async (request, response, pool) => {
  try {
    const {  company_id, company_name, password, email, phone_number, address, register, img, description, id } = request.body;
    await pool.query(
      "UPDATE company SET company_id=COALESCE($1, company_id), company_name=COALESCE($2, company_name), password=COALESCE($3, password), email=COALESCE($4, email), phone_number=COALESCE($5, phone_number), address=COALESCE($6, address), register=COALESCE($7, register), img=COALESCE($8, img), description=COALESCE($9, description) where id = $10",
      [ company_id, company_name, password, email, phone_number, address, register, img, description, id]
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

const deleteCompany = async (request, response, pool) => {
  try {
    const { id } = request.body;
    console.log("id: ", id);
    await pool.query("DELETE FROM company WHERE id = $1", [id]);
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
  getCompany,
  insertCompany,
  deleteCompany,
  updateCompany,
  getCompanyDetail
};
