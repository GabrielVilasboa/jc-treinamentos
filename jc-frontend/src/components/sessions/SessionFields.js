import { lastDayOfWeek } from "date-fns"

export const inputsAddRecorring = [
    {
        id: 'schedule',
        label: 'Horário',
        type: 'time',
        class: 'basis-full sm:basis-[calc(50%-1rem)]',
    },
]

export const inputsAddNotRecorrings = [
    {
        id: 'schedule',
        label: 'Horário',
        type: 'time',
        class: 'basis-full sm:basis-[calc(50%-1rem)]',
    },
    {
        id: 'date',
        label: 'Data',
        format: 'date',
        type: 'date',
        class: 'basis-full sm:basis-[calc(50%-1rem)]',
    },

]

export const select = [{
    id: "dayOfWeek",
    label:  "Dia da semana",
    default: 'Dia da semana',
    list: [
        {name: 'Domingo', id: 0},
        {name: 'Segunda-feira', id: 1},
        {name: 'Terça-feira', id: 2},
        {name: 'Quarta-feira', id: 3},
        {name: 'Quinta-feira', id: 4},
        {name: 'Sexta-feira', id: 5},
        {name: 'Sabado', id: 6},
    ],
    class: 'basis-full sm:basis-[calc(50%-1rem)]'
}]
