import { useState, useEffect } from "react";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { IsLoadingContext } from "../../contexts/IsLoadingContext";
import { ResponseMessageContext } from "../../contexts/ResponseMessageContext";

import ProtectedRoute from "../hocs/ProtectedRoute";

import Main from "../Main/Main";
import Header from "../Header/Header";
import Chart from "../Chart/Chart";
import Login from "../Login/Login";
import Register from "../Register/Register";

import {
  signin,
  checkToken,
  getOrderBookData,
  getOrderBookTickers,
  addTask,
  getTasks,
} from "../../utils/MainApi";
import {
  responseSuccessMessages,
  responseErrorMessages,
} from "../../utils/constants";
import "./App.css";
import Profile from "../Profile/Profile";
import Markets from "../Markets/Markets";
import AddTaskPopup from "../AddTaskPopup/AddTaskPopup";

const { successUpdateMessage } = responseSuccessMessages;
const {
  incorrectDataMessage,
  incorrectCredentialsMessage,
  somethingWentWrong,
} = responseErrorMessages;

function App() {
  const [currentUser, setCurrentUser] = useState({ username: 'test', email: 'test@gmail.com' });
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const [orderBookTickersList, setOrderBookTickersList] = useState([]);
  const [currentOrderBookData, setCurrentOrderBookData] = useState({
    asks: [],
    bids: [],
  });
  const [userTasksList, setUserTasksList] = useState(mockTasks);
  const [isAddTaskPopupOpen, setIsAddTaskPopupOpen] = useState(false);

  const history = useHistory();
  const currentTicker = currentOrderBookData.asks[0]?.ticker || '';


  // Блок авторизации
  const handleSignin = (email, password) => {
    setIsLoading(true);
    signin(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.access);
        handleSetResponseMessage();
        return handleTokenCheck();
      })
      .then(() => history.push("/markets"))
      .catch((err) => {
        if (err === 400) {
          return handleSetResponseMessage(incorrectDataMessage);
        }
        if (err === 401) {
          return handleSetResponseMessage(incorrectCredentialsMessage);
        }
        return handleSetResponseMessage(somethingWentWrong);
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
        .then(() => handleGetOrderBookTickers())
        .catch(() => console.log("error"));
    }
  };

  const handleSignout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    history.push("/");
  };


  // Блок работы с тикерами
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
      .then((res) => {
        setOrderBookTickersList(res.tickers_list);
        handleSetCurrentTicker(res.tickers_list[0]);
      })
      .catch(() => console.log('error'));
  };

  const handleSetCurrentTicker = (ticker) =>
    handleGetOrderBookData("2021-10-25|00:44:00", "2021-10-29|23:59:20", ticker);


  // Блок работы с задачами
  const handleGetTasks = () => {
    const jwt = localStorage.getItem("jwt");
    getTasks(jwt)
      .then((res) => setUserTasksList(res))
      .catch(() => console.log('getTasks error'));
  }

  const handleAddNewTask = (task) => {
    // TODO: убрать заглушку, реализовать запрос
    setUserTasksList([task, ...userTasksList]);
    handleCloseAllPopups();
    /*
    const jwt = localStorage.getItem("jwt");
    addTask(
      jwt,
      task.id,
      task.ticker,
      currentUser.username,
      task.exchange,
      task.record_period,
      task.status,
    ).then(() => {
      handleGetTasks(jwt)
        .then(() => handleCloseAllPopups())
        .catch(() => console.log('getTasks error'))
    })
    .catch(() => console.log('error'));
    */
  }


  // Блок работы с сообщениями от сервера и попапами
  const handleSetResponseMessage = (message) =>
    message
      ? setResponseMessage(message)
      : responseMessage // TODO: test feature
      && setResponseMessage(null);

  const handleCloseAllPopups = () => {
    setIsAddTaskPopupOpen(false);
  }

  const handleOpenAddTaskPopup = () => {
    setIsAddTaskPopupOpen(true);
  }



  useEffect(() => {
    console.log('app-mount');

    handleTokenCheck();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <IsLoadingContext.Provider value={isLoading}>
        <ResponseMessageContext.Provider
          value={{ responseMessage, handleSetResponseMessage }}
        >
          <div className="app">
            <Header
              onLogout={handleSignout}
            />
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
                <Markets
                  list={orderBookTickersList}
                  selectValue={handleSetCurrentTicker}
                  currentValue={currentTicker}
                  orderBookData={currentOrderBookData}
                />
              </ProtectedRoute>

              <ProtectedRoute path="/profile">
                <Profile
                  tasksList={userTasksList}
                  onAddTaskClick={handleOpenAddTaskPopup}
                />
              </ProtectedRoute>

              <Route path="/about">
                <p>about</p>
              </Route>

              <Route path="/login">
                {!currentUser
                  ? <Login onLogin={handleSignin} />
                  : <Redirect to="/markets" />
                }
              </Route>

              <Route path="/Register">
                {!currentUser
                  ? <Register />
                  : <Redirect to="/markets" />
                }
              </Route>

              <Route path="/">
                <Main />
              </Route>
            </Switch>

            <AddTaskPopup
              isOpen={isAddTaskPopupOpen}
              onClose={handleCloseAllPopups}
              onSubmit={handleAddNewTask}
              tickerList={orderBookTickersList}
              currentValue={currentTicker}
            />

          </div>
        </ResponseMessageContext.Provider>
      </IsLoadingContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;


// TODO: delete mocks
const mockTasks = [
  {
    id: 1,
    ticker: 'USD',
    exchange: 'NYEX',
    record_period: 1,
    status: false,
  },
  {
    id: 2,
    ticker: 'GPB',
    exchange: 'NYEX',
    record_period: 6,
    status: true,
  },
  {
    id: 3,
    ticker: 'RUB',
    exchange: 'NYEX',
    record_period: 3,
    status: true,
  },
  {
    id: 4,
    ticker: 'GLD',
    exchange: 'NYEX',
    period: 1,
    status: false,
  },
  {
    id: 5,
    ticker: 'USD',
    exchange: 'NYEX',
    record_period: 2,
    status: false,
  },
  {
    id: 6,
    ticker: 'EUR',
    exchange: 'NYEX',
    record_period: 1,
    status: true,
  },
]