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
  

  // Search for restaurant
  async function searchRestaurant() {
    console.log("searching for " + searchInput);


    // Get restaurants with input postcode
    const postcode = searchInput;
    const apiUrl = `http://localhost:5000/api/restaurants/${postcode}`;

    // Using fetch to get data from the API
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div className="App">
      <Container>
        <InputGroup className="p-5 mb-3" size="lg">
          <FormControl
            placeholder="Enter Postcode: eg. N7 8FB"
            type="input"
            onKeyDown={event => {
              if (event.key == "Enter") {
                searchRestaurant();
              }
            }}
            onChange={event => setSearchInput(event.target.value)}
          />
          <Button
            onClick={searchRestaurant}
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
