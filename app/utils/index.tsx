export const showSortAddress = (address?: string): string => {
  return `${address?.substring(0, 4)}...${address?.substring(
    address.length - 4,
    address.length
  )}`;
};

export const showTransactionHash = (tranHash: string) => {
  return `${tranHash?.substring(0, 10)}${"".padStart(
    5,
    "*"
  )}${tranHash?.substring(tranHash.length - 10, tranHash.length)}`;
};

export const formatNumber = (number: number) => {
  return number.toLocaleString("en-US");
};

export const checkAmount = (amount: string) : boolean => {
  var patten = /^-?\d*\.?\d*$/;
  return patten.test(amount);
};
