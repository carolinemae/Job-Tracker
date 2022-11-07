const db = require('../config/connection');
const { Project, Equipment, Employee, Timesheet } = require('../models');
const projectSeeds = require('./projectSeeds.json');
const equipmentSeeds = require('./equipmentSeeds.json');
const employeeSeeds = require('./employeeSeeds.json');

db.once('open', async () => {
  await Project.deleteMany({});
  await Project.create(projectSeeds);
  await Equipment.deleteMany({});
  await Equipment.create(equipmentSeeds);
  await Employee.deleteMany({});
  await Employee.create(employeeSeeds);
  await Timesheet.deleteMany({});

  console.log('all done!');
  process.exit(0);
});
