require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  test('fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  })
  test('verifica se fetch foi chamada', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  test('verifica a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador', async () => {
    const link = "https://api.mercadolibre.com/sites/MLB/search?q=computador";
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(link);
  });
  test('verifica o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const responseComp = await fetchProducts('computador');
    expect(responseComp).toEqual(computadorSearch);
  });
  test('verifica se retorna um erro com a mensagem: You must provide an url', async () => {
  const response = await fetchProducts();
    expect(response).toEqual(new Error('You must provide an url'))
  });  
});
