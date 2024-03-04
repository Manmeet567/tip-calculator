import { useState } from "react";
import "./App.css";
import DollarIcon from "./assets/icon-dollar.svg";

function App() {
  const tipArr = [5, 10, 15, 25, 50];
  const [value, setValue] = useState(0);
  const [people, setPeople] = useState(0);
  const handleChange = (event) => {
    const { name, value: inputValue } = event.target;

    // Check the name attribute to determine which state to update
    if (name === "value") {
      const result = inputValue.replace(/[^0-9.]/g, "");
      setValue(result);
    } else if (name === "people") {
      const result = inputValue.replace(/\D/g, "");
      setPeople(result);
    }
  };

  return (
    <div className="tip-calculator">
      <div className="heading">
        <p>SPLI</p>
        <p>TTER</p>
      </div>

      <div className="main-calculator-container">
        <div className="left-container">
          <div className="input-box">
            <p>Bill</p>
            <div className="bill-input-box">
              <img src={DollarIcon} alt="$" />
              <input
                type="text"
                placeholder="0"
                name="value"
                value={value}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="select-tip-container">
            <p>Select Tip %</p>
            <div className="stc-container">
              <button></button>
            </div>
          </div>

          <div className="people-input">
            <p>Number of People</p>
            <div className="bill-input-box">
              <img src={DollarIcon} alt="$" />
              <input
                type="text"
                placeholder="0"
                name="people"
                value={people}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="right-container"></div>
      </div>
    </div>
  );
}

export default App;
