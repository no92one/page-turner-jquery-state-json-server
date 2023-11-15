const intialCart = `
    <h3>Cart</h3>
    <ul>      
    </ul>
    <p class="total"></p>
  `

export async function addToCart(target) {
  const cart = await loadCart()
  // find nextId
  let nextId = 1
  for (let item of cart) {
    if (item.id >= nextId) {
      nextId = item.id
      nextId++
    }
  }
  console.log(cart, nextId)
  const $product = $(target.parentElement)

  // add new item
  const newItem = {
    id: nextId,
    user: "Ben",
    name: $product.children('.name').text(),
    price: parseInt($product.find('.price').text()),
    amount: 1
  }
  saveNewItem(newItem)
  cart.push(newItem)

  renderCart(cart)
  updateTotal(cart)
}

async function initialLoad() {
  const cart = await loadCart()
  if (cart.length > 0) {
    renderCart(cart)
    updateTotal(cart)
  }
}
// run initial load
initialLoad()

async function loadCart() {
  const response = await fetch('/cart') // fetch previous / saved state
  const cart = await response.json()
  return cart
}

function renderCart(cart) {
  // reset the cart before rerender
  $('#cart').html(intialCart)

  for (let item of cart) {
    $('#cart ul').append(`
      <li>
        ${item.name} <span class="price">${item.price}</span>kr
      </li >
    `)
  }
}

function updateTotal(cart) {
  let total = 0
  for (let item of cart) {
    total += item.price
  }
  $('#cart .total').html(`Total: <span>${total}</span>kr`)
}

async function saveNewItem(item) {
  let response = await fetch('/cart', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  response = await response.json();
  return response
}