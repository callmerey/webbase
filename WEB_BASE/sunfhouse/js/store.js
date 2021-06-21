var product_js = [{
    name: "Áo số 1",
    price: "190000",
}, {
    name: "Áo số 2",
    price: "170000",
}, {
    name: "Áo số 3",
    price: "180000",
}, ]

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

// $('.add-to-cart').click(function(event) {

//     event.preventDefault();
//     var id = $(this).attr('data-id');
//     var name = $(this).attr('data-name');
//     console.log(name)
//     var price = Number($(this).data('price'));
//     shoppingCart.addItemToCart(name, price, 1);
//     // displayCart();
// });

// Clear items
$('.remove_cart').click(function() {
    shoppingCart.clearCart();
    displayCart();
});


function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {
        output += " <tr>" +
            "<td>" +
            "<table>" +
            "<tr>" +
            "<td>" + '<img width="200" height="250" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Surfer_at_the_Cayucos_Pier%2C_Cayucos%2C_CA.jpg/1200px-Surfer_at_the_Cayucos_Pier%2C_Cayucos%2C_CA.jpg"alt=""></td>' +
            "<td>" + '<b style="margin-top: 100px"><div class="name_item">' + cartArray[i].name + '</div></b>' +
            "<p style='width: 256px;'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
            '<div style="margin-bottom: 40px">' +
            '<i class="fab fa-facebook-f"></i>' +
            '<i style="margin-left: 20px" class="fab fa-twitter"></i>' +
            '<i style="margin-left: 20px" class="fab fa-instagram-square"></i>' +
            "</div>" +
            "</td>" +
            "</tr>" +
            "</table>" +
            "</td>" +
            "<td>" + cartArray[i].price + 'VNĐ' + "</td>" +
            "<td>" +
            '<div class="input-group" style="width: 120px;">' +
            '<input class="minus-item is-form" type="button" value="-">' +
            '<input aria-label="quantity" style="width: 25px;" class="item-count" max="100" min="1" name="" type="number" value="' + cartArray[i].count + '"' + 'data-name=' + cartArray[i].name + '">' +
            '<input class="plus-item is-form" type="button" value="+">' +
            "</div>" +
            "</td>" +
            "</tr>"
    }
    $('.total-cart').html(shoppingCart.totalCart() + ' ' + 'VNĐ');
    $('.total-count').html(shoppingCart.totalCount());
    $('.result').html(output);
}

// Delete item button

$('.show-cart').on("click", ".delete-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
})


// -1
$('.result').on("click", ".minus-item", function(event) {
        var name = $(this).data('name')
        shoppingCart.removeItemFromCart(name);
        displayCart();
    })
    // +1
$('.result').on("click", ".plus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
})

// Item count input
$('.result').on("change", ".item-count", function(event) {
    var name = $(this).data('name');
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
});
displayCart();