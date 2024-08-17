const {FlightService}=require("../services/index");

const flightService= new FlightService();

const create= async(req,res)=>{
    try {
        
        const flightDetails={
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalTime: req.body.arrivalTime,
            arrivalAirportId: req.body.arrivalAirportId,
            departureTime: req.body.departureTime,
            price: req.body.price
        }
        
        const flight=await flightService.createFlight(req.body);
        return res.status(201).json({
            data:flight,
            success:true,
            message:"Created new flight",
            error:{}
        });
    } catch (error) {
        console.log("Error in Controller Layer");
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Unable to create new flight",
            error: error
        });
        
    }

    
}

const get= async(req,res)=>{
    try {

        const flight= await flightService.getFlight(req.params.id);
        return res.status(200).json({
            data:flight,
            success:true,
            message:"Fetched flight",
            error:{}
        });
            
     } catch (error) {
        console.log("Error in Controller Layer");
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Unable to fetch flight",
            error: error
        });
    }
}

const getAll=async(req,res)=>{
    try {
        
        const flights= await flightService.getAllFlight(req.query);
        return res.status(200).json({
            data:flights,
            success:true,
            message:"Fetched flight",
            error:{}
        });

    } catch (error) {
        console.log("Error in Controller Layer");
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Unable to fetch flights",
            error: error
        });
    }
}

const updateFlight=async(req,res)=>{
    try {
        
        const flight= await flightService.updateFlight(req.params.id, req.body);
        return res.status(200).json({
            data:flight,
            success:true,
            message:"Updated flight",
            error:{}
        });

    } catch (error) {
        console.log("Error in Controller Layer");
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Unable to update flight",
            error: error
        });
    }
}

module.exports={
    create,
    get,
    getAll,
    updateFlight
}
