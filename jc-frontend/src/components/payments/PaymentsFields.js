export const inputs = [
    {
    id: "paymentDate",
    label: "Data do pagamento",
    type: 'date',
    format: 'date'
}]

export const select = (paymentPlans, formatPlanLabel) => {
    return [{
        id: 'paymentPlanId',
        label: 'Plano de pagamento',
        default: 'Plano de pagamento',
        list: paymentPlans,
        formatter: formatPlanLabel,
    }]
}