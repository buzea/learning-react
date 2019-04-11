import React, {Component} from 'react';
import './App.css';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faStroopwafel} from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css'
import _ from 'lodash';

library.add(faStroopwafel)

const Stars = (props) => {

    let stars = [];
    for (let i = 0; i < props.numberOfStars; i++) {
        stars.push(<i key={i} className="fa fa-star"></i>)
    }
    return (
        <div className="col-5">
            {stars}
        </div>
    );
}

const Button = (props) => {
    let button;
    switch (props.isCorrect) {
        case true:
            button =
                <button className="btn btn-success"><i className="fa fa-check" onClick={props.acceptAnswer}/></button>;
            break;
        case false:
            button = <button className="btn btn-danger"><i className="fa fa-times"/></button>;
            break;
        default:
            button = <button disabled={props.selectedNumbers.length === 0} onClick={props.checkAnswer}>=</button>;
    }
    return (
        <div className="col-2 text-center">
            {button}
            <br/>
            <button className="btn btn-warning btn-sm" disabled={props.redraws === 0} onClick={props.redraw}>
                <i className="fa fa-refresh"> </i>
                {props.redraws}
            </button>
        </div>
    );
}


const Answer = (props) => {
    return (
        <div className="col-5">{props.selectedNumbers.map((number, i) =>
            <span key={i} onClick={() => props.unselectNumber(number)}>{number}</span>)}</div>
    );
}

const Numbers = (props) => {
    const arrayOfNumbers = _.range(1, 10);

    const numberClassName = (number) => {
        if (props.selectedNumbers.indexOf(number) >= 0) {
            return 'selected';
        }

        if (props.usedNumbers.indexOf(number) >= 0) {
            return 'used';
        }
    };
    return (
        <div className="card text-center">
            <div>
                {arrayOfNumbers
                    .map((number, i) =>
                        <span key={i}
                              className={numberClassName(number)}
                              onClick={() => props.selectNumber(number)}>
                            {number}
                            </span>
                    )
                }

            </div>
        </div>
    );
}

const DoneFrame = (props) => {

    return (
        <div className="text-center">
            <h2>{props.doneStatus}</h2>
        </div>
    )
}


class Game extends Component {
    state = {
        selectedNumbers: [],
        numberOfStars: 1 + Math.floor(Math.random() * 9),
        usedNumbers: [],
        isCorrect: null,
        redraws: 5,
        doneStatus: null
    };

    acceptAnswer = () => {
        this.setState(prevState => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            numberOfStars: 1 + Math.floor(Math.random() * 9),
            isCorrect: null,
        }), this.updateDoneStatus);
    }

    redraw = () => {
        if (this.state.redraws === 0) {
            return;
        }
        this.setState(prev => ({
            selectedNumbers: [],
            numberOfStars: 1 + Math.floor(Math.random() * 9),
            isCorrect: null,
            redraws: prev.redraws - 1,
        }))
        ;
    };


    selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) < 0) {
            this.setState(prevState => ({
                isCorrect: null,
                selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
            }));
        }
    };

    unselectNumber = (clickedNumber) => {
        this.setState(prevState => ({
            isCorrect: null,
            selectedNumbers: prevState.selectedNumbers.filter(num => num !== clickedNumber)
        }));
    }

    checkIsCorrect = () => {
        this.setState(prevState => ({
            isCorrect: this.calculateIsCorrect(prevState)
        }));
    }

    calculateIsCorrect = (prevState) => {
        let sum = prevState.selectedNumbers.reduce((a, b) => a + b);
        if (prevState.numberOfStars === sum)
            return true;
        return false;
    }

    doBacktracking(result, array, numbers) {
        let sum = array.reduce((a, b) => a + b, 0);
        if (sum === result)
            return true;

        if (sum > result || numbers.length === 0)
            return false;

        for (let i = 0; i < numbers.length; i++) {
            const aux = numbers[i];
            let filtered = numbers.filter(num => num !== aux);
            if (this.doBacktracking(result, array.concat(aux), filtered)) {
                return true;
            }
        }
        return false;
    }

    possibleSolutions(prevState) {
        const {numberOfStars, usedNumbers} = prevState;
        const numbers = _.range(1, 10).filter(i => usedNumbers.indexOf(i) < 0);
        console.log(numbers);
        return this.doBacktracking(numberOfStars, [], numbers);
    }

    updateDoneStatus = () => {
        this.setState(prevState => {
            if (prevState.usedNumbers.length === 9) {
                return {doneStatus: 'You Won!'};
            }
            if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
                return {doneStatus: 'Game Over!'};
            }
        });
    }

    render() {
        const {selectedNumbers, numberOfStars, isCorrect, usedNumbers, redraws, doneStatus} = this.state;
        return (
            <div className="container">
                <h3>Play Nine</h3>
                <div className="row">
                    <Stars numberOfStars={numberOfStars}/>
                    <Button selectedNumbers={selectedNumbers} isCorrect={isCorrect}
                            checkAnswer={this.checkIsCorrect} acceptAnswer={this.acceptAnswer}
                            redraw={this.redraw} redraws={redraws}/>
                    <Answer selectedNumbers={selectedNumbers} unselectNumber={this.unselectNumber}/>
                </div>
                <br/>
                {doneStatus == null ?
                    <Numbers selectedNumbers={selectedNumbers} selectNumber={this.selectNumber}
                             usedNumbers={usedNumbers}/> :
                    <DoneFrame doneStatus={doneStatus}/>
                }
            </div>
        );
    }
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <Game/>
            </div>
        );
    }
}

export {App, Game};
