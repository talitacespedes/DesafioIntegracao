function formatPrice(price, minDigits = 2) {
  const priceAsString = price.toFixed(minDigits).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  
  return `R$ ${priceAsString}`;
};

export default formatPrice;