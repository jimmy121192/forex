import React, { Component } from 'react';
import Main from './pages/Main';
import './App.css';
import thunkMiddleware from 'redux-thunk' 
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import reducers from './redux/combine'

const store = createStore(
  
  reducers,
  applyMiddleware(
      thunkMiddleware
  )
)

class App extends Component {
  render() {

    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );

  }
}

export default App;
