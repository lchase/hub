const mongoose        = require('mongoose');
const Schema          = mongoose.Schema;

var DefectSchema = new Schema({
  product: String,
  version: String,
  component: String,
  build: String,
  summary: String,
  author: String,
  state: String,
  resolution: String,
  priority: Number,
  severity: Number,
  testCase: String,
  result: String,
  expectedResult: String,
  resolutionDesc: String,
  comments: [{
    body: String,
    date: Date
  }],
  updatedAt: Date,
  createdAt: Date
});

DefectSchema.pre('save', function(next) {
  let currentDate = new Date();

  // change the updatedAt field to current date.
  this.updatedAt = currentDate;

  // if createdAt doesn't exist, add that to the field.
  if (!this.createdAt)
    this.createdAt = currentDate;

  next();
});

module.exports = mongoose.model('Defect', DefectSchema);