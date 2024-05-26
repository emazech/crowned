import React from "react";

function Card({ item, id, handleClick }) {
  const itemClass = item.stat ? ` active ${item.stat}` : "";

  return (
    <div
      className={`bg-gray-100 w-28 h-28 flex justify-center rounded-md memory-card${itemClass}`}
      onClick={() => handleClick(id)}>
      <img className="w-20 h-20 p-4" src={item.img} alt="" />
    </div>
  );
}

export default Card;
