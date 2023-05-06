const { isAuth } = require("../common/auth");
const { logger } = require("../common/log");

// postgresql сонгосон бол доорх мөрийн uncomment
const {
  getlogin,
  insertUser,
  updateusers,
  deleteusers,
  login,
} = require("../logic/login");

module.exports = function (app, connection) {
  /**
   * GET - Жагсаалт авах, ямар нэг дата харахад ашиглана => app.get()
   * POST - Login, Create дээр ашиглана => app.post()
   * PUT - Update буюу дата засахад ашиглана => app.put()
   * DELETE - Устгахад ашиглана => app.delete()
   */

  app.post("/api/login", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/login [POST]`);

      login(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  // endpoints
  app.get("/api/users", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /users [get]`);

      getlogin(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/login", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /login [post]`);
      insertlogin(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/login", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /login [put]`);
      updatelogin(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/login", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /login [delete]`);
      deletelogin(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  // blog API
  app.post("/api/blog", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /blog [post]`);
      insertBlog(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/blog", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /blog [get]`);

      getBlog(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
};
