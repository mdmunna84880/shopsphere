import { expect } from 'vitest';
import { formatCurrencyToUS } from './formatCurrency'

describe('formatCurrencyToUS', () => {
    it("should format number to usd currency readable number", ()=>{
        const result = formatCurrencyToUS(1234);
        expect(result).toBe('$1,234.00');
    });

    it('should format zero to usd currency', () => {
        const result = formatCurrencyToUS(0);
        expect(result).toBe('$0.00');
    })

    it("should format format any number to usd currency readable number with commas seperated", ()=>{
        const result = formatCurrencyToUS(120.345);
        expect(result).toBe('$120.35')
    })
})
