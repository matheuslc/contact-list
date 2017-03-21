import express, { Router } from 'express';

Router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
