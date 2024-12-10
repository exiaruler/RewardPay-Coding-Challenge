"use strict";
const conversion = require("../conversion");
// test cases for convertToCurrency
var currrencyCases = [
    { value: 0, expect: "$0" },
    { value: 2.99, expect: "$2" },
    { value: 500.1, expect: "$500" },
    { value: 5500.068, expect: "$5,500" },
    { value: 15345.8, expect: "$15,345" },
    { value: 1200000, expect: "$1,200,000" },
    { value: 120000.9, expect: "$120,000" },
    { value: -12000008.00, expect: "$-12,000,008" },
    { value: 1234567890, expect: "$1,234,567,890" },
    { value: 2000000000001, expect: "$2,000,000,000,001" }
];
// test cases for convertToPercentage
var percentageCases = [
    { value: 25, total: 50, expect: "50%" },
    { value: 3, total: 50, expect: "6%" },
    { value: 4.6, total: 50, expect: "9.2%" },
    { value: 30.01, total: 50, expect: "60%" },
    { value: 6, total: 3800, expect: "0.2%" },
    { value: 3308, total: 3800, expect: "87.1%" },
    { value: 0, total: 3800, expect: "0%" },
    { value: 2000.50, total: 3800, expect: "52.6%" },
    { value: 4000.53, total: 3800, expect: "105.3%" },
    { value: -1500, total: 3800, expect: "-39.5%" }
];
for (var ci = 0; ci < currrencyCases.length; ci++) {
    var currencyTest = currrencyCases[ci];
    describe('convert to currency function', () => {
        it(currencyTest.value + " = " + currencyTest.expect, () => {
            expect(conversion.convertToCurrency(currencyTest.value)).toBe(currencyTest.expect);
        });
    });
}
for (var i = 0; i < percentageCases.length; i++) {
    var percentageTest = percentageCases[i];
    describe('convert to percentage function', () => {
        it(percentageTest.value + "/" + percentageTest.total + " = " + percentageTest.expect, () => {
            expect(conversion.convertToPercentage(percentageTest.value, percentageTest.total)).toBe(percentageTest.expect);
        });
    });
}
