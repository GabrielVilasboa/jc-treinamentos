export const inputs = [
  {
    id: "name",
    label: "Nome do plano",
  },
  {
    id: "value",
    type: "number",
    label: "Valor",
    step: 0.01,
    min: 0.01
  },
  {
    id: "numberDaysPerWeek",
    type: "number",
    label: "Frequência semanal",
    step: 1,
    max: 6,
    min: 1,
  },
  {
    id: "billingInterval",
    type: "number",
    label: "Frequência de pagamento",
  },
];

export const textarea = [
  {
    id: "description",
    label: "Descrição",
    placeholder: "Escreva as observações do plano",
  },
];
