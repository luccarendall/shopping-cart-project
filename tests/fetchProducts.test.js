require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  test('fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  })
  it('fetchProducts com o argumento computador chama o fetch ', async () => {
     await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })
  test('chamar fetchProducts com argumento computador, a função utiliza o endpoint', async () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  })
  test('verifica se o retorno de fetchProducts(computador) é igual ao objeto computadorSearch', async () => {
    const obj = await fetchProducts('computador')
    expect(obj).toEqual(computadorSearch);
  })
  test('Passar a função fetchProduct sem argumento retorna um erro com a mensagem You must provide an url', async () => {
    expect.assertions(1);
    try {
      await fetchProducts();
    }
    catch (e) {
      expect(e).toEqual(new Error ('You must provide an url'));
    }
  });
});
