import express from "express";

let configViewEngine = (app) => {
    // day goi la arrow function
    app.use(express.static("./src/public"));
    app.set("view engine", "ejs");
    app.set("views", "./src/views")
}


module.exports = configViewEngine;
