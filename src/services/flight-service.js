const {FlightRepository,AirlplaneRepository}=require("../repository/index");
const { compareTime }=require("../utils/compareTime-helper");
const { Op }=require("sequelize");

class FlightService{

    //This function is the Business Logic which must be the part of service
    #createFilter(data){
        let filter={};

        let comb=[];
        if(data.minPrice){
            comb.push({price:{[Op.gte]:data.minPrice}});
        }

        if(data.maxPrice){
            comb.push({price:{[Op.lte]:data.maxPrice}});
        }

        Object.assign(filter,{[Op.and]:comb});

        return filter;

    }

    constructor(){
        this.flightRepository= new FlightRepository();
        this.airplaneRepository=new AirlplaneRepository();
    }

    async createFlight(data){
        try {
            
            if(!compareTime(data.departureTime,data.arrivalTime)){
                throw {error:"Departure Time cannot be greater than Arrival Time"};
            }

            const airplane= await this.airplaneRepository.getAirplane(data.airplaneId);
            const capacity=airplane.capacity;

            const flight= await this.flightRepository.createFlight({
                ...data, totalSeats:capacity
             });
            return flight;

        } catch (error) {
            console.log("Error in Service Layer");
            throw {error};
        }
    }

    async getFlight(id){
        try {
            
            const flight = this.flightRepository.getFlight(id);
            return flight;
            
        } catch (error) {
            console.log("Error in Service Layer");
            throw {error};
        }
    }

    async getAllFlight(data){
        try {

            const filter= this.#createFilter(data);
            const flights=await this.flightRepository.getAllFlight(filter);
            return flights;
            
        } catch (error) {
            console.log("Error in Service Layer");
            throw {error};
        }
    }

    async updateFlight(flightId, data){
        try {
            const flight = await this.flightRepository.updateFlight(flightId, data);
            return flight;
        } catch (error) {
            console.log("Error in Service Layer");
            throw {error};
        }
    }
}

module.exports= FlightService;
