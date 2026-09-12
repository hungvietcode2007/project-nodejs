const path = require("path");
const express = require("express");
const expressEjsLayouts = require("express-ejs-layouts");
const configViewEngine = (app) => {
  app.set("views", path.join(__dirname, "../view"));
  app.set("view engine", "ejs");
  app.use(expressEjsLayouts);
  app.set("layout", "layout/main");
  app.use(express.static(path.join(__dirname, "../public")));
};
module.exports = configViewEngine;
