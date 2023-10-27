
const moneyFormat = (num: number, prefix = true) => {
    var str = "";
    if (prefix == true) {
        str += "$";
    }
    return str + new Intl.NumberFormat().format(num);
}

const rateToString = (str: string) => {
    return str + "%";
}

const moneyToNumber = (str: string) => {
    var regex = /[.,\s]/g;

    var result = str.replace(regex, '');
    return parseInt(result);
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

export { moneyFormat, moneyToNumber, rateToString, moneyRound };