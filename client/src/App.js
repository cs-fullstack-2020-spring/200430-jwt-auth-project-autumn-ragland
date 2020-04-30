import React from 'react';
import './App.css';
import AppContainer from './components/AppContainer';

// function based component - renders on launch 
// render class based container component
function App() {
  return (
    <div className="App">
      <AppContainer/>
    </div>
  );
}

export default App;
