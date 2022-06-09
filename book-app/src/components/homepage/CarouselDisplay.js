import { Card, CardContent } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import "./styles.css";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function CarouselDisplay(props) {
  const { juvTitles, action, romance } = props;

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Juvenile Fiction</h1>
      <div className="CarouselDisplay">
        <Carousel breakPoints={breakPoints}>
          {juvTitles &&
            juvTitles.map((val, key) => (
              <Item>
                <p>{val.title}</p>
                <img
                  src={`https://covers.openlibrary.org/b/isbn/${val.isbn}-L.jpg`}
                  alt="book cover"
                />
              </Item>
            ))}
        </Carousel>
      </div>

      <h1 style={{ textAlign: "center" }}>Action</h1>
      <div className="CarouselDisplay">
        <Carousel breakPoints={breakPoints}>
          {action &&
            action.map((val, key) => (
              <Item>
                <p>{val.title}</p>
                <img
                  src={`https://covers.openlibrary.org/b/isbn/${val.isbn}-L.jpg`}
                  alt="book cover"
                />
              </Item>
            ))}
        </Carousel>
      </div>

      <h1 style={{ textAlign: "center" }}>Romance</h1>
      <div className="CarouselDisplay">
        <Carousel breakPoints={breakPoints}>
          {romance &&
            romance.map((val, key) => (
              <Item>
                <p>{val.title}</p>
                <img
                  src={`https://covers.openlibrary.org/b/isbn/${val.isbn}-L.jpg`}
                  alt="book cover"
                />
              </Item>
            ))}
        </Carousel>
      </div>
    </>
  );
}

export default CarouselDisplay;
