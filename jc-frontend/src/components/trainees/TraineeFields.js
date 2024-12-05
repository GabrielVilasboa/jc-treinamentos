export const inputs = [
    {
        id: 'name',
        label: 'Nome',
        format: 'name',
        class: 'basis-full sm:basis-[calc(50%-1rem)]',
      },
      {
        id: 'birthDate',
        label: 'Data de Nascimento',
        format: 'date',
        type: 'date',
        class: 'basis-full sm:basis-[calc(50%-1rem)]',
      },
      {
        id: 'cpf',
        label: 'CPF',
        format: 'cpf',
        class: 'basis-full sm:basis-[calc(50%-1rem)]',
      },
      {
        id: 'phone',
        label: 'Telefone',
        format: 'phone',
        class: 'basis-full sm:basis-[calc(50%-1rem)]',
      },
      {
        id: 'emergencyContact',
        label: 'Contato de emergência',
        format: 'phone',
        class: 'basis-full sm:basis-[calc(50%-1rem)]',
      },
      {
        id: 'paymentDay',
        label: 'Dia de pagamento',
        type: 'number',
        step: 1,
        max: 30,
        min: 1,
        class: 'basis-full sm:basis-[calc(50%-1rem)]',
      },
      {
        id: 'address',
        label: 'Endereço',
        class: 'basis-full sm:basis-[calc(50%-1rem)]',
      }
]
export const textarea = [
    {
        id: 'observations',
        label: 'Observações',
        placeholder: 'Escreva as observações sobre o aluno aqui!',
        class: 'basis-full'
    }
]
export const select = (paymentPlans, formatPlanLabel) => {
    return [{
        id: 'paymentPlanId',
        label: 'Plano de pagamento',
        default: 'Plano de pagamento',
        list: paymentPlans,
        labelFormatter: formatPlanLabel,
        class: 'basis-full sm:basis-[calc(50%-1rem)]'
    }]
}