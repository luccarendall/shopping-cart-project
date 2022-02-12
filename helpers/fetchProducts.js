const fetchProducts = async (value) => {
  try {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${value}`);
    const results = await response.json();
    return results;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}