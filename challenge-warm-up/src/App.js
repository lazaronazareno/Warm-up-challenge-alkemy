import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Details from './Components/Details/Details';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import useToken from './useToken';
import './App.scss'
import NewQuote from './Components/NewQuote/NewQuote';
import Modify from './Components/Modify/Modify';
import Header from './Components/Header/Header';

function App() {
  const { token, setToken } = useToken();
  return (
    <div className="container-fluid bg-light App">
      {!token && (
        <BrowserRouter>
          <Login setToken={setToken} />
        </BrowserRouter>
      )}
      { token && (
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/details" component={Details} />
            <Route exact path="/new" component={NewQuote} />
            <Route exact path="/edit" component={Modify} />
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
