const { isAuth } = require("../common/auth");
const { logger } = require("../common/log");

// postgresql сонгосон бол доорх мөрийн uncomment
const {
  getCategories,
  insertCategories,
  updateCategories,
  deleteCategories
} = require("../logic/categories");

module.exports = function (app, connection) {
  /**
   * GET - Жагсаалт авах, ямар нэг дата харахад ашиглана => app.get()
   * POST - Login, Create дээр ашиглана => app.post()
   * PUT - Update буюу дата засахад ашиглана => app.put()
   * DELETE - Устгахад ашиглана => app.delete()
   */


  // endpoints
  app.get("/api/categories", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /categories [get]`);

      getCategories(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/categories", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /categories [post]`);
      insertCategories(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/categories", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /categories [put]`);
      updateCategories(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/categories", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /categories [delete]`);
      deleteCategories(req, res, connection);
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
