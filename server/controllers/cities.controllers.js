const City = require('../models/city.model');

exports.findAll = function(req, res) {
    City.findAll(function(err, cities) {
        console.log("controller");
        if(err)
            res.send(err);
            console.log('res', cities);
            res.json({
                "data": cities
            })
    });
};

exports.create = function(req, res) {
    const newCity = new City(req.body);
    if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: "Please ensure all required fields are filled"
        })
    } else {
        City.create(newCity, function(err, city) {
            if(err)
                res.send(err);
            res.json({
                error: false,
                message: "City created successfully",
                data: city
            })
        })
    }
};

exports.findById = function(req, res) {
    City.queryById(req.params.id, function(err, city) {
        if(err)
            res.send(err);
        res.json(city);
    })
};

exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({
            error:true,
            message: 'Please provide all required field'
        });
    } else{
        City.update(req.params.id, new City(req.body), function(err, city) {
            if (err)
                res.send(err);
            res.json({
                error:false,
                message: 'City successfully updated' });
        });
    }

};

exports.delete = function(req, res) {
    City.delete( req.params.id, function(err, city) {
        if (err)
            res.send(err);
        res.json({
            error:false,
            message: 'City successfully deleted'
        });
    });
};