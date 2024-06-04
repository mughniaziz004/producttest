export const formatCurrency = (
  amount: number | bigint,
  currency = 'USD',
  locale = 'en-US',
) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
};
