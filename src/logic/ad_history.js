const { logger } = require("../common/log");
const { calcToken } = require("../common/auth");

const getAd_history = async (request, response, pool) => {
  try {
    const result = await pool.query("SELECT * FROM ad_history");
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

const insertAd_history = async (request, response, pool) => {
  try {
    const { user_id, ad_id } = request.body;
    await pool.query(
      "INSERT INTO ad_history ( user_id, ad_id ) values ($1, $2)",
      [ user_id, ad_id ]
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

const updateAd_history = async (request, response, pool) => {
  try {
    const { user_id, ad_id, id } = request.body;
    await pool.query(
      "UPDATE ad_history SET user_id=COALESCE($1, user_id), ad_id=COALESCE($2, ad_id) where id = $3",
      [ user_id, ad_id, id ]
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

const deleteAd_history = async (request, response, pool) => {
  try {
    const { id } = request.body;
    console.log("id: ", id);
    await pool.query("DELETE FROM ad_history WHERE id = $1", [id]);
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
  getAd_history,
  insertAd_history,
  deleteAd_history,
  updateAd_history
};
