import BaseService from "./BaseService";
import http from "@/utils/httpCommon";

class ScheduleConfigService extends BaseService{
    constructor(){
        super("schedule-config")
    }

    async findId(day, time) {
        try{
            const params = {day, time}
            const response = await http.get(`/schedule-config/find-id/`, {params});
            return response.data;
        }catch(error){
            console.error("Erro ao procurar as configurações de sessão:", error)
            throw new Error(error.message)
        }
    }
}

export default new ScheduleConfigService()