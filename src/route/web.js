import express from "express";
import homeController from "../controllers/homeController"
let router = express.Router();

let initWebRouters = (app) => {
    // router.get('/', (req, res) => {
    //     return res.send('Hello world')
    // });

    // router.get('/tung', (req, res) => {
    //     return res.send('Hello Tung')
    // });
    router.get('/', homeController.getHomePage);
    // truy van du lieu theo mo hình MVC
    router.get('/about', homeController.getAboutPage);

    router.get('/crud', homeController.getCrud);

    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.getCRUD);
    router.get('/edit-crud', homeController.editCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    return app.use("/", router);
}

module.exports = initWebRouters;