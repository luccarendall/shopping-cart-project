// const { fetchItem } = require("./helpers/fetchItem");
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function cartItemClickListener(event) {
  event.target.remove();
}

function createCartItemElement({ id: sku, title: name, base_price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function createCustomElement(element, className, innerText, ident) {
  const olCart = document.querySelector('.cart__items');
  const e = document.createElement(element);
  e.className = className;
  e.id = ident;
  e.innerText = innerText;
  if (element === 'button') {
    e.addEventListener('click', async () => {
      const item = await fetchItem(ident);
      console.log(item);
olCart.appendChild(createCartItemElement(item));
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

  const addProducts = async () => {
    const item = document.querySelector('.items');
    const { results } = await fetchProducts('computador');
  results.forEach((obje) => {
    item.appendChild(createProductItemElement(obje));
  });
  // objId = results.id;
  // const btnItem = document.querySelector('.item__add');
  // btnItem.addEventListener('click', itemSee);
};
  addProducts();

  window.onload = () => { };
