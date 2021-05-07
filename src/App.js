import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useHistory, Route, Switch, Redirect } from 'react-router-dom';
import Restaurants from './Restaurants';
import Restaurant from './Restaurant';
import About from './About';
import NotFound from './NotFound';
import { Button, Col, Container, Form, FormControl, Nav, Navbar, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


function App() {
  const [searchString, setSearchString] = useState([""]);

  let history = useHistory();
  const handleSubmit = (e)=>{
    console.log(`"search" ${searchString} "submitted"`);
    e.preventDefault();
    history.push(`/restaurants?borough=${searchString}`);    
  
    setSearchString("");
  }
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>New York Restaurants</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/restaurants">
              <Nav.Link>Full List</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>
          <Form onSubmit={handleSubmit} inline>
            <FormControl type="text" placeholder="borough" className="mr-sm-2" value={searchString}
            onChange={(e) => setSearchString(e.target.value)} />
            <Button type="submit" variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <br />
      <Container>
        <Row>
          <Col>
            <Switch>
              <Route exact path='/' render={() => (
                <Redirect push to={"/restaurants"} />
              )} />
              <Route exact path='/restaurants' render={(props) => (
                <Restaurants query={props.location.search}/>
              )} />
              <Route path='/restaurant/:id' render={(props) => (
                <Restaurant id={props.match.params.id} />
              )} />
              <Route exact path='/About' render={() => (
                <About />
              )} />
              <Route render={() => (
                <NotFound />
              )} />
            </Switch>
          </Col>
        </Row>
      </Container>
    </div>
  );  
}

export default App;
