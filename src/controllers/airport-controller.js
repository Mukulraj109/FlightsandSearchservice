const {AirportService} = require("../services/index");

const airportService= new AirportService();

const create= async(req,res)=>{
    try {

        const response= await airportService.create(req.body);
        return res.status(201).json({
            data: response,
            success: true,
            message: "Airport created Successfully",
            err:{}
        })
        
    } catch (error) {
        console.log("Error in Controller Layer");
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Unable to create Airport",
            err:{error}
        });
    }
}

const update= async(req,res)=>{
    try {

        const response= await airportService.update(req.params.id,req.body);
        return res.status(200).json({
            data: response,
            success: true,
            message: "Airport Updated Successfully",
            err:{}
        })
        
    } catch (error) {
        console.log("Error in Controller Layer");
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Unable to update Airport",
            err:{error}
        });
    }
}

const destroy= async(req,res)=>{
    try {

        const response= await airportService.delete(req.params.id);
        return res.status(200).json({
            data: response,
            success: true,
            message: "Airport deleted Successfully",
            err:{}
        })
        
    } catch (error) {
        console.log("Error in Controller Layer");
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Unable to delete Airport",
            err:{error}
        });
    }
}

const get= async(req,res)=>{
    try {

        const response= await airportService.get(req.params.id);
        return res.status(200).json({
            data: response,
            success: true,
            message: "Airport fetched Successfully",
            err:{}
        })
        
    } catch (error) {
        console.log("Error in Controller Layer");
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Unable to fetch Airport",
            err:{error}
        });
    }
}

const getAll= async(req,res)=>{
    try {

        const response= await airportService.getAll();
        return res.status(200).json({
            data: response,
            success: true,
            message: "Airports fetched Successfully",
            err:{}
        })
        
    } catch (error) {
        console.log("Error in Controller Layer");
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Unable to fetch Airports",
            err:{error}
        });
    }
}

module.exports= {
    create,
    destroy,
    update,
    get,
    getAll
}
