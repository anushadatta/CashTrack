const daoHelper = require('../utils/daoHelper');
const collections = require('../utils/collections');

module.exports = {
    funGetUserInfo: async function (user_id) {
        const returnList = await daoHelper.getOne(collections.USERS, {user_id:user_id});
        return daoHelper.sendSuccess('User info found', returnList);
    },

    funUpdateInfo: async function (user_id, body) {
        console.log(body);
        const returnList = await daoHelper.updateOne(collections.USERS, {user_id:user_id}, body);
        return daoHelper.sendSuccess('User info updated', returnList['ops']);
    },

    funCreateUser: async function (body) {
        console.log(body);
        const returnList = await daoHelper.insertOne(collections.USERS, body);
        return daoHelper.sendSuccess('User created', returnList['ops']);  
    }
}