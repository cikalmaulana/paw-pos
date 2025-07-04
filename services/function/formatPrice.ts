export const priceFormat = (price: string, currency: string) => {
    const numberPrice = parseFloat(price);

    if (isNaN(numberPrice)) return price;

    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(numberPrice);
};
