const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  it('should throw an error if no arg', () => {
    const emp = new Employee({}); // create new Employee, but don't set any attr value

    emp.validate(err => {
      expect(err.errors.firstName && err.errors.lastName && err.errors.department).to.exist;
    });
  });

  it('should throw an error if one or two arguments are missing', () => {
    const cases = ['John', 'Doe', 'Police'];
    for (let arg of cases) {
      const emp = new Employee({ firstName: arg });

      emp.validate(err => {
        expect(err.errors.lastName && err.errors.department).to.exist;
      });
    }

    for (let arg of cases) {
      const emp = new Employee({ firstName: arg, lastName: arg });

      emp.validate(err => {
        expect(err.errors.department).to.exist;
      });
    }
  });

  it('should throw an error if any arg is not a string', () => {
    const cases = [{}, []];
    for (let arg of cases) {
      const emp = new Employee({ firstName: arg, lastName: arg, department: arg });

      emp.validate(err => {
        expect(err.errors.firstName && err.errors.lastName && err.errors.department).to.exist;
      });
    }
  });

  it('should not throw an error if arg is okay', () => {
    const cases = ['John', 'Doe', 'Police'];
    for (let arg of cases) {
      const emp = new Employee({ firstName: arg, lastName: arg, department: arg });

      emp.validate(err => {
        expect(err).to.not.exist;
      });
    }
  });

  after(() => {
    mongoose.models = {};
  });
});
