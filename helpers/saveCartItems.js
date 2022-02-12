const saveCartItems = (element) => {
  if (element === 'limpar') return localStorage.clear();
  const elementString = JSON.stringify(element);
  return localStorage.setItem('cartItems', elementString);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
