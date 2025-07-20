export const priceFormat = (price: string | number, currency: string) => {
    const numberPrice = typeof price === "number" ? price : parseFloat(price);

    if (isNaN(numberPrice)) return String(price);

    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(numberPrice);
};
