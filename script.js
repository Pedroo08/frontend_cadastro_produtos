const products = [];

//forms tags
const form = document.getElementById('productForm');
const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description');
const priceInput = document.getElementById('price');
const disponibilityInput  = document.getElementById('disponibility');

////lista tabela
const productTable = document.querySelector('table tbody'); 

//Popups tags
const popup = document.getElementById('popup');
const openPopupBtn = document.getElementById('openPopup');
const closePopupBtn = document.getElementById('closePopup');


//Ler o Json e adicona a tabela 
fetch("./produtos.json").then((response) => {
  response.json().then((dados) =>{
     console.log(dados.products);
     sort(dados.products)

  dados.products.map((product) =>{products.push(product);
      sort(products);
      addTable(product);
     } )
     
   })

})

//Cadastra o produto na ordem
form.addEventListener('submit', function(event) {
    event.preventDefault();

  let name = nameInput.value;
  let description = descriptionInput.value; 
  let price = parseFloat(priceInput.value);
  let disponibility = disponibilityInput.value;

  const newProduct = {
      name: name,
      description: description,
      price: price,
      disponibility : disponibility  === 'sim'
  };

  products.push(newProduct);
  form.reset();
  Replace();
  console.log(products)
    
});

//Realoca os produtos na tabela na ordem
function Replace(){
  const productTable = document.querySelector('table tbody');
  productTable.innerHTML = '';
  sort(products)
  products.map((product)=> addTable(product))
}

//ordena a o array 
function sort(listProducts){
  listProducts.sort((a, b) => a.price - b.price);
}


//adiciona 1 produto na tabela
function addTable(product){
    
  {
    const tableRow = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = product.name;
    tableRow.appendChild(nameCell);

    const priceCell = document.createElement('td');
    priceCell.textContent = `R$ ${Number(product.price).toFixed(2)}`; 
    tableRow.appendChild(priceCell);

    productTable.appendChild(tableRow);
  }
}

//Ativando e destivando o popup
document.addEventListener('DOMContentLoaded', () => {

  openPopupBtn.addEventListener('click', () => {
      popup.style.display = 'flex';
  });

  closePopupBtn.addEventListener('click', () => {
      popup.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
      if (event.target === popup) {
          popup.style.display = 'none';
      }
  });
});
