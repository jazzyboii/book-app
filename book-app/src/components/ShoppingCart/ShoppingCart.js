import { useEffect, useState } from "react";
import BookCard from "./BookCard";

export default function ShoppingCart() {
    const [cart, setCart] = useState([]);



    useEffect( () => {
            fetch("http://localhost:9000/shopping/info")
              .then((res) => res.json())
              .then((text) => {
                  console.log("ShoppingCard: ", text)
                  setCart(text.result)
                })
              .catch((err) => console.log(err))
        }, [])

    return (
        <>
            <p>you are at the shopping cart</p>
            {cart && cart.map( (book) => <div key={book.id}>
                <p >{book.title}</p>
                <BookCard data = {book}/>
            </div>)}

        </>
    );
}