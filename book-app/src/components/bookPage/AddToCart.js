import React, { useContext } from "react";
import { ShoppingContext } from "../../contexts/shoppingContext";

function AddToCart(props) {
  const { name, isbn } = props;
  const { cart, setCart } = useContext(ShoppingContext);

  console.log(cart);
  setCart([
    ...cart,
    {
      title: name,
      isbn: isbn,
    },
  ]);

  var text = name + " was added to cart!";
  alert(text);
}

export default AddToCart;
