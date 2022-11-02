import bcrypt from 'bcryptjs';
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await hashpassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPassword,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender,
                roleId: data.roleId,
            })
            resolve('Ok created a new user successfully')
        }
        catch (e) {
            reject(e)
        }
    });
}

let hashpassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hash = bcrypt.hashSync("password", salt);
            resolve(hash);
        }
        catch (e) {
            reject(e);
        }
    })
}
let getAllUser = () => {
    return new Promise((resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users)
        }
        catch (e) {
            reject(e)
        }
    })
}
let getUserbyId = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            })
            if (user) {
                resolve(user)
            }
            else {
                resolve({})
            }
        }
        catch (e) {
            reject(e)
        }
    })
}
let updateUserData = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                let alluser = await db.User.findAll({
                    raw: true,
                })
                resolve(alluser)
            }
            else {
                resolve()
            }
        }
        catch (e) {
            reject(e)
        }
    })
}
let deleteUserData = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.User.destroy({
                where: { id: userId },
            });
            let alluser = await db.User.findAll({
                raw: true,
            })
            resolve(alluser)
        }
        catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserbyId: getUserbyId,
    updateUserData: updateUserData,
    deleteUserData: deleteUserData,
}