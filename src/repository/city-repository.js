const { Op } = require("sequelize");
const {City}= require("../models/index");

class CityRepository{

    async createCity(names){
        try{

            const city = await City.bulkCreate(names);
            return city;

        }catch(err){
            console.log("Error in Repository Layer");
            throw {err};
        }
    }

    async deleteCity(id){
        try{

            await City.destroy({
                where:{
                    id
                }
            });
            
            return true;
        }catch(err){
            throw {err};
        }
    }

    async updateCity(id,data){
        try {

            // const result= await City.update(data, {
            //     where:{
            //         id:id
            //     }
            // });

            const result= await City.findByPk(id);

            result.name=data.name;
            await result.save();
            return result;
            
        } catch (error) {
            console.log("Error in Repository Layer");
            throw {error};
            
        }
    }

    async getCity(id){
        try{const result= await City.findByPk(id);
        return result;
    }catch(error){
        console.log("Error in Repository Layer");
        throw {error};
    }
    }

    async getAllCity(filter){
        try {

            if(filter.prefix){
                const cities= await City.findAll({
                    where: {
    
                        name:{
                            [Op.startsWith]: filter.prefix
                        }
                    }
                });

                return cities;
            }
            
            const cities= await City.findAll();

            return cities;
            
        } catch (error) {
            console.log("Error in Repository Layer");
            throw {error};
            
        }
    }
}

module.exports= CityRepository;
