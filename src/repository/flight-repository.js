const {Flight}=require("../models/index");

class FlightRepository{

    async createFlight(data){
        try {

            const flight= await Flight.create(data);
            return flight;
            
        } catch (error) {
            console.log("Error in Repository Layer");
            throw {error}
        }
    }

    async getFlight(id){
        try {
            
            const flight= await Flight.findByPk(id);
            return flight;
            
        } catch (error) {
            console.log("Error in Repository Layer");
            throw {error}
        }
    }

    async getAllFlight(filter){
        try {

            const flights= await Flight.findAll({
                where: filter
            });
            return flights;
            
        } catch (error) {
            console.log("Error in Repository Layer");
            throw {error}
        }
    }

    async updateFlight(flightId, data){
        try {
            await Flight.update(data, {
                where: {
                    id: flightId
                }
            });

            const flight= await this.getFlight(flightId);
            return flight;
        } catch (error) {
            console.log("Error in Repository Layer");
            throw {error}
        }
    }
}


module.exports= FlightRepository;
