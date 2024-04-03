const mongoose = require('mongoose');

const create = async (Model, req, res) => {
  // Creating a new document in the collection
  let body = req.body;
  body['createdBy'] = req.admin._id;
  const result = await new Model(body).save();

  // Returning successfull response
  return res.status(200).json({
    success: true,
    result,
    message: 'Successfully Created the document in Model ',
  });
};

module.exports = create;
