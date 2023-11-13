
const moneyFormat = (num: number, prefix = true) => {
    var str = "";
    if (prefix == true) {
        str += "$";
    }
    return str + new Intl.NumberFormat().format(num);
}

const rateToString = (str: number) => {
    return str + "%";
}

const moneyToNumber = (str: string) => {
    var regex = /[%\$.,\s]/g;

    var result = str.toString().replace(regex, '');
    return parseInt(result);
}


const rateToNumber = (str: string) => {
    var regex = /[%]/g;

    var result = str.replace(regex, '');
    return parseFloat(result);
}

const roundMillionMoney = (money: number, prefix = true, suffix = true) => {
    var milliion = Math.floor(money / 1000000);
    var str = "";
    if (prefix == true) {
        str += "$";
    }
    str += milliion.toString();
    if (suffix == true) {
        str += "M";
    }
    return str;
}

const moneyRound = (money: number, prefix = true, suffix = true) => {
    var milliion = Math.floor(money / 1000000);
    if (milliion > 0) {
        var str = "";
        if (prefix == true) {
            str += "$";
        }
        str += milliion.toString();
        if (suffix == true) {
            str += "M";
        }
        return str;
    }
    var thousand = Math.floor(money / 1000);
    if (thousand > 0) {
        var str = "";
        if (prefix == true) {
            str += "$";
        }
        str += thousand.toString();
        if (suffix == true) {
            str += "K";
        }
        return str;
    }

    return '';
}
const Separator = (e: any, isFloat: boolean) => {
    if (isFloat) {
        return parseInt(e).toLocaleString("en");
    } else {
        return round2TwoDecimals(e).toLocaleString("en");
    }
};

const round2TwoDecimals = (a: any) => {
    return Math.round(a * 100) / 100;
};

const calculateMortgage = (P: any, r: any, t: any, m: any) => {
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


function formatDate(date = new Date()) {
    const year = date.toLocaleString('default', { year: 'numeric' });
    const month = date.toLocaleString('default', {
        month: '2-digit',
    });
    const day = date.toLocaleString('default', { day: '2-digit' });

    return [year, month, day].join('/');
}

export { moneyFormat, moneyToNumber, rateToString, rateToNumber, moneyRound, round2TwoDecimals, calculateMortgage, Separator, formatDate };