import BaseService from "./BaseService";

class ScheduleService extends BaseService{
    constructor(){
        super("schedules")
    }
}

export default new ScheduleService ()