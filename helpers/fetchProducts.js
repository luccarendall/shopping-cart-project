const fetchProducts = async (value) => {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${value}`);
  const results = await response.json();
  return results;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}