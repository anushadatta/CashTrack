const router = require('express').Router();
const usersDao = require('../dao/UsersDao');

router.get('/getInfo/:user_id', async function (req, res) {
    const result = await usersDao.funGetUserInfo(req.params.user_id);
    res.status(result.status).send(result.msg);
  });

router.put('/updateInfo/:user_id', async function (req, res) {
    const result = await usersDao.funUpdateInfo(req.params.user_id, req.body);
    res.status(result.status).send(result.msg);
});

router.post('/createUser', async function (req, res) {
    const result = await usersDao.funCreateUser(req.body);
    res.status(result.status).send(result.msg);
})

module.exports = router;