import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar } from "react-bootstrap";
import Login from "./pages/login";
import Home from "./pages/home";
import Create from "./pages/component/create";
import { useState } from "react";


function App() {
  const [current, setCurrent] = useState(0);

  const Routes = () => {
    return (
      <Switch>
        <Route path="/Home" exact component={Home} />
        <Route path="/Create" exact component={Create} />

      </Switch>
    );
  }

  const Dasboard = () => {
    return (
      <>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>Recipe App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={e => { setCurrent(0) }}><Link className={current === 0 ? "text-white rounded bg-primary p-2" : ""} to="/Home">Home</Link></Nav.Link>
              <Nav.Link onClick={e => { setCurrent(1) }}><Link className={current === 1 ? "text-white rounded bg-primary p-2" : ""} to="/Create">Create</Link></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes />
      </>
    );
  }

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route exact component={Dasboard} />
        <Route exact component={Dasboard} />
      </Switch>
    </Router>
  );
}

export default App;
