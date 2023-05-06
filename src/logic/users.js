const { logger } = require("../common/log");
const { calcToken } = require("../common/auth");

const getusers = async (request, response, pool) => {
  try {
    const result = await pool.query("SELECT * FROM users");
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

const insertusers = async (request, response, pool) => {
  try {
    const { firstname, lastname, username, password, phone_number, email, created_date, gender, img } = request.body;
    await pool.query(
      "INSERT INTO users ( firstname, lastname, username, password, phone_number, email, created_date, gender, img ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      [ firstname, lastname, username, password, phone_number, email, created_date, gender, img]
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

const updateusers = async (request, response, pool) => {
  try {
    const { firstname, lastname, username, password, phone_number, email, created_date, gender, img, id} = request.body;
    await pool.query(
      "UPDATE users SET firstname=COALESCE($1, firstname), lastname=COALESCE($2, lastname), username=COALESCE($3, username), password=COALESCE($4, password), phone_number=COALESCE($5, phone_number), email=COALESCE($6, email), created_date=COALESCE($7, created_date), gender=COALESCE($8, gender), img=COALESCE($9, img) where id = $10",
      [ firstname, lastname, username, password, phone_number, email, created_date, gender, img, id]
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

const deleteusers = async (request, response, pool) => {
  try {
    const { id } = request.body;
    console.log("id: ", id);
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
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
  getusers,
  insertusers,
  deleteusers,
  updateusers
};
