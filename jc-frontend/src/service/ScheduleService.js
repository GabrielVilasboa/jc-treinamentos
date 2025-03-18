import BaseService from "./BaseService";
import http from "../utils/httpCommon"

class ScheduleService extends BaseService{
    constructor(){
        super("schedules")
    }
    
    async findInfo() {
        try{
          const response = await http.get(`/schedules/infos`);
          console.log('GET /api/schedules/infos: ' + response.data)
          return response.data;
        }catch(error){
          console.error("Erro ao buscar schedule infos:", error)
        }
      }
}

export default new ScheduleService ()