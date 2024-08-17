const { CityService }= require("../services/index");
const { SuccessCodes }= require("../utils/res-statusCodes");

const cityService= new CityService();

//POST -> /city
const create= async(req,res)=>{
    try {

        const response=await cityService.createCity(req.body);
        return res.status(SuccessCodes.CREATED).json({
            data: response,
            success: true,
            message: "City created Successfully",
            err:{}
        });
        
    } catch (error) {
        console.log("Error in Controller Layer");
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Unable to create City",
            err:{error}
        });
        
    }
}

//PATCH -> /city/:id
const update= async(req,res)=>{
    try {

        const response=await cityService.updateCity(req.params.id,req.body);
        return res.status(SuccessCodes.OK).json({
            data: response,
            success: true,
            message: "City updated Successfully",
            err:{}
        });
        
    } catch (error) {
        console.log("Error in Controller Layer");
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Unable to update City",
            err:{error}
        });
        
    }
}

//GET -> /city/:id
const get= async(req,res)=>{
    try {

        const response=await cityService.getCity(req.params.id);
        return res.status(SuccessCodes.OK).json({
            data: response,
            success: true,
            message: "City fetched Successfully",
            err:{}
        });
        
    } catch (error) {
        console.log("Error in Controller Layer");
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Unable to get City",
            err:{error}
        });
        
    }
}

//DELETE -> /city/:id
const destroy= async(req,res)=>{
    try {

        const response=await cityService.deleteCity(req.params.id);
        return res.status(SuccessCodes.OK).json({
            data: response,
            success: true,
            message: "City deleted Successfully",
            err:{}
        });
        
    } catch (error) {
        console.log("Error in Controller Layer");
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Unable to delete City",
            err:{error}
        });
    }
}

const getAll= async(req,res)=>{
    try {
        const cities= await cityService.getAllCity(req.query);
        return res.status(SuccessCodes.OK).json({
            data: cities,
            success: true,
            message: "Cities fetched Successfully",
            err:{}
        })
        
    } catch (error) {
        console.log("Error in Controller Layer");
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Unable to fetch Cities",
            err:{error}
        });
        
    }
}

module.exports={
    create,
    update,
    get,
    destroy,
    getAll
}
