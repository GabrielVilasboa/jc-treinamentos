import BaseService from "./BaseService";
import http from "../utils/httpCommon"
class TraineeService extends BaseService{
    constructor(){
        super("trainees")
    }

    async findWithAditionalData(params = {}) {
      try{
        const response = await http.get(`/trainees/schedule-data/`, { params });
        console.log('GET /api/trainees/schedule-data: ' + response.data)
        return response.data;
      }catch(error){
        console.error("Erro ao buscar trainees:", error)
      }
      }

    async tradeStatus(id){
      try {
          const response = await http.put(`/trainees/trade-status/${id}`);
          console.log('PUT /api/trainees/trade-status/:id/: ', response.data);
          
          return response.data;
        } catch (error) {
          console.error("Erro ao alternar o status do trainee:", error);
          throw error;
        }
    }
    
}

export default new TraineeService()