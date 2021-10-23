import { useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { IsLoadingContext } from "../../contexts/IsLoadingContext";
import { ResponseMessageContext } from "../../contexts/ResponseMessageContext";
import { signin, checkToken } from "../../utils/MainApi";
import Header from "../Header/Header";
import Chart from "../Chart/Chart";
import Login from "../Login/Login";
import Register from "../Register/Register";
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
  const [currentUser, setCurrentUser] = useState({ username: 'trtrtr'});
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);

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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <IsLoadingContext.Provider value={isLoading}>
        <ResponseMessageContext.Provider
          value={{ responseMessage, handleResetResponseMessage }}
        >
          <div className="app">
            <Header onLogout={handleSignout} />
            <Switch>
              <Route path="/markets/stock">
                <p>markets</p>
              </Route>
              <Route path="/markets/debt">
                <p>debt</p>
              </Route>
              <Route path="/markets/forex">
                <p>forex</p>
              </Route>
              <Route path="/markets">
                <Chart />
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
