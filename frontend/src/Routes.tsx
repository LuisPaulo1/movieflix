import { Router, Switch, Route } from 'react-router-dom';
import Home from 'pages/Home';
import Navbar from 'components/Navbar';
import Movies from 'pages/Movies';
import MoviesDetails from 'pages/MoviesDetails';
import PrivateRoute from 'components/PrivateRoute';
import history from 'util/history';

const Routes = () => (
  <Router history={history}>
    <Navbar />
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <PrivateRoute path="/movies" exact={true}>
        <Movies />
      </PrivateRoute>
      <PrivateRoute path="/movies/:movieId" exact={true}>
        <MoviesDetails />
      </PrivateRoute>
    </Switch>
  </Router>
);

export default Routes;