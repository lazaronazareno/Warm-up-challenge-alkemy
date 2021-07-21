import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Details from './Components/Details/Details';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import useToken from './useToken';
import './App.css'
import NewQuote from './Components/NewQuote/NewQuote';

function App() {
  const { token, setToken } = useToken();
  return (
    <>
    <div className="container-fluid App bg-info d-flex justify-content-center align-items-center">
      {!token && (
        <BrowserRouter>
          <Login setToken={setToken} />
        </BrowserRouter>
      )}
      { token && (
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/details" component={Details} />
            <Route exact path="/new" component={NewQuote} />
          </Switch>
        </BrowserRouter>
      )}
    </div>
    </>
  );
}

export default App;
