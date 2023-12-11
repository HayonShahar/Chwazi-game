import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import './Schwazi.css';
import Swal from 'sweetalert2';

const Start = () => {
  const [selectNum, setSelectNum] = useState('');
  const [selectAmount, setSelectAmount] = useState('');
  const [randomNumber, setRandomNumber] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [showStartButton, setShowStartButton] = useState(true);
  const [showNewGameButton, setShowNewGameButton] = useState(false);
  const [visibleDivs, setVisibleDivs] = useState([]);
  const [showSelections, setShowSelections] = useState(true);

  const selectPlayersRef = useRef(null);
  const selectAmountRef = useRef(null);
  const colors = ['red', 'yellow', 'green', 'orange', 'blue', 'white'];

  // Function to generate an array of consecutive indexes based on a given length
  const generateIndexesArray = (length) => {
    const indexesArray = [];
    for (let i = 0; i < length; i++) {
      indexesArray.push(i);
    }
    return indexesArray;
  };

  // Handler triggered when the number of players selection changes
  const numberChange = (event) => {
    setSelectNum(event.target.value);
    setRandomNumber(null);
    setVisibleDivs(generateIndexesArray(event.target.value));
    setShowSelections(true);
  };

  // Handler triggered when the selected amount of players changes
  const amountChange = (event) => {
    setSelectAmount(event.target.value);
  };

  // Function to display information using SweetAlert, providing guidance on selections and button functionalities
  const information = () => {
    Swal.fire({
      html:`
      <div>
          <b>P select:</b>
          In the 'P' select you need to choose the number of players who will play in the current round,
          <br>
          <br>
          For example:
          <br>
          If you are 4 players, select the option '4' at 'P'
          <br>
          <br>
          <b>A select:</b>
          In the 'A' select you need to choose the amount of players who will picked-up in the current round
          <br>
          <br>
          For example:
          <br>
          If you are 5 players and want to pick 2, select the option '2' at 'A'
          <br>
          <br>
          <b>Start button:</b>
          When you click on the staart button, the amount of players you selected will picked-up from the numbebr of players you selected.
      </div>
      `,
      icon: "question"
    });
  };

  // Function to initiate the random selection of players with colors
  const generateRandomColor = () => {
    if (selectAmount < 1 || selectAmount > selectNum || selectAmount === selectNum) {
      return;
    }
    setCountdown(3);
    setShowStartButton(false);
    setShowSelections(false);

    const countdownInterval = setInterval(() => {
      setCountdown((prevCount) => (prevCount !== null ? prevCount - 1 : prevCount));
    }, 1000);

    setTimeout(() => {
      clearInterval(countdownInterval);
      setShowNewGameButton(true);
      setRandomNumber(Math.floor(Math.random() * 1000));
    }, 3000);
  };

  // Function to reset the game to its initial state
  const resetGame = () => {
    setRandomNumber(null);
    setSelectNum('');
    setSelectAmount('');
    setShowStartButton(true);
    setShowNewGameButton(false);
    setVisibleDivs([]);
    setShowSelections(true);

    if (selectPlayersRef.current) {
      selectPlayersRef.current.value = '';
    }
    if (selectAmountRef.current) {
      selectAmountRef.current.value = '';
    }
  };

  // Function to generate visible divs based on selected players and their random selection
  const generateVisibleDivs = (selectNum, randomIndexes) => {
    const visibleDivs = [];
    for (let i = 0; i < selectNum; i++) {
      visibleDivs.push(randomIndexes.includes(i) ? i : 'black');
    }
    return visibleDivs;
  };

  // Effect to handle countdown changes during the selection process
  useEffect(() => {
    if (countdown !== null && countdown >= 0) {
      setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
  }, [countdown]);

  // Effect to handle changes in the randomly selected player
  useEffect(() => {
    if (randomNumber !== null) {
      const randomIndexes = [];
      while (randomIndexes.length < selectAmount) {
        const randomIndex = Math.floor(Math.random() * selectNum);
        if (!randomIndexes.includes(randomIndex)) {
          randomIndexes.push(randomIndex);
        }
      }
      setVisibleDivs(generateVisibleDivs(selectNum, randomIndexes));
    }
  }, [randomNumber]);

  return (
    <Container className='chwazi-container'>
      {showSelections && (
        <>
          <div className='startMenu'>
            <div className='selectsDivs'>
              <div>
                <select className='selects' ref={selectPlayersRef} onChange={numberChange}>
                  <option value=''>P</option>
                  {[2, 3, 4, 5, 6].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select className='selects' ref={selectAmountRef} onChange={amountChange}>
                  <option value=''>A</option>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='informationBTN'>
              <button onClick={information}>?</button>
            </div>
          </div>
        </>
      )}
      <div style={{ marginTop: showSelections ? '80px' : '167px'}}>
        <Row className='circles'>
        {visibleDivs.map((index) => (
          <Col key={index} xs={6} sm={4} className='circlesCol'>
            <div
              className={`chwazi-div ${countdown !== null && countdown >= 0 ? 'beat' : ''}`}
              style={{
                backgroundColor: index !== 'black' ? colors[index % colors.length] : 'black',
                outline: '5px solid black',
                boxShadow: `0 0 0 9px ${colors[index % colors.length]}`,
              }}
            ></div>
          </Col>
        ))}
        </Row>
      </div>

      {showStartButton && (
        <div xs={12} className='startBTN'>
          <button onClick={generateRandomColor}>Start</button>
        </div>
      )}

      {showNewGameButton && (
        <div xs={12} className='startBTN'>
          <button onClick={resetGame}>New Game</button>
        </div>
      )}
    </Container>
  );
};

export default Start;
