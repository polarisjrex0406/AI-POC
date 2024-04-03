const mongoose = require('mongoose');

const { runTest } = require('@/controllers/gptController/index');

const create = async (Model, req, res) => {
  const { experiments = [], testCode, topic, ...other } = req.body;
  let body = req.body;

  // default

  const response = await runTest(experiments);

  if (!response) {
    return res.status(400).json({
      success: false,
      message: "prompt not correct",
    });
  }

  body['createdBy'] = req.admin._id;

  if (response) {
    for (let i in response) {
      body['experiments'][i]['chatHistory'] = [];
      for (let j in response[i]) {
        body['experiments'][i]['chatHistory'].push({
          input: i > 0 ? response[i][j].data.input.messages.slice(-1) : response[i][j].data.input.messages,
          output: response[i][j].data.output
        });
      }
    }
  }

  // Creating a new document in the collection
  const result = await new Model(body).save();
  // Returning successfull response
  return res.status(200).json({
    success: true,
    message: 'Test created successfully',
  });
};
module.exports = create;
