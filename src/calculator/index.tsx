export const round2TwoDecimals = (a: any) => {
    return Math.round(a * 100) / 100;
};

export const calculateMortgage = (P: any, r: any, t: any, m: any) => {
    // loan amount (P), interest rate (r), number of years (t), payments per year (n)
    let monthlyInterestFactor,
        a = r / 2 / 100,
        n = 12,
        k = t * n,
        result = 0;
    monthlyInterestFactor = Math.pow(1 + a, 1 / 6) - 1;
    result = round2TwoDecimals(
        (P * monthlyInterestFactor) / (1 - Math.pow(1 + monthlyInterestFactor, -k))
    );
    if (m === "weekly") {
        return (result * 12) / 52;
    } else if (m === "biweekly") {
        return (result * 12) / 26;
    } else {
        return result;
    }
};