import React, { Component, useState } from "react";

const Card = ({ moveCard, deleteCard, text, column, index }) => (
  <div className="card">
    <span
      className="card__arrow card__arrow--left"
      onClick={() => moveCard("left", text, column, index)}
    >
      &lt;
    </span>
    {text}
    <span
      className="card__arrow card__arrow--right"
      onClick={() => moveCard("right", text, column, index)}
    >
      &gt;
    </span>
    <button onClick={() => deleteCard(column, index)}>Delete</button>
  </div>
);

const Column = ({
  moveCard,
  addCard,
  deleteCard,
  column: { num, name, cards }
}) => (
  <div className={`column column${num}`}>
    <div className="column__header">{name}</div>
    {cards.map((text, index) => (
      <Card
        key={index}
        index={index}
        text={text}
        moveCard={moveCard}
        deleteCard={deleteCard}
        column={num}
      />
    ))}
    <button onClick={() => addCard(num)}>Add Card</button>
  </div>
);

class App extends Component {
  state = {
    nextCol: 5,
    columns: {
      1: {
        num: 1,
        name: "Winnie",
        cards: ["winnie card 1", "winnie card 2"]
      },
      2: {
        num: 2,
        name: "Bob",
        cards: ["bob card 1", "bob card 2"]
      },
      3: {
        num: 3,
        name: "Thomas",
        cards: ["thomas card 1", "thomas card 2"]
      },
      4: {
        num: 4,
        name: "George",
        cards: ["george card 1", "george card 2"]
      }
    }
  };

  addCard = columnNum => {
    const promptVal = prompt("Enter card text");

    if (!promptVal || promptVal.replace(/\s/, "") === "") {
      return;
    }

    this.setState(prevState => ({
      columns: {
        ...prevState.columns,
        [columnNum]: {
          num: prevState.columns[columnNum].num,
          name: prevState.columns[columnNum].name,
          cards: [...prevState["columns"][columnNum]["cards"], promptVal]
        }
      }
    }));
  };

  moveCard = (direction, cardText, currCol, index) => {
    const nextCol =
      direction === "left" ? Number(currCol) - 1 : Number(currCol) + 1;

    if (nextCol === 0 || nextCol === this.state.nextCol) return;

    const stateCopy = JSON.parse(JSON.stringify(this.state));

    stateCopy.columns[currCol].cards.splice(index, 1);
    stateCopy.columns[nextCol].cards.push(cardText);

    this.setState(stateCopy);
  };

  deleteCard = (currCol, index) => {
    const stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.columns[currCol].cards.splice(index, 1);
    this.setState(stateCopy);
  };

  render() {
    return (
      <div className="App">
        <Column
          column={this.state.columns["1"]}
          moveCard={this.moveCard}
          addCard={this.addCard}
          deleteCard={this.deleteCard}
        />
        <Column
          column={this.state.columns["2"]}
          moveCard={this.moveCard}
          addCard={this.addCard}
          deleteCard={this.deleteCard}
        />
        <Column
          column={this.state.columns["3"]}
          moveCard={this.moveCard}
          addCard={this.addCard}
          deleteCard={this.deleteCard}
        />
        <Column
          column={this.state.columns["4"]}
          moveCard={this.moveCard}
          addCard={this.addCard}
          deleteCard={this.deleteCard}
        />
      </div>
    );
  }
}

export default App;
