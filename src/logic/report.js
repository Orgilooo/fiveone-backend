const { logger } = require("../common/log");
const { calcToken } = require("../common/auth");

const getreport = async (request, response, pool) => {
  try {
    const result = await pool.query("SELECT * FROM report");
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

const insertreport = async (request, response, pool) => {
  try {
    const { comment, company_id, upload_date  } = request.body;
    await pool.query(
      "INSERT INTO report ( comment, company_id, upload_date) values ($1, $2, $3)",
      [ comment, company_id, upload_date]
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

const updatereport = async (request, response, pool) => {
  try {
    const { comment, company_id, upload_date, id } = request.body;
    await pool.query(
      "UPDATE report SET comment=COALESCE($1, comment), company_id=COALESCE($2, company_id), upload_date=COALESCE($3, upload_date), where id = $4",
      [ comment, company_id, upload_date, id]
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

const deletereport = async (request, response, pool) => {
  try {
    const { id } = request.body;
    console.log("id: ", id);
    await pool.query("DELETE FROM report WHERE id = $1", [id]);
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
  getreport,
  insertreport,
  deletereport,
  updatereport
};
