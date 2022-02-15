const getSavedCartItems = () => {
  const stringReturn = localStorage.getItem('cartItems');
  return stringReturn;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
