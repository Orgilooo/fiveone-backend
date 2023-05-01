const { logger } = require("../common/log");
const { calcToken } = require("../common/auth");

const getAdvertisement = async (request, response, pool) => {
  try {
    const result = await pool.query("SELECT * FROM advertisement");
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

const insertAdvertisement = async (request, response, pool) => {
  try {
    const { video_link, duration, status, question, answers, correct_answer, filled_answer } = request.body;
    await pool.query(
      "INSERT INTO advertisement ( video_link, duration, status, question, answers, correct_answer, filled_answer) values ($1, $2, $3, $4, $5, $6, $7)",
      [ video_link, duration, status, question, answers, correct_answer, filled_answer]
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

const updateAdvertisement = async (request, response, pool) => {
  try {
    const { video_link, date, duration, status, question, answers, correct_answer, filled_answer, id } = request.body;
    await pool.query(
      "UPDATE advertisement SET video_link=COALESCE($1, video_link), date=COALESCE($2, date), duration=COALESCE($3, duration), status=COALESCE($4, status), question=COALESCE($5, question), answers=COALESCE($6, answers), correct_answer=COALESCE($7, correct_answer), filled_answer=COALESCE($8, filled_answer) where id = $9",
      [ video_link, date, duration, status, question, answers, correct_answer, filled_answer, id]
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

const deleteAdvertisement = async (request, response, pool) => {
  try {
    const { id } = request.body;
    console.log("id: ", id);
    await pool.query("DELETE FROM advertisement WHERE id = $1", [id]);
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
  getAdvertisement,
  insertAdvertisement,
  deleteAdvertisement,
  updateAdvertisement
};
