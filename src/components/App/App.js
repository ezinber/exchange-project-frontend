import { useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { IsLoadingContext } from '../../contexts/IsLoadingContext';
import { ResponseMessageContext } from '../../contexts/ResponseMessageContext';
import { signin } from '../../utils/MainApi';
import Header from '../Header/Header';
import Chart from '../Chart/Chart';
import Login from '../Login/Login';
import Register from '../Register/Register';
import {
  responseSuccessMessages,
  responseErrorMessages,
 } from '../../utils/constants';
import './App.css';

const {
  successUpdateMessage
} = responseSuccessMessages;
const {
  incorrectDataMessage,
  incorrectCredentialsMessage,
  somethingWentWrong
} = responseErrorMessages;

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);

  const history = useHistory();

  const handleSignin = (email, password) => {
    setIsLoading(true);
    signin(email, password)
      .then(() => {
        responseMessage && setResponseMessage(null);
        // return handleTokenCheck();
        setCurrentUser({ name: 'user' })
      })
      .then(() => history.push('/markets'))
      .catch((err) => {
        if (err === 400) {
          return setResponseMessage(incorrectDataMessage);
        }
        if (err === 401) {
          return setResponseMessage(incorrectCredentialsMessage);
        }
        return setResponseMessage(somethingWentWrong);
      })
      .finally(() => setIsLoading(false));
  }

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
                <Login onLogin={handleSignin} />
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
