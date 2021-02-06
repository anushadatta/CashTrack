const daoHelper = require('../utils/daoHelper');

module.exports = {
    funGetUserInfo: async function (user_id) {
        const returnList = await daoHelper.getOne('users', {user_id:user_id});
        return daoHelper.sendSuccess('User info found', returnList);
    },

    funUpdateInfo: async function (user_id, body) {
        console.log(body);
        const returnList = await daoHelper.updateOne('users', {user_id:user_id}, body);
        return daoHelper.sendSuccess('User info updated', []);
    },

    funCreateUser: async function (body) {
        console.log(body);
        const returnList = await daoHelper.insertOne('users', body);
        return daoHelper.sendSuccess('User created', returnList['ops']);  
    }
}