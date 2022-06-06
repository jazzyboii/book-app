import { useEffect, useState } from "react";

export default function ShoppingCart() {
    const [cart, setCart] = useState();

    useEffect( () => {
            fetch("http://localhost:9000/shopping/info")
              .then((res) => res.json())
              .then((text) => {
                  console.log("ShoppingCard: ", text)
                  setCart(text)
                })
              .catch((err) => console.log(err))
        }, [])

    return (
        <>
            <p>you are at the shopping cart</p>
        </>
    );
}