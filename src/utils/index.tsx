const moneyFormat = (num: number) => {
    return new Intl.NumberFormat().format(num);
}
const rateToString = (str: string) => {
    return str + "%";
}
export { moneyFormat, rateToString };