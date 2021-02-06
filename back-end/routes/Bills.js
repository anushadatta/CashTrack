const router = require('express').Router();
const billsDao = require('../dao/BillsDao');

router.get('/getPersonalExp/:email', async function (req, res) {
    const result = await billsDao.funGetPersonalExpenses(req.params.email);
    res.status(result.status).send(result.msg);
  });

module.exports = router;