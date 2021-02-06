const router = require('express').Router();
const billsDao = require('../dao/BillsDao');

router.get('/getPersonalExp/:email', async function (req, res) {
    const result = await billsDao.funGetPersonalExpenses(req.params.email);
    res.status(result.status).send(result.msg);
  });

router.get('/getSharedExp/author/:email', async function (req, res) {
  const result = await billsDao.funGetSharedExpAuthor(req.params.email);
  res.status(result.status).send(result.msg); 
});

router.get('/getSharedExp/payer/:email', async function (req, res) {
  const result = await billsDao.funGetSharedExpPayer(req.params.email);
  res.status(result.status).send(result.msg);
})

router.post('/createPersonalExp', async function (req, res) {
  const result = await billsDao.funCreatePersonalExp(req.body);
  res.status(result.status).send(result.msg);
})

module.exports = router;