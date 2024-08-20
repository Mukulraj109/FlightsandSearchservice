const {FlightRespository, AirplaneRespository} = require('../repository/index');
const { compareTime } = require('../utils/helper');

class FlightService {

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

    constructor() {
        this.airplaneRespository = new AirplaneRespository();
        this.flightrespository = new FlightRespository();
    }

    async createFlight(data) {
        try {
            if(!compareTime(data.arrivalTime, data.departureTime)) {
                throw {error: 'Arrival time cannot be less than departure time'};
            }
            const airplane = await this.airplaneRespository.getAirplane(data.airplaneId);
            const flight = await this.flightrespository.createFlight({
                ...data, totalSeats:airplane.capacity 
            });
            return flight;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw {error};
        }
    }

    async getAllFlightData(data) {
        try {
            const filter= this.#createFilter(data);
            const flights=await this.flightrespository.getAllFlights(filter);
            return flights;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw {error};
        }
    }

    async getFlight(flightId) {
        try {
            const flight = await this.flightrespository.getFlight(flightId);
            return flight;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw {error};
        }
    }

    async updateFlight(flightId, data) {
        try {
            const response = await this.flightrespository.updateFlights(flightId, data);
            return response;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw {error};
        }
    }
    
}

module.exports = FlightService;

/**
 * {
 *   flightNumber,
 *  airplaneId ,
 *   departureAirportId,
 *   arrivalAirportId,
 *   arrivalTime,
 *   departureTime,
 *   price
 *   totalSeats -> airplane
 * }
 */