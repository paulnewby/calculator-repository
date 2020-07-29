import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { calculatorReducer } from './Redux'
import CalculatorButtons from './CalculatorButtons'

//React 


const store = createStore(calculatorReducer,
 window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


export default class App extends React.Component {


  render() {
    return (<Provider
      store={store}>
      <CalculatorButtons />
    </Provider>
    )
  }
}
