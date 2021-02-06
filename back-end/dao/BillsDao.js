const daoHelper = require('../utils/daoHelper');

module.exports = {
    funGetPersonalExpenses: async function (emailID) {
        const returnList = await daoHelper.getAll('user_personal_expenses', {user_id:emailID});
        return daoHelper.sendSuccess('User expenses found', returnList);
    }
}