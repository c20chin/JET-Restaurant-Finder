import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import {
  Card,
  InputGroup,
  Button,
  FormControl,
  Row
} from "react-bootstrap";
import { useState, useEffect } from 'react';


function App() {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="App">
      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl
            placeholder="Enter Postcode: eg. N7 8FB"
            type="input"
            onChange={() => {
              console.log("key change");
            }}
          />
          <Button
            onClick={(event) => {
              console.log("search btn");
            }}
          >
            Search
          </Button>
        </InputGroup>
      </Container>
      <Container>
        <Row className="mx-2 row row-col-4">
          <Card>
            <Card.Body>
              <Card.Title>RestaurantName</Card.Title>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
}

export default App;
