const Department = require('../department.model');
const expect = require('chai').expect;
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');

describe('Department', () => {
  before(async () => {
    try {
      const fakeDB = new MongoMemoryServer(); //new test database

      const uri = await fakeDB.getConnectionString(); //get address of database

      mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }); //database connection
    } catch (err) {
      console.log(err);
    }
  });

  after(() => {
    mongoose.models = {};
  });
});
