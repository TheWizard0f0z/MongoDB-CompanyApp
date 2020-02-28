const express = require('express');
const router = express.Router();

const DepartmentController = require('../controllers/departments.controller');

router.get('/departments', DepartmentController.getAll);
router.get('/departments/random', DepartmentController.getRandom);
router.get('/departments/:id', DepartmentController.getOneById);
router.post('/departments', DepartmentController.postOne);
router.put('/departments/:id', DepartmentController.updateOneById);
router.delete('/departments/:id', DepartmentController.deleteOneById);

module.exports = router;
