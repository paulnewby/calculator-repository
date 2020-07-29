import { actionCreators } from './Redux'
import React from 'react';
import { numbers, operations } from './Redux'
import { connect } from "react-redux"


export default class CalculatorButtons extends React.Component {


    render() {
        return (
            <div className="module-border-wrap">
                <div className="calculator">
                    <div id="display" className="display">
                        {this.props.formulaEntered} <br /> {this.props.currentValue}
                    </div>
                    <div className="all-buttons-container">
                            {numbers.map(num => (
                                <CalculatorButton className={`buttons ${num === 0 && 'big-h'}`} key={num} keyPressed={num} />
                            ))} <ResetButton className="buttons" />
                            {operations.map(op => (
                                <CalculatorButton className="buttons" key={op} keyPressed={op} />
                            ))} 
                    </div>
                        <div className="equal-container">
                            <EqualButton className="equal-button" />
                        </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        currentValue: state.currentValue,
        formulaEntered: state.formulaEntered
    }
}

CalculatorButtons = connect(mapStateToProps)(CalculatorButtons);

class CalculatorButton extends React.Component {

    onClick = () => {
        this.props.handleClick(this.props.keyPressed);
    }

    render() {
        return (
            <button className={this.props.className} onClick={this.onClick}>
                {this.props.keyPressed}
            </button>
        )
    }
}

class ResetButton extends React.Component {
    onClick = () => {
        this.props.handleClick();
    }

    render() {
        return (
            <button className={this.props.className} onClick={this.onClick}>
                reset
            </button>
        )
    }
}

class EqualButton extends React.Component {

    onClick = () => {
        this.props.handleClick();
    }

    render() {
        return (
            <button className={this.props.className} onClick={this.onClick}>
                =
            </button>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleClick: (key) => dispatch(actionCreators.keyPressed(key))
    }
}

CalculatorButton = connect(undefined, mapDispatchToProps)(CalculatorButton)


const mapEqualDispatchToProps = (dispatch) => {
    return {
        handleClick: () => dispatch(actionCreators.equal())
    }
}

EqualButton = connect(undefined, mapEqualDispatchToProps)(EqualButton)


const mapResetDispatchToProps = (dispatch) => {
    return {
        handleClick: () => dispatch(actionCreators.reset())
    }
}

ResetButton = connect(undefined, mapResetDispatchToProps)(ResetButton)

