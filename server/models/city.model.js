const dbConnection = require('../dbconfig/dbconfig');

let city = function(city) {
    this.fldName = city.fldName;
    this.fldLat = city.fldLat;
    this.fldLong = city.fldLong;
    this.fldCountry = city.fldCountry;
    this.fldAbbreviation = city.fldAbbreviation;
    this.fldCapitalStatus = city.fldCapitalStatus;
    this.fldPopulation = city.fldPopulation;
};

city.create = function(newCity, result) {
    let sql = "INSERT INTO tblCitiesImport set ?";
    dbConnection.query(sql, newCity, function(err, res) {
        if(err) {
            console.log("Error: " + err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    })
};

city.queryById = function(id, result) {
    let sql = "SELECT * FROM tblCitiesImport WHERE ID = ?";
    dbConnection.query(sql, id, function(err, res) {
        if(err) {
            console.log("Error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
};

city.findAll = function(result) {
    let sql = "SELECT * FROM tblCitiesImport";
    dbConnection.query(sql, function(err, res) {
        if(err) {
            console.log("Error: " + err);
            result(null, err);
        } else {
            console.log('City : ', res);
            result(null, res);
        }
    })
};

city.update = function(id, city, result) {
    let sql = "UPDATE tblCitiesImport SET fldName=?fldLat=?,fldLong=?,fldCountry=?,fldAbbreviation=?,fldCapitalStatus=?,fldPopulation=? WHERE id = ?";
    dbConnection.query(sql, [city.fldName, city.fldLat, city.fldLong, city.fldCountry, city.fldAbbreviation, city.fldCapitalStatus, city.fldPopulation], function(err, res) {
        if(err) {
            console.log("Error:", err);
            result(null, res);
        } else {
            result(null, res);
        }
    })
};

city.delete = function(id, result) {
    let sql = "DELETE FROM tblCitiesImport WHERE id = ?";
    dbConnection.query(sql, [id], function(err, res) {
        if(err) {
            console.log("Error: " + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
};

module.exports = city;