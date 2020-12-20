export const getBalance = (totalAmount, payments) => {
  const paid = payments.reduce((total, current) => total + current.amount, 0);
  return totalAmount - paid;
};

export const ucFirst = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const getPaid = (payments) =>
  payments.reduce((total, current) => total + current.amount, 0);
