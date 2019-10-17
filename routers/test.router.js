const express = require('express');
const router = express.Router();
const testController = require('../controllers/test.controller');

// Movies CRUD Operations
router.get('/test/:id', testController.formGetByID);
router.post('/test/add', testController.formPost);

module.exports = router;