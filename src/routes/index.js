const express = require('express');
const router = express.Router();
const path = require('path');

const multer = require('multer');

const model2g = require('../model/dato2g')();
const model3g = require('../model/dato3g')();
const model4g = require('../model/dato4g')();
const wifi = require('../model/wifi')();

var storage2g = multer.diskStorage(
    {
        destination: './uploads/',
        filename: function ( req, file, cb ) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            cb( null, 'datos_2g.geojson');
        }
    }
);

var storage3g = multer.diskStorage(
    {
        destination: './uploads/',
        filename: function ( req, file, cb ) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            cb( null, 'datos_3g.geojson');
        }
    }
);
var storage4g = multer.diskStorage(
    {
        destination: './uploads/',
        filename: function ( req, file, cb ) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            cb( null, 'datos_4g.geojson');
        }
    }
);

const upload2g = multer({storage: storage2g});
const upload3g = multer({storage: storage3g});
const upload4g = multer({storage: storage4g});

router.get('/', (req, res)=>{
    res.render('index');
});

//endpints per retornar dades wifi
router.get('/wifis', (req, res)=>{
    wifi.find({},(err, wifis) =>{
        if (err) throw err;
        res.send(wifis);
    });
});

router.delete('/deletewifi', (req, res)=>{
    console.log("remove: " + req.body.id);
    wifi.findOneAndDelete({_id: req.body.id}, function(err){
        if (err) throw err;
        res.send('removed');
    })
})

//insert wifi
router.post('/addwifi', (req, res)=>{
    var wifiobj = req.body;
    console.log(wifiobj);
    var mod = {ssid: wifiobj.ssid, password: wifiobj.password,longitude: wifiobj.long, latitude: wifiobj.lat};
    wifi.create(mod, (err, wifir)=>{
        if (err) throw err;
        console.log(wifir);
    });
    res.send("fet");
})

//endpints per retornar dades antenes
router.get('/datos2g', (req, res)=>{
    model2g.find({},(err, datos3g) =>{
        if (err) throw err;
        res.send(datos3g);
    });
});

router.get('/datos3g', (req, res)=>{
    model3g.find({},(err, datos3g) =>{
        if (err) throw err;
        res.send(datos3g);
    });
});

router.get('/datos4g', (req, res)=>{
    model4g.find({},(err, datos3g) =>{
        if (err) throw err;
        res.send(datos3g);
    });
});

//endpoint per pujar fitxer
router.post('/submit-2g-data', upload2g.single('document'),(req, res) => {
    if (req.file) {
        console.log('Uploading file...');
        var filename = req.file.filename;
        console.log(filename);
        var uploadStatus = 'File Uploaded Successfully';
    } else {
        console.log('No File Uploaded');
        var filename = 'FILE NOT UPLOADED';
        var uploadStatus = 'File Upload Failed';
    }
    
    /* ===== Add the function to save filename to database ===== */
    model2g.collection.drop();
    var fs = require('fs');
    var json = JSON.parse(fs.readFileSync('/home/yeqk97/Locant/uploads/datos_3g.geojson', 'utf8'));
    var features = json.features;
    
    features.forEach(function(elem) {
        var geometry = elem.geometry;
        var coordinates = geometry.coordinates;
        var lat = coordinates[1];
        var long = coordinates[0];

        var properties = elem.properties;
        var desc = properties.description;

        var mod = {description: desc, longitude: long, latitude: lat};
        model2g.create(mod, (err, dato2g)=>{
            if (err) throw err;
            console.log(dato2g);
        });
      
    });
    
    res.redirect('localhost:3000');
});


router.post('/submit-3g-data', upload3g.single('document'),(req, res) => {
    if (req.file) {
        console.log('Uploading file...');
        var filename = req.file.filename;
        console.log(filename);
        var uploadStatus = 'File Uploaded Successfully';
    } else {
        console.log('No File Uploaded');
        var filename = 'FILE NOT UPLOADED';
        var uploadStatus = 'File Upload Failed';
    }
    
    /* ===== Add the function to save filename to database ===== */
    model3g.collection.drop();
    var fs = require('fs');
    var json = JSON.parse(fs.readFileSync('/home/yeqk97/Locant/uploads/datos_3g.geojson', 'utf8'));
    var features = json.features;
    
    features.forEach(function(elem) {
        var geometry = elem.geometry;
        var coordinates = geometry.coordinates;
        var lat = coordinates[1];
        var long = coordinates[0];

        var properties = elem.properties;
        var desc = properties.description;

        var mod = {description: desc, longitude: long, latitude: lat};
        model3g.create(mod, (err, dato3g)=>{
            if (err) throw err;
            console.log(dato3g);
        });
      
    });
    
    res.redirect('localhost:3000');
});

router.post('/submit-4g-data', upload4g.single('document'),(req, res) => {
    if (req.file) {
        console.log('Uploading file...');
        var filename = req.file.filename;
        console.log(filename);
        var uploadStatus = 'File Uploaded Successfully';
    } else {
        console.log('No File Uploaded');
        var filename = 'FILE NOT UPLOADED';
        var uploadStatus = 'File Upload Failed';
    }
    
    /* ===== Add the function to save filename to database ===== */
    model4g.collection.drop();
    var fs = require('fs');
    var json = JSON.parse(fs.readFileSync('/home/yeqk97/Locant/uploads/datos_4g.geojson', 'utf8'));
    var features = json.features;
    
    features.forEach(function(elem) {
        var geometry = elem.geometry;
        var coordinates = geometry.coordinates;
        var lat = coordinates[1];
        var long = coordinates[0];

        var properties = elem.properties;
        var desc = properties.description;

        var mod = {description: desc, longitude: long, latitude: lat};
        model4g.create(mod, (err, dato4g)=>{
            if (err) throw err;
            console.log(dato4g);
        });
      
    });
    
    res.redirect('localhost:3000');
});

module.exports = router;