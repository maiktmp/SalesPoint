
const moneyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});

export default {

    /**
     * Formats given value as money
     * @param {number} value Number for format as money
     * @returns {string} Formatted string representation
     */
    asMoney(value) {
        return moneyFormatter.format(value);
    }
}
