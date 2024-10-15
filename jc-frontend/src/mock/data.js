export default {
    trainees: [
        {
            "id": 1,
            "name": "John Doe",
            "age": 25,
            "birthDate": "1998-05-12",
            "cpf": "123.456.789-00",
            "nextPaymentDate": "2024-09-30",
            "paymentPlan": 2,
            "phone": "(11) 99999-9999",
            "address": "123 Main St, City, Country",
            "isActivate": true

        },
        {
            "id": 2,
            "name": "Gabriel Vilasboa",
            "age": 21,
            "birthDate": "2003-06-26",
            "cpf": "116.518.209-29",
            "nextPaymentDate": "2024-09-15",
            "paymentPlan": 1,
            "phone": "(11) 99999-9999",
            "address": "123 Main St, City, Country",
            "isActivate": true
        }
    ],

    paymentPlans:[
        {
            "id": 1,
            "value": 100.0,
            "numberDaysPerWeek": 3,
            "description": "Basic Plan"
          },
          {
            "id": 2,
            "value": 200.0,
            "numberDaysPerWeek": 5,
            "description": "Premium Plan"
          }
    ],

    sessions:[
            {
              "id": 1,
              "isRecurring": true,
              "traineeIds": [1, 2],
              "scheduleId": 1,
              "maxTrainee": 5
            },
            {
              "id": 2,
              "isRecurring": false,
              "traineeIds": [2],
              "scheduleId": 2,
              "maxTrainee": 3
            }  
    ],

    schedules:[
            {
              "id": 1,
              "date": "2024-09-10",
              "time": "10:00",
              "weekDay": "Segunda-Feira",
              "sessionIds": [1]
            },
            {
              "id": 2,
              "date": "2024-09-12",
              "time": "14:00",
              "weekDay": "Terça-feira",
              "sessionIds": [2]
            }
    ]
}