let arrMyCart = [];
const olCart = document.querySelector('.cart__items');
const clearCart = document.querySelector('.empty-cart');
const valueTotal = document.querySelector('.total-price');
const load = document.querySelector('.loading');
const items = document.querySelector('.items');
let savedItemsOfCart = [];
// const { fetchItem } = require("./helpers/fetchItem");
const cart = document.querySelector('.cart');
const p = document.createElement('p');
p.className = 'total-price';
cart.appendChild(p);

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

const sumItemsCart = () => {
  let total = 0;
  valueTotal.innerText = 0;
  console.log(arrMyCart);
  for (let index = 0; index < arrMyCart.length; index += 1) {
    total += arrMyCart[index].price;
  }
  valueTotal.innerText = total;
};

function cartItemClickListener(event) {
  const idDeleted = event.target.innerText.split(' ')[1];
  event.target.remove();
  const newSavedItemsOfCart = savedItemsOfCart.filter((item) => item.id !== idDeleted);
  savedItemsOfCart.splice(-1, 1);
  saveCartItems(JSON.stringify(savedItemsOfCart));
  const sum = newSavedItemsOfCart.reduce((acc, item) => acc + item.price, 0.00);
  p.innerText = `${parseFloat(sum.toFixed(2))}`;
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.id = sku;
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addItemToCart(event) {
  const id = event.target.parentNode.children[0].innerText;
  const addItem = await fetchItem(id);
  list.appendChild(createCartItemElement(addItem));
  savedItemsOfCart.push(addItem);
   saveCartItems(JSON.stringify(savedItemsOfCart));
   const sum = savedItemsOfCart.reduce((acc, item) => acc + item.price, 0.00);
   p.innerText = `${parseFloat(sum.toFixed(2))}`;
} if (itemsCart) { 
  savedItemsOfCart = itemsCart; // reatribui o array 
  itemsCart.forEach((item) => {
    list.appendChild(createCartItemElement(item));
  });
}

addItemToCart();

function createCustomElement(element, className, innerText, ident) {
  // const olCart = document.querySelector('.cart__items');
  const e = document.createElement(element);
  e.className = className;
  e.id = ident;
  e.innerText = innerText;
  if (element === 'button') {
    e.addEventListener('click', async () => {
      const item = await fetchItem(ident);
      console.log(item);
        olCart.appendChild(createCartItemElement(item));
        arrMyCart.push(item);
        console.log(arrMyCart);
        saveCartItems(arrMyCart);
        sumItemsCart();
    });
  }
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!', sku));
  return section;
}

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

const addProductsScreen = async () => {
  loading(true);
    const item = document.querySelector('.items');
    const { results } = await fetchProducts('computador');
    loading(false);
  results.forEach((obje) => {
    item.appendChild(createProductItemElement(obje));
  });
  // objId = results.id;
  // const btnItem = document.querySelector('.item__add');
  // btnItem.addEventListener('click', itemSee);
};

const getSaved = () => {
  cartSaved = getSavedCartItems();
  if (cartSaved && cartSaved.length > 0) {
    arrMyCart = getSavedCartItems();
    for (let index = 0; index < cartSaved.length; index += 1) {
      olCart.appendChild(createCartItemElement(cartSaved[index]));
    }
  }
};

clearCart.addEventListener('click', () => {
  saveCartItems('limpar');
  olCart.innerHTML = '';
  arrMyCart = [];
  valueTotal.innerText = 0;
});

  addProductsScreen();
  getSaved();
  sumItemsCart();

  window.onload = () => { };