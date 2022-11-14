const express = require("express");
const productsRouter = express.Router();
const productsController = require("../controllers/productsController");
const { expressjwt: checkJwt } = require("express-jwt");

productsRouter.get("/", productsController.index);
module.exports = productsRouter;