const express = require('express');
const router = express.Router();
const baseModel = require('../models/baseModel');

router.get('/properties', async(req, res) => {
    try {
	const properties = await baseModel.find();
	res.json(properties);

    } catch (error) {
	res.status(500).json({error: 'Server error'});
    }

});

router.post('/properties', async(req, res) =>{
    try{
	console.log("I am recieving your request");
	const newProperty = req.body;
	console.log("Your request looks like this", newProperty);
	const createdProperty = await baseModel.create(newProperty);
	console.log("maybe heres the error");
	res.status(201).json(createdProperty);
	
    } catch (error) {
	console.log(error);
	res.status(500).json({error: "Server error"});
    }


});

router.put('/properties/:id', async (req, res) =>{
    try{
	const updatedProperty = await baseModel.findByIdAndUpdate(
	    req.params.id,
	    req.body,
	    {new: true}

	);
	if(!updatedProperty) {
	    return res.status(404).json({error: 'Property not found'});
	}
	res.json(updatedProperty);
    } catch (error) {
	res.status(500).json({error: 'Server error'});
    }


});



router.delete('/properties/:id', async (req, res) => {
    try {
	const deletedProperty = await baseModel.findByIdAndDelete(req.params.id);
	if (!deletedProperty){
	    return res.status(404).json({error: 'Property not found'});
	    
	}
	res.json(deletedProperty);
    } catch(error){
	res.status(500).json({error: 'Server error'});
    }
    


});

module.exports = router;
