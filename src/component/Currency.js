import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  "https://v6.exchangerate-api.com/v6/dd47666f1ad5d235862628b3/latest";

const RATE_URL =
  "https://v6.exchangerate-api.com/v6/dd47666f1ad5d235862628b3/pair";

const Currency = () => {
  const [currencyRates, setCurrencyRates] = useState([]);
  const [selectedTo, setSelectedTo] = useState(null);
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [amount, setAmount] = useState(null);
  const [currencyRate, setCurrencyRate] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const getCurrencies = async () => {
    const response = await axios.get(API_URL + "/" + "USD");

    const { conversion_rates } = response.data;
    setCurrencyRates(Object.keys(conversion_rates));
  };

  const getRate = async () => {
    const response = await axios.get(
      RATE_URL + "/" + selectedFrom + "/" + selectedTo + "/" + amount
    );

    const rateResult = response.data.conversion_result;
    setCurrencyRate(rateResult);
  };

  const handleChangeSelectionTo = (e) => {
    setSelectedTo(e.target.value);
  };

  const handleChangeSelectionFrom = (e) => {
    setSelectedFrom(e.target.value);
  };
  const handleGetAmount = (e) => {
    setAmount(e.target.value);
  };
  const handleExchangeMoney = () => {
    setShowResults(true);
    getRate();
  };
  const handleSwap = (e) => {
    e.preventDefault();
    setSelectedFrom(selectedTo);
    setSelectedTo(selectedFrom);
    // handleExchangeMoney();
  };
  useEffect(() => {
    getCurrencies();
  }, []);

  return (
    <div className="content-container">
      <h1 className="currency-title">Currency Converter</h1>
      <div className="currency-container">
        <div className="currency-form">
          <div className="currency-amount">
            <label className="currency-labels" for="">
              Amount
            </label>
            <input
              onChange={handleGetAmount}
              className="currency-inputs"
              type="number"
              placeholder="$"
              min="0"
            />
          </div>
          <div style={{ marginLeft: "30px" }} className="currency-amount">
            <label className="currency-labels" for="">
              From
            </label>
            <select
              value={selectedFrom}
              onChange={handleChangeSelectionFrom}
              className="currency-selects"
            >
              {currencyRates.map((x, index) => (
                <option key={index} value={x} className="rate">
                  {x}
                </option>
              ))}
            </select>
          </div>
          <div onClick={handleSwap} className="icon">
            <img
              width={30}
              src={require("../assets/images/exchange.png")}
              alt=""
            />
          </div>
          <div className="currency-to">
            <label className="to-labels" for="">
              To
            </label>
            <select
              value={selectedTo}
              onChange={handleChangeSelectionTo}
              className="to-selects"
            >
              {currencyRates.map((x, index) => (
                <option key={index} value={x} className="rate">
                  {x}
                </option>
              ))}
            </select>
          </div>
        </div>
        {showResults && (
          <div className="result">
            <p id="from-result">
              {amount} {selectedFrom}
            </p>
            <span className="equal">=</span>
            <p id="to-result">
              {Math.round(currencyRate)} {selectedTo}
            </p>
          </div>
        )}
        <div className="convert-div">
          <button
            onClick={handleExchangeMoney}
            type="submit"
            className="convert-btn"
          >
            convert
          </button>
        </div>
      </div>
    </div>
  );
};

export default Currency;
