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
  const [restaurants, setRestaurants] = useState([]);

  // Search for restaurant
  async function searchRestaurant() {
    console.log("searching for " + searchInput);

    // Get restaurants with input postcode
    const postcode = searchInput;
    const apiUrl = `http://localhost:5000/api/restaurants/${postcode}`;

    // Using fetch to get data from the API
    try {
      const returnedRestaurants = await fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setRestaurants(data.restaurants);
        });
      console.log(restaurants)
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
            onKeyDown={(event) => {
              if (event.key == "Enter") {
                searchRestaurant();
              }
            }}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <Button onClick={searchRestaurant}>Search</Button>
        </InputGroup>
      </Container>
      <Container>
        <Row xs={2} md={4} className="row row-cols-4">
          {restaurants.map((restaurant, i) => {
            return (
              <Card>
                <Card.Img src={restaurant.logoUrl} />
                <Card.Body>
                  <Card.Title>{restaurant.name}</Card.Title>
                  <Card.Text>{restaurant.address.firstLine}</Card.Text>
                  {restaurant.cuisines.map((cuisine, i) => {
                    return (
                      <Button className="m-1" size="sm">{cuisine.name}</Button>
                    )
                  })}
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default App;
