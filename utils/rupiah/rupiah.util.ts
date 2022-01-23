export function rupiahCurrency(amount: any): string {
  const isString = typeof amount === "string";
  const isNumber = typeof amount === "number";
  const isValidAmount = isString || isNumber;

  if (!amount || !isValidAmount) return "Rp0";

  const validAmount = isString ? Number(amount) : amount;

  if (isNaN(validAmount)) return "Rp0";

  return `Rp${validAmount.toLocaleString("id-ID")}`;
}
