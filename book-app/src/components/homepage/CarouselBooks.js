import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import CarouselDisplay from "./CarouselDisplay";

function CarouselBooks() {
  const [jFiction, setJFiction] = useState([]);
  const [action, setAction] = useState([]); 
  const [romance, setRomance] = useState([]);

  useEffect(() => {
    const juvFiction = [];
    fetch(
      `http://openlibrary.org/subjects/juvenile+fiction.json?limit=6`
    )
      .then((res) => res.json())
      .then((data) => {
        data.works.forEach((e) => {
          juvFiction.push(e);
        });
        setJFiction(juvFiction);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const action = [];
    fetch(
      `http://openlibrary.org/subjects/action.json?limit=6`
    )
      .then((res) => res.json())
      .then((data) => {
        data.works.forEach((e) => {
          action.push(e);
        });
        setAction(action);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const rom = [];
    fetch(
      `http://openlibrary.org/subjects/romance.json?limit=6`
    )
      .then((res) => res.json())
      .then((data) => {
        data.works.forEach((e) => {
          rom.push(e);
        });
        setRomance(rom);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <CarouselDisplay juvTitles={jFiction} action={action} romance={romance}/>
    </div>
  );
}

export default CarouselBooks;
