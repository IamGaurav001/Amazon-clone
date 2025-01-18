import { formatCurrency } from "../../script/utlis/money.js";

describe('Test suite : formatCurrency', () => {
    it('Convert cents into dollar', () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });


    it('Works with 0', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });

    it('Round off to nearest cents', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });
});