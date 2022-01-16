import logo from './logo.svg';
import './App.css';
import Register from './Register';
import Login from './Login';
import Reset from './Reset';
import Homepage from './Homepage';
import Notes from './Notes';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
function App() {
  return (
    <Router>
      <Homepage/>
      <Switch>
        <Route component={Notes} exact path={'/notes'}/>
        <Route component={Homepage} exact path={'/'}/>
        {/* <Route component={Notes} exact path={'/notes'}/> */}
      </Switch>
    </Router>
    
    // <Reset/>
    // <Homepage/>
    // <Register/>
    // <Login/>
  );
}

export default App;
