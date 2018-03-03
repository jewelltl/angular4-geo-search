const express = require('express');
const router = express.Router();
var utils = require("../libs/utils"),
    consts = require("../libs/consts"),
    config = require("../config"),
    GeocoderArcGIS = require('geocoder-arcgis');
    
var geocoder = new GeocoderArcGIS({});

/* GET api listing. */
router.post('/list', (req, res, next) => {
	geocoder.suggest(req.body.keyword ,{
        countryCode:'BR'
    })
    .then(function(result){
        res.send(result.suggestions);
    })
});
router.post('/detail', (req, res, next) => {
	geocoder.findAddressCandidates({magicKey: req.body.magicKey}, {
        outFields: 'LongLabel,Postal,PlaceName,City,Subregion,Region,StAddr,SubAddr,AddNum,RegionAbbr',
    })
    .then(function(result){
    	res.send(result.candidates[0]);
    })
});


module.exports = router;