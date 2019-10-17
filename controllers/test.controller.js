const { Form } = require('../models/test.model');
const HttpStatus = require('http-status-codes');

exports.formGetByID = async (req, res) => {
    console.log('formGetById req = ', req.params);
    const form = await Form.findById(req.params.id);

    res.json(form);
}

exports.formPost = async (req, res) => {
    console.log('formPost req = ', req.body);

    const newForm = new Form({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        gender: req.body.gender,
        query: req.body.query
    })

    try {
        const form = await newForm.save();
        res.json(form);
    } catch (error) {
        console.log('formPost ERROR =>', error);
        res.status(HttpStatus.BAD_REQUEST).json(error);
    }
}