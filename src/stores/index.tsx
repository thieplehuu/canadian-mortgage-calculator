const minQuota = 25000;
const maxQuota = 2000000;
const paymentPeriods = [{
    value: '1',
    label: 'Weekly Payment',
}, {
    value: '2',
    label: 'Bi-weekly Paymen',
}, {
    value: '2',
    label: 'Monthly Payment',
}
];
const amortizations = [
    {
        value: '1',
        label: '25 Years',
    }, {
        value: '2',
        label: '35 Years',
    }
]

export { minQuota, maxQuota, paymentPeriods, amortizations }