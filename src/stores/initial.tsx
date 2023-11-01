const minQuota = 25000;
const inititalQuota = 1000000;
const maxQuota = 2000000;
const paymentPeriods = [{
    value: 'monthly',
    label: 'Monthly Payment',
}, {
    value: 'biweekly',
    label: 'Bi-weekly Paymen',
}, {
    value: 'weekly',
    label: 'Weekly Payment',
},
];
const amortizations = [
    {
        value: 25,
        label: '25 Years',
    }, {
        value: 30,
        label: '30 Years',
    }
]

export { minQuota, maxQuota, inititalQuota, paymentPeriods, amortizations }