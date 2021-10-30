import { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { IsLoadingContext } from "../../contexts/IsLoadingContext";
import { ResponseMessageContext } from "../../contexts/ResponseMessageContext";

import ProtectedRoute from "../hocs/ProtectedRoute";

import Main from "../Main/Main";
import Header from "../Header/Header";
import Chart from "../Chart/Chart";
import Login from "../Login/Login";
import Register from "../Register/Register";
import SelectForm from "../SelectForm/SelectForm";

import {
  signin,
  checkToken,
  getOrderBookData,
  getOrderBookTickers,
} from "../../utils/MainApi";
import {
  responseSuccessMessages,
  responseErrorMessages,
} from "../../utils/constants";
import "./App.css";

const { successUpdateMessage } = responseSuccessMessages;
const {
  incorrectDataMessage,
  incorrectCredentialsMessage,
  somethingWentWrong,
} = responseErrorMessages;

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const [orderBookTickersList, setOrderBookTickersList] = useState([]);
  const [currentTicker, setCurrentTicker] = useState('');
  const [currentOrderBookData, setCurrentOrderBookData] = useState({
    asks: [],
    bids: [],
  });

  const history = useHistory();

  const handleSignin = (email, password) => {
    setIsLoading(true);
    signin(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.access);
        responseMessage && setResponseMessage(null);
        return handleTokenCheck();
      })
      .then(() => history.push("/markets"))
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
  };

  const handleTokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      checkToken(jwt)
        .then((res) => {
          setCurrentUser({ email: res.email, username: res.username });
        })
        .catch(() => console.log("error"));
    }
  };

  const handleSignout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    history.push("/");
  };

  const handleResetResponseMessage = () => setResponseMessage(null);

  const handleGetOrderBookData = (start, end, ticker) => {
    setIsLoading(true);
    const jwt = localStorage.getItem("jwt");
    Promise.all([
      getOrderBookData("asks", start, end, ticker, jwt),
      getOrderBookData("bids", start, end, ticker, jwt),
    ])
      .then(([asks, bids]) => setCurrentOrderBookData({ asks, bids }))
      .catch(() => console.log("error"))
      .finally(() => setIsLoading(false));
  };

  const handleGetOrderBookTickers = () => {
    const jwt = localStorage.getItem("jwt");
    getOrderBookTickers(jwt)
      .then((res) => setOrderBookTickersList(res.tickers_list))
      .catch(() => console.log('error'));
  };

  const handleSetCurrentTicker = (ticker) => setCurrentTicker(ticker);

  useEffect(() => {
    !currentUser && handleTokenCheck()
    orderBookTickersList.length <= 0 && handleGetOrderBookTickers();
    currentTicker && handleGetOrderBookData("2021-10-25|00:44:00", "2021-10-29|23:59:20", currentTicker);
  }, [currentTicker, orderBookTickersList, currentUser]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <IsLoadingContext.Provider value={isLoading}>
        <ResponseMessageContext.Provider
          value={{ responseMessage, handleResetResponseMessage }}
        >
          <div className="app">
            <Header onLogout={handleSignout} />
            <Switch>
              <ProtectedRoute path="/markets/stock">
                <p>markets</p>
              </ProtectedRoute>
              <ProtectedRoute path="/markets/debt">
                <p>debt</p>
              </ProtectedRoute>
              <ProtectedRoute path="/markets/forex">
                <p>forex</p>
              </ProtectedRoute>
              <ProtectedRoute path="/markets">
                <SelectForm
                  list={orderBookTickersList}
                  setValue={handleSetCurrentTicker}
                  currentItem={currentTicker}
                />
                <Chart
                  orderBookData={currentOrderBookData}
                />
              </ProtectedRoute>
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
                <Main />
              </Route>
            </Switch>
          </div>
        </ResponseMessageContext.Provider>
      </IsLoadingContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
