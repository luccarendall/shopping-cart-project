const fetchItem = async (item) => {
  const response = await fetch(`https://api.mercadolibre.com/items/${item}`);
  const results = await response.json();
  return results;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
