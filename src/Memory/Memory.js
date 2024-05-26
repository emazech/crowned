import { useState } from "react";
import Card from "./Card.js";
import htmlPic from "./img/html.png";
import cssPic from "./img/css.png";
import jsPic from "./img/js.png";
import reactPic from "./img/react.png";
import vuePic from "./img/vue.png";
import scssPic from "./img/scss.png";
import angularPic from "./img/angular.png";
import nodePic from "./img/nodejs.png";
import "./memory.scss";

function Cards() {
  const [items, setItems] = useState(
    [
      { id: 1, img: htmlPic, stat: "" },
      { id: 1, img: htmlPic, stat: "" },
      { id: 2, img: cssPic, stat: "" },
      { id: 2, img: cssPic, stat: "" },
      { id: 3, img: jsPic, stat: "" },
      { id: 3, img: jsPic, stat: "" },
      { id: 4, img: scssPic, stat: "" },
      { id: 4, img: scssPic, stat: "" },
      { id: 5, img: reactPic, stat: "" },
      { id: 5, img: reactPic, stat: "" },
      { id: 6, img: vuePic, stat: "" },
      { id: 6, img: vuePic, stat: "" },
      { id: 7, img: angularPic, stat: "" },
      { id: 7, img: angularPic, stat: "" },
      { id: 8, img: nodePic, stat: "" },
      { id: 8, img: nodePic, stat: "" },
    ].sort(() => Math.random() - 0.5)
  );

  const [prev, setPrev] = useState(-1);

  function check(current) {
    if (items[current].id === items[prev].id) {
      items[current].stat = "correct";
      items[prev].stat = "correct";
      setItems([...items]);
      setPrev(-1);
    } else {
      items[current].stat = "wrong";
      items[prev].stat = "wrong";
      setItems([...items]);
      setTimeout(() => {
        items[current].stat = "";
        items[prev].stat = "";
        setItems([...items]);
        setPrev(-1);
      }, 1000);
    }
  }

  function handleClick(id) {
    if (prev === -1) {
      items[id].stat = "active";
      setItems([...items]);
      setPrev(id);
    } else {
      check(id);
    }
  }

  return (
    <div className="bg-pink-200 flex justify-center items-center h-svh">
      <div className="grid-cols-4 grid gap-4">
        {items.map((item, index) => (
          <Card key={index} item={item} id={index} handleClick={handleClick} />
        ))}
      </div>
    </div>
  );
}

export default Cards;
