import "../Design/Design.css"

const Pyramid = ({ questionNumber, moneyPyramid }) => {

    return (
      <div className="pyramid">
        <ul className="moneyList">
          {moneyPyramid.map(({ id, amount }) => (
            <li key={id} className={questionNumber === id ? "moneyListItem active" : "moneyListItem"}>
              <span className="moneyListItemNumber">{id}</span>
              <span className="moneyListItemAmount">{amount}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Pyramid;
  