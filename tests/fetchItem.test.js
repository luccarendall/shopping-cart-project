require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('Teste a função fecthItem', () => {
  test('deve retornar uma funcao', async () => {
    expect(typeof fetchItem).toBe('function');
  });
  test('verifica se fetch foi chamada', async () => {
    await fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalled();
  });
  test('função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada;', async () => {
    const link = "https://api.mercadolibre.com/items/MLB1615760527";
    await fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalledWith(link);
  });
  test('fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item', async () => {
    const response = await fetchItem("MLB1615760527");
    expect(response).toEqual(item);
  });
  test('verifica se retorna um erro com a mensagem: You must provide an url', async () => {
    const response = await fetchItem();
    expect(response).toEqual(new Error('You must provide an url'))
    });  
});
