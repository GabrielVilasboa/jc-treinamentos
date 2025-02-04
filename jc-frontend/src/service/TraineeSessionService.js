import BaseService from "./BaseService";
import http from "@/utils/httpCommon";

class TraineeSessionService extends BaseService{
    constructor(){
        super("trainee-sessions")
    }

    async check(traineeId, sessionId) {
        try{
            const params = {traineeId, sessionId}
            const response = await http.get(`/trainee-sessions/check/`, {params});
            return response.data;
        }catch(error){
            console.error("Erro ao checar a sessão:", error)
            throw new Error(error.message)
        }
    }
  
}

export default new TraineeSessionService()