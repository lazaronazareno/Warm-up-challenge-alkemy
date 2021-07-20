import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Details from './Components/Details/Details';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import useToken from './useToken';

function App() {
  const { token, setToken } = useToken();
  return (
    <>
    <div className="container-fluid">
      {!token && (
        <BrowserRouter>
          <Login setToken={setToken} />
        </BrowserRouter>
      )}
      { token && (
        <BrowserRouter>
          <Switch>
            <Route exact path={["/", "/search"]} component={Home} />
            <Route exact path="/details" component={Details} />
          </Switch>
        </BrowserRouter>
      )}
    </div>
    </>
  );
}

export default App;
