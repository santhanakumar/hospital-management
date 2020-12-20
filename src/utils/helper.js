export const getBalance = (totalAmount, payments) => {
  const paid = payments.reduce((total, current) => total + current.amount, 0);
  return totalAmount - paid;
};

export const ucFirst = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const getPaid = (payments) =>
  payments.reduce((total, current) => total + current.amount, 0);

export const getBillingAmount = scanDetails => {
  let amount = 0;
  let discount = 0;
  let total = 0;
  scanDetails.forEach(({amount: scanAmount, scanDiscount, total: scanTotal}) => {
    amount += scanAmount;
    discount += scanDiscount;
    total += scanTotal;
  })
  return [amount, discount, total]
}
