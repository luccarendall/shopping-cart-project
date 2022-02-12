const fetchItem = async (item) => {
  try {
    const response = await fetch(`https://api.mercadolibre.com/items/${item}`);
    const results = await response.json();
    return results;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
