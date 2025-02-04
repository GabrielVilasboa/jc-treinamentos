import BaseService from "./BaseService";
import http from "@/utils/httpCommon";

class TraineeSessionConfigService extends BaseService{
    constructor(){
        super("trainee-sessions-config")
    }
    
    async check(traineeId, time, dayOfWeek) {
        try{
            const params = {traineeId, time, dayOfWeek}
            const response = await http.get(`/trainee-sessions-config/check/`, {params});
            return response.data;
        }catch(error){
            console.error("Erro ao checar as configurações de sessão:", error)
            throw new Error(error.message)
        }
    }
}

export default new TraineeSessionConfigService()