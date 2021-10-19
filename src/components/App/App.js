import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { IsLoadingContext } from '../../contexts/IsLoadingContext';
import { ResponseMessageContext } from '../../contexts/ResponseMessageContext';
import Header from '../Header/Header';
import Chart from '../Chart/Chart';
import Login from '../Login/Login';
import './App.css';
import Register from '../Register/Register';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);

  const handleResetResponseMessage = () => setResponseMessage(null);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <IsLoadingContext.Provider value={isLoading}>
        <ResponseMessageContext.Provider value={{responseMessage, handleResetResponseMessage}}>
          <div className="app">
            <Header />
            <Switch>
              <Route path="/markets/stock">
                <Chart />
              </Route>
              <Route path="/markets/debt">
                <p>debt</p>
              </Route>
              <Route path="/markets/forex">
                <p>forex</p>
              </Route>
              <Route path="/markets">
                <p>markets</p>
              </Route>
              <Route path="/about">
                <p>about</p>
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/Register">
                <Register />
              </Route>
              <Route path="/">
                <p>main</p>
              </Route>
            </Switch>
          </div>
        </ResponseMessageContext.Provider>
      </IsLoadingContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
