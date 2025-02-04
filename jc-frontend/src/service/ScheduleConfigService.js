import BaseService from "./BaseService";

class ScheduleConfigService extends BaseService{
    constructor(){
        super("schedule-config")
    }
}

export default new ScheduleConfigService()