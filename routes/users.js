var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

/* Registration page */
router.get('/register', (req, res) => {
  res.send(req.method + " " + req.originalUrl);
});

/* Register user api */
router.post('/register', (req, res) => {
  res.send(req.method + " " + req.originalUrl);
});

/* User profile page */
router.get('/profile', (req, res) => {
  res.send(req.method + " " + req.originalUrl);
});

/* Detele user api */
router.delete('/', (req, res) => {
  res.send(req.method + " " + req.originalUrl);
});

/* Login */
router.get('/login', (req, res) => {
  res.send(req.method + " " + req.originalUrl);
});

/* Login api */
router.post('/login', (req, res) => {
  res.send(req.method + " " + req.originalUrl);
});

module.exports = router;