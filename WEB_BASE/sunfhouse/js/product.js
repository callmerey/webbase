var shoppingCart = (function() {
    cart = [];
    // Constructor
    function Item(name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count;
    }

    // Save cart
    function saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // Load cart
    function loadCart() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
        loadCart();
    }


    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};

    // Add to cart
    obj.addItemToCart = function(name, price, count) {
            for (var item in cart) {
                if (cart[item].name === name) {
                    cart[item].count++;
                    saveCart();
                    return;
                }
            }
            var item = new Item(name, price, count);
            cart.push(item);
            saveCart();
        }
        // Set count from item
    obj.setCountForItem = function(name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
    };
    // Remove item from cart
    obj.removeItemFromCart = function(name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count--;
                if (cart[item].count === 0) {
                    cart.splice(item, 1);
                }
                break;
            }
        }
        saveCart();
    }

    // Remove all items from cart
    obj.removeItemFromCartAll = function(name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart.splice(item, 1);
                break;
            }
        }
        saveCart();
    }

    // Clear cart
    obj.clearCart = function() {
        cart = [];
        saveCart();
    }

    // Count cart 
    obj.totalCount = function() {
        var totalCount = 0;
        for (var item in cart) {
            totalCount += cart[item].count;
        }
        return totalCount;
    }

    // Total cart
    obj.totalCart = function() {
        var totalCart = 0;
        for (var item in cart) {
            totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
    }

    // List cart
    obj.listCart = function() {
        var cartCopy = [];
        for (i in cart) {
            item = cart[i];
            itemCopy = {};
            for (p in item) {
                itemCopy[p] = item[p];
            }
            itemCopy.total = Number(item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }
    return obj;
})();

// function add_cart(idProduct) {

//     /*     event.preventDefault(); */

//     var name = $(this).attr('data-name');
//     var price = Number($(this).data('price'));
//     console.log(name);


//     shoppingCart.addItemToCart(name, price, 1);
//     displayCart();
// }

sessionStorage.setItem('products', JSON.stringify(product_js));




$(document).ready(function displayProduct() {
    var cartArray = product_js;
    var output = "";
    var productId = 0;
    for (var i in cartArray) {
        productId++;
        output +=
            '<div class="col_1_of_3 span_1_of_3">' +
            '<div class="view view-first">' +
            '<a href="">' +
            '<div class="inner_content clearfix">' +
            '<div class="product_image">' +
            '<img src="/sunfhouse/images/pic1.jpg" class="img-responsive" alt="">' +
            '<div class="mask">' +
            '<div class="info"> ' +
            /* '<a href="javascript:void(0)" data-name="' + cartArray[i].name + '" data-price="' + cartArray[i].price + '"class="add-to-cart" id="product_' + productId + '" onclick="add_cart(' + productId + ')">Add to cart</a></div>' + */
            '<a href="javascript:void(0)" data-name="' + cartArray[i].name + '" data-price="' + cartArray[i].price + '" data-id="' + cartArray[i].id + '" class="add-to-cart">Add to cart</a></div>' +
            '</div>' +
            '<div class="product_container">' +
            '<div class="cart-left">' +
            '<p class="title">' + cartArray[i].name + '</p>' +
            '</div>' +
            '<div class="price">' + cartArray[i].price + '</div>' +
            '<div class="clearfix"></div>' +
            '</div>' +
            '</div>' +
            '<div class="sale-box"><span class="on_sale title_shop">New</span></div>' +
            '</div>' +
            '</a>' +
            '</div>' +
            '</div>'
    }
    $('.product').html(output);


    $('.add-to-cart').click(function(event) {

        event.preventDefault();
        var id = $(this).attr('data-id');
        var name = $(this).attr('data-name');
        console.log(name)
        var price = Number($(this).data('price'));
        shoppingCart.addItemToCart(name, price, 1);
        // displayCart();
    });
})