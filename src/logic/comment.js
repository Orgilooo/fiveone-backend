const { logger } = require("../common/log");
const { calcToken } = require("../common/auth");

const getcomment = async (request, response, pool) => {
  try {
    const result = await pool.query("SELECT * FROM comment");
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

const insertcomment = async (request, response, pool) => {
  try {
    const { comment, upload_date, user_id, company_id, username } = request.body;
    await pool.query(
      "INSERT INTO comment ( comment, upload_date, user_id, company_id, username) values ($1, $2, $3,$4, $5)",
      [ comment, upload_date, user_id, company_id, username ]
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

const updatecomment = async (request, response, pool) => {
  try {
    const { comment, upload_date, user_id, company_id, username, id } = request.body;
    await pool.query(
      "UPDATE comment SET comment=COALESCE($1, comment), upload_date=COALESCE($2, upload_date), user_id=COALESCE($3, user_id), company_id=COALESCE($4, company id), username=COALESCE($5, username) where id = $6",
      [ comment, upload_date, user_id, company_id, username, id ]
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

const deletecomment = async (request, response, pool) => {
  try {
    const { id } = request.body;
    console.log("id:", id);
    await pool.query("DELETE FROM comment WHERE id = $1", [id]);
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
  getcomment,
  insertcomment,
  deletecomment,
  updatecomment
};
