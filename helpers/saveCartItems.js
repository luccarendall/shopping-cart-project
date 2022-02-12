const saveCartItems = (event) => {
  const elementString = JSON.stringify(event);
  return localStorage.setItem('cartItems', elementString);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
