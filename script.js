let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

cartIcon.onclick = () =>{
  cart.classList.add("active");
}

closeCart.onclick = () =>{
  cart.classList.remove("active");
}


// helps to avoid potential issues where you might be trying to access or manipulate DOM elements that haven't been loaded yet
// it waits till DOM completely loads
// was facing problem with dom manipulation
if(document.readyState == "loading"){
  document.addEventListener("DOMContentLoaded",ready);
}else{
  ready();
}

const cartList = [];

function ready(){
  //Remove Items form Cart
  var removeCartButtons = document.getElementsByClassName('cart-remove')
  console.log(removeCartButtons)
  for (var i=0; i < removeCartButtons.length; i++){
      var button = removeCartButtons[i]
      button.addEventListener('click', removeCartItem);
  }
  //Quantity Change
  var quantityInputs = document.getElementsByClassName("cart-quantity")
  for (var i = 0; i < quantityInputs.length; i++){
      var input = quantityInputs[i];
      input.addEventListener("change",quantityChanged);
  }
  //Add Items to Cart
  var addCart = document.getElementsByClassName("add-cart");
  for (var i=0; i<addCart.length; i++){
      var button = addCart[i];
      button.addEventListener("click", addCartClicked);
  }
}


//Remove Items from Cart
function removeCartItem(event){

  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  var cartItemsNames = document.getElementsByClassName("cart-product-title");
  document.querySelector('#cart-num').innerHTML=cartItemsNames.length;

  console.log(cartItemsNames)
  updatetotal();
}

//Quantity Changed
function quantityChanged(event){
  var input = event.target;
  if(isNaN(input.value) || input.value <=0){
      input.value = 1;
  }
  updatetotal();
}

//Add to cart
function addCartClicked(event){
  var button = event.target
  var shopProducts = button.parentElement.parentElement
  var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  var price = shopProducts.getElementsByClassName("price")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg)
  updatetotal();
}

function addProductToCart(title, price, productImg){
  var cartShopBox = document.createElement('div')
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName('cart-content')[0];
  var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  document.querySelector('#cart-num').innerHTML=cartItemsNames.length+1;
  for (var i=0; i < cartItemsNames.length; i++) {
    console.log( cartItemsNames)
    console.log(title)
    if (cartItemsNames[i].innerHTML.localeCompare(title) === 0) {
      alert("You have already added this item in your cart");
      return;
  } 
  }
  var cartBoxContent = `
                  
  <img height="100px" class="cart-img" src="${productImg}" alt="">
  <div class="detail-box">
      <div class="cart-product-title">${title}</div>
      <div class="cart-price">${price}</div>
      <input type="number" value="1" class="cart-quantity"> 
  </div>
  <box-icon class="cart-remove" name='trash' type='solid' color='#ff0000' ></box-icon>
                  
                                 `;

                cartShopBox.innerHTML = cartBoxContent;
                cartItems.append(cartShopBox);
                cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
                cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
            }
            
            //Buy Button
            document.getElementsByClassName('btn-buy')[0].addEventListener('click',buyButtonClicked )
            
            function buyButtonClicked(){ 
                alert("Order Placed ! Let's move to Payment")
                var cartContent = document.getElementsByClassName("cart-content")[0];
                while (cartContent.hasChildNodes()) {
                    cartContent.removeChild(cartContent.firstChild);
                }
                updatetotal();
            }
            
            //Total Update
            function updatetotal(){
                var cartContent = document.getElementsByClassName("cart-content")[0];
                var cartBoxes = cartContent.getElementsByClassName("cart-box");
                var total = 0;
                for (var i=0; i < cartBoxes.length; i++) {
                    var cartBox = cartBoxes[i];
                    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
                    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
                    var price = parseFloat(priceElement.innerText.replace("$", ""));
                    var quantity = quantityElement.value;
                    // console.log(quantity)
                    total = total + (price*quantity);
                }    
            
                    //Roundig off Total
                total = Math.round(total*100)/100;
            
                document.getElementsByClassName("total-price")[0].innerText = "$" + total;
                
            }