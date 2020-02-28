const express = require('express');
const router = express.Router();
const Employee = require('../models/employee.model');

router.get('/employees', async (req, res) => {
  try {
    res.json(await Employee.find().populate('department'));
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/employees/random', async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const emp = await Employee.findOne()
      .populate('department')
      .skip(rand);
    if (!emp) res.status(404).json({ message: 'Not found' });
    else res.json(emp);
  } catch (err) {
    res.json(err);
  }
});

router.get('/employees/:id', async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id).populate('department');
    if (!emp) res.status(404).json({ message: 'Not found' });
    else res.json(emp);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/employees', async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;
    const newEmployee = new Employee({ firstName: firstName, lastName: lastName, department: department });
    await newEmployee.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/employees/:id', async (req, res) => {
  const { firstName, lastName, department } = req.body;

  try {
    const emp = await Employee.findById(req.params.id);
    if (emp) {
      await Employee.updateOne(
        { _id: req.params.id },
        { $set: { firstName: firstName, lastName: lastName, department: department } }
      );
      const empUpdated = await Employee.findById(req.params.id);
      res.json(empUpdated);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/employees/:id', async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (emp) {
      await Employee.deleteOne({ _id: req.params.id });
      res.json(emp);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
