import db from '../models/index';
import CrudService from '../services/CrudService';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        // console.log('------------------')
        // console.log(data)
        // console.log('------------------')
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        })
    }
    catch (e) {
        console.log(e)
    }
}

let getAboutPage = (req, res) => {
    return res.render('./test/about.ejs')
}
let getCrud = (req, res) => {
    return res.render('./test/crud.ejs')
}

let postCRUD = async (req, res) => {
    let message = await CrudService.createNewUser(req.body);
    // console.log(message);
    return res.send(message)
}

let getCRUD = async (req, res) => {
    let data = await CrudService.getAllUser();
    // console.log('----------')
    // console.log(data)
    // console.log('----------')
    return res.render('displayCRUD.ejs', {
        datatable: data,
    })
}
let editCRUD = async (req, res) => {
    let userId = req.query.id
    if (userId) {
        let userData = await CrudService.getUserbyId(userId);
        // console.log('-----------')
        // console.log(userData)
        // console.log('-----------')
        return res.render('editCRUD.ejs', {
            data: userData,
        })
    }
    else {
        return res.send('User not found!')
    }
}
let putCRUD = async (req, res) => {
    let data = req.body;
    // console.log(data);
    let alluser = await CrudService.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        datatable: alluser,
    });
}

let deleteCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let alluser = await CrudService.deleteUserData(userId);
        return res.render('displayCRUD.ejs', {
            datatable: alluser,
        });
        // await CrudService.deleteUserData(userId);
        // return res.send('haha!')
    }
    else {
        return res.send('hehe!')
    }
}
module.exports = {
    // day la 1 object, trong js thi moi object se chua key va value
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCrud: getCrud,
    postCRUD: postCRUD,
    getCRUD: getCRUD,
    editCRUD: editCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}