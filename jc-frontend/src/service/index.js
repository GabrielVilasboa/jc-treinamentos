import data from '../mock/data.js'

import Trainee from '../models/Trainee.js'
import PaymentPlans from '../models/PaymentPlans.js'
import Session from '../models/Session.js'
import Schedule from '../models/Schedule.js'

// console.log(data)

class Controller   
{
    constructor()
    {
        this.trainees = []
        this.paymentPlans = []
        this.sessions = []
        this.schedules = []
        
        this.populateData()
    }

    populateData(){
        this.paymentPlans = data.paymentPlans.map(
            plan => new PaymentPlans(
                plan.id,
                plan.value,
                plan.numberDaysPerWeek,
                plan.description
            )
        )

        this.trainees = data.trainees.map(
            trainee => new Trainee(
                    trainee.id,
                    trainee.name,
                    trainee.age,
                    trainee.birthDate,
                    trainee.cpf,
                    trainee.nextPaymentDate,
                    this.paymentPlans.find(plan => plan.id === trainee.paymentPlan),
                    trainee.phone,
                    trainee.address,
                    trainee.isActivate
                )
        )

        this.sessions = data.sessions.map(
            session => new Session(
                session.id,
                session.isRecurring,
                session.traineeIds.map(traineeId => this.trainees.find(trainee => trainee.id === traineeId)),
                session.scheduleId,
                session.maxTrainee
            )
        )
        this.schedules = data.schedules.map(
            schedule => new Schedule(
                schedule.id,
                schedule.date,
                schedule.time,
                schedule.weekDay,
                schedule.sessionIds.map(sessionsId => this.sessions.find(session => session.id === sessionsId))
            )
        )

        this.sessions.forEach(session => 
            session.schedule = this.schedules.find(schedule => schedule.id === session.schedule)
        )
    }
}

export default Controller;




