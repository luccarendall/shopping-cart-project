let sacolaCarro = [];
const itemOpCarrinho = document.querySelector('.cart__items');
const limparCarrinho = document.querySelector('.empty-cart');
const valorTotal = document.querySelector('.total-price');
const items = document.querySelector('.items');

// colocando imagem dos produtos
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

// somando os itens dentro do carrinho
const sumItemsCart = () => {
  let total = 0;
  console.log(sacolaCarro);
  for (let index = 0; index < sacolaCarro.length; index += 1) {
    total += sacolaCarro[index].price;
  }
  valorTotal.innerText = total;
};

// escutador dos itens do carrinho
function cartItemClickListener(event) {
  event.target.remove();
  const arrRemoveItem = sacolaCarro.filter((ele) => ele.id !== event.target.id);
  saveCartItems(arrRemoveItem);
  sacolaCarro = arrRemoveItem;
  sumItemsCart();
}

// criando itens do carrinho
function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.id = sku;
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// personalizando item
function createCustomElement(element, className, innerText, ident) {
  const e = document.createElement(element);
  e.className = className;
  e.id = ident;
  e.innerText = innerText;
  if (element === 'button') {
    e.addEventListener('click', async () => {
      const item = await fetchItem(ident);
      itemOpCarrinho.appendChild(createCartItemElement(item));
      sacolaCarro.push(item);
      console.log(sacolaCarro);
      saveCartItems(sacolaCarro);
      sumItemsCart();
    });
  }
  return e;
}

// criando produto
function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!', sku));

  return section;
}

const loading = (req) => {
  const div = document.createElement('div');
  div.innerText = 'loading...';
  div.className = 'loading';
  items.appendChild(div);
  if (req === false) {
    items.innerHTML = '';
    console.log('entrou');
  }
};

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

// const prodSection = () => {
//   // const obj = {};
//   const itemSee = async (element) => {
//     const ident = element.path[0].id;
//     console.log(ident);
//     const teste = await fetchItem(ident);
//     console.log(teste);
//   };
// };

const addProductsScreen = async () => {
  loading(true);
  const item = document.querySelector('.items');
  const { results } = await fetchProducts('computador');
  loading(false);
  results.forEach((obje) => {
    item.appendChild(createProductItemElement(obje));
  });
};

const getSaved = () => {
  cartSaved = JSON.parse(getSavedCartItems());
  if (cartSaved && cartSaved.length > 0) {
    sacolaCarro = JSON.parse(getSavedCartItems());
    for (let index = 0; index < cartSaved.length; index += 1) {
      itemOpCarrinho.appendChild(createCartItemElement(cartSaved[index]));
    }
  }
};

limparCarrinho.addEventListener('click', () => {
  saveCartItems('limpar');
  itemOpCarrinho.innerHTML = '';
  sacolaCarro = [];
  valorTotal.innerText = 0;
});

addProductsScreen();
getSaved();
sumItemsCart();
  
window.onload = () => { };