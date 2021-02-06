const daoHelper = require('../utils/daoHelper');
const collections = require('../utils/collections');

module.exports = {
    funGetPersonalExpenses: async function (emailID) {
        const returnList = await daoHelper.getAll(collections.PERSONAL_EXPENSES, {user_id:emailID});
        return daoHelper.sendSuccess('User expenses found', returnList);
    },

    funGetSharedExpAuthor: async function (emailID) {
        const returnList = await daoHelper.getAll(collections.SHARED_EXPENSES, {author:emailID});
        return daoHelper.sendSuccess('Shared author exp found', returnList);
    },

    funGetSharedExpPayer: async function (emailID) {
        const returnList = await daoHelper.getAll(collections.SHARED_EXPENSES, {'payer.user_id':{$eq:emailID}});
        return daoHelper.sendSuccess('Shared payer expenses found', returnList);
    },

    funCreatePersonalExp: async function (body) {
        console.log(body);
        const returnList = await daoHelper.insertOne(collections.PERSONAL_EXPENSES, body);
        return daoHelper.sendSuccess('User created', returnList['ops']);  
    },

    funUpdatePersonalExp: async function (user_id, bill_id, body) {
        console.log('updating record for: ', user_id);
        const returnList = await daoHelper.updateOne(collections.PERSONAL_EXPENSES, {bill_id:parseInt(bill_id)}, body);
        return daoHelper.sendSuccess('Personal Exp info updated', returnList['ops']);
    },

    funDeletePersonalExp: async function (user_id, bill_id) {
        const returnList = await daoHelper.deleteOne(collections.PERSONAL_EXPENSES, {bill_id:parseInt(bill_id)});
        return daoHelper.sendSuccess('Personal Exp deleted', returnList['ops']);
    }
}