import logo from './logo.svg';
import './App.css';
import Register from './Register';
import Login from './Login';
import Reset from './Reset';
import Homepage from './Homepage';
import Notes from './Notes';
import Forgot from './Forgot'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import NoteEdit from './NoteEdit';
import Appbar from './Appbar';
import Events from './Events';
import EventEdit from './EventEdit'
function App() {
  return (
    <Router>
      <Appbar/>
      <Switch>
        <Route component={Notes} exact path={'/notes'}/>
        <Route component={Events} exact path={'/events'}/>
        <Route component={NoteEdit} exact path={'/notes/:id'}/>
        <Route component={EventEdit} exact path={'/events/:id'}/>
        <Route component={Homepage} exact path={'/'}/>
        <Route component={Login} exact path={'/login'}/>
        <Route component={Reset} exact path={'/reset'}/>
        <Route component={Forgot} exact path={'/forgot'}/>
        <Route component={Register} exact path={'/register'}/>
      </Switch>
    </Router>
    
    // <Reset/>
    // <Homepage/>
    // <Register/>
    // <Login/>
  );
}

export default App;
