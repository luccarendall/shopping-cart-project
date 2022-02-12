const getSavedCartItems = () => {
  const stringReturn = localStorage.getItem('cartItems');
  const obj = JSON.parse(stringReturn);
  return obj;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
