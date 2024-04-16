import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import {
  Card,
  InputGroup,
  Button,
  FormControl,
  Row,
  Image,
  Col
} from "react-bootstrap";
import { useState, useEffect } from "react";

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
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setRestaurants(data.restaurants);
        });
      console.log(restaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div className="App">
      <Container>
        <Image height="300px" src={require("./img/JetLogo.png")} fluid />
        <p>Find your next meal by typing in your postcode!</p>
        <InputGroup className="p-5 mb-3" size="md">
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
        <Row xs={2} md={4} className="g-4">
          {restaurants.map((restaurant, i) => {
            return (
              <Col key="i">
                <Card height="300pt">
                  <Card.Img variant="top" width="150px" src={restaurant.logoUrl} />
                  <Card.Body>
                    <Card.Title>{restaurant.name}</Card.Title>
                    <Card.Text>
                      <img width="15px" src={require("./img/star.png")}></img>
                      {restaurant.rating.starRating}
                    </Card.Text>
                    <Card.Text>{restaurant.address.firstLine}</Card.Text>
                    {restaurant.cuisines.slice(0, 2).map((cuisine, i) => {
                      return (
                        <Button className="m-1" size="sm">
                          {cuisine.name}
                        </Button>
                      );
                    })}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default App;
