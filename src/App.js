import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import display from './components/display';

function App() {
  return (
    <React.Fragment>
    <BrowserRouter>
    <Route exact path='/' component={display}/>
    
    </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
