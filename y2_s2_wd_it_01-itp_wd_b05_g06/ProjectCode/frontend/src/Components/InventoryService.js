import axios from "axios";

const HOST = "http://localhost:8070/Inventory"

export const getAllmedicine = async() => {
    try{
        const response = await axios.get(`${HOST}/allMedicine`)
        return response
    }catch(error){
        console.log("Error while retrieving data",error)
        return false;
    }
}