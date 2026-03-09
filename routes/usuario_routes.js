const express = require('express');
const router = express.Router();

router.get('/login-pacientes', (req, res) => {
    res.render('login-pacientes')
});

module.exports = router;