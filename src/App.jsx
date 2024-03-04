import { useState, useEffect } from "react";
import "./App.css";
import DollarIcon from "./assets/icon-dollar.svg";
import PeopleIcon from "./assets/icon-person.svg";

function App() {
  const tipArr = [5, 10, 15, 25, 50];
  const [value, setValue] = useState("");
  const [tip, setTip] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [people, setPeople] = useState("");
  const [activeButton, setActiveButton] = useState(null);

  const [calculatedTip, setCalculatedTip] = useState(0.0);
  const [total, setTotal] = useState(0.0);

  useEffect(() => {
    if (!value || !people || parseFloat(people) === 0 || parseFloat(value) === 0) {
        return;
    }

    let totalAmount = parseFloat(value);
    let tipAmount = 0;

    if (tip && parseFloat(tip) !== 0) {
        tipAmount = (totalAmount * parseFloat(tip)) / 100;
    }

    totalAmount += tipAmount;

    const totalPerPerson = (totalAmount / parseFloat(people)).toFixed(2);
    const tipPerPerson = (tipAmount / parseFloat(people)).toFixed(2);


    setCalculatedTip(tipPerPerson);
    setTotal(totalPerPerson);
}, [value, tip, people]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    const patterns = {
      value: /^\d{0,5}(\.\d{0,2})?$/,
      tip: /^\d{0,2}$/,
      people: /^\d{0,4}$/,
    };

    const isValidInput = patterns[name].test(value);

    if (isValidInput) {
      switch (name) {
        case "value":
          setValue(value);
          break;
        case "tip":
          setTip(value);
          break;
        case "people":
          setPeople(value);
          break;
        default:
          break;
      }
    }
  };

  const reset = () => {
    setValue("");
    setPeople("");
    setTip("");
    setIsCustom(false);
    setActiveButton(null);
    setCalculatedTip(0);
    setTotal(0);
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
              {tipArr.map((item, index) => (
                <button
                  onClick={() => {
                    setTip(item);
                    setIsCustom(false);
                    setActiveButton(index);
                  }}
                  key={index}
                  className={activeButton === index ? "active" : ""}
                >
                  {item}%
                </button>
              ))}
              {!isCustom && (
                <button
                  onClick={() => {
                    setTip("");
                    setIsCustom(true);
                    setActiveButton(null);
                  }}
                >
                  Custom
                </button>
              )}
              {isCustom && (
                <input
                  type="text"
                  name="tip"
                  value={tip}
                  autoFocus
                  onChange={handleChange}
                />
              )}
            </div>
          </div>

          <div className="people-input">
            <p>Number of People</p>
            <div className="bill-input-box">
              <img src={PeopleIcon} alt="$" />
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

        <div className="right-container">
          <div>
            <div className="tip-per-person">
              <div className="label">
                <p>Tip Amount</p>
                <p>/ person</p>
              </div>
              <div className="amount">
                <p>${calculatedTip !== "0" ? calculatedTip : "0.00"}</p>
              </div>
            </div>

            <div className="total-per-person">
              <div className="label">
                <p>Total</p>
                <p>/ person</p>
              </div>
              <div className="amount">
                <p>${total !== "0" ? total : "0.00"}</p>
              </div>
            </div>
          </div>

          <button onClick={reset} disabled={!value || !people}>
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
