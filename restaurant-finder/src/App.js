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
  Col,
} from "react-bootstrap";
import { useState, useEffect, useRef } from "react";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const resultsRef = useRef(null);

  useEffect(() => {
    // Scroll to the results container when searchData changes
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [restaurants]);

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
      <Container className="container-custom">
        <Image
          className="px-5 mx-0"
          width="70%"
          src={require("./img/JetLogo.png")}
        />
        <h4>Type in your postcode to find your next meal!</h4>
      </Container>
      <div>
        <Container>
          <InputGroup width="auto" className="p-5 mb-3" size="lg">
            <FormControl
              placeholder="Enter Postcode: eg. N7 8FB"
              type="input"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  searchRestaurant();
                }
              }}
              onChange={(event) => setSearchInput(event.target.value)}
            />
            <Button onClick={searchRestaurant}>Search</Button>
          </InputGroup>
        </Container>
        <Container ref={resultsRef}>
          <Row xs={2} md={4} className="g-4">
            {restaurants.map((restaurant, i) => {
              return (
                <Col key="i">
                  <Card height="150pt">
                    <Card.Img
                      variant="top"
                      width="50%"
                      className="p-5"
                      src={restaurant.logoUrl}
                    />
                    <Card.Body className="card-body-custom">
                      <Card.Title>{restaurant.name}</Card.Title>
                      <Card.Text>
                        <img width="15px" src={require("./img/star.png")}></img>
                        {restaurant.rating.starRating}
                      </Card.Text>
                      <Card.Text className="text-sm">
                        {restaurant.address.firstLine}
                      </Card.Text>
                      {restaurant.cuisines.slice(0, 2).map((cuisine, i) => {
                        return (
                          <Button className="m-1 btn-outline-success" size="sm" disabled>
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
    </div>
  );
}

export default App;
