export const formatValueForReal = (value) => {
    return parseFloat(value).toFixed(2).replace('.', ',')
}