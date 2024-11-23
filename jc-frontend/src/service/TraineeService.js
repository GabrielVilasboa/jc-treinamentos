import BaseService from "./BaseService";
import http from "../utils/http-common"
class TraineeService extends BaseService{
    constructor(){
        super("trainees")
    }

    async findWithAditionalData(params = {}) {
        const response = await http.get(`/trainees/schedule-data/`, { params });
        console.log('GET /api/trainees/schedule-data: ' + response.data)
        return response.data;
      }
    
}

export default new TraineeService()