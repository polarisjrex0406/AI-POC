const mongoose = require('mongoose');
const createCRUDController = require('@/controllers/middlewaresControllers/createCRUDController');


const create = require('./create');
const search = require('./search');

const listAll = require('./listAll');
const paginatedList = require('./paginatedList');

function modelController() {
  const Model = mongoose.model('Topic');
  const methods = createCRUDController('Topic');

    methods.list = (req, res) => paginatedList(Model, req, res);
    methods.create = (req, res) => create(Model, req, res);
    methods.search = (req, res) => search(Model, req, res);
    methods.listAll = (req, res) => listAll(Model, req, res);

    return methods;
}

module.exports = modelController();
