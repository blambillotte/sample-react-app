export const getPricePerSquareFoot = ({ sqft, baseRent }) => {
  const parsedRent = parseFloat(baseRent.replace(/[^0-9.-]+/g, ""));
  const pricePerFoot = parsedRent / sqft;

  return pricePerFoot;
};
