const sectionPai = document.querySelector('.items');
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  const qualyImage = image.split('-');
  if (qualyImage[2].includes('I')) qualyImage[2] = 'J.jpg';
  const highImage = `${qualyImage[0]}-${qualyImage[1]}-${qualyImage[2]}`;
  section.appendChild(createProductImageElement(highImage));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const prodSection = () => {
  const obj = {};
  fetchProducts('computador').then((results) => results.forEach(({ id, title, thumbnail }) => {
      obj.sku = id;
      obj.name = title;
      obj.image = thumbnail; 
      sectionPai.appendChild(createProductItemElement(obj));
    }));
};
window.onload = () => {
  prodSection();
 };
