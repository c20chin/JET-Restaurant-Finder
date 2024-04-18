import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import {
  Card,
  InputGroup,
  Button,
  FormControl,
  Row,
  Image,
  Col,
} from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import Footer from "./footer";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true); // Set loading state to true before fetching data

    // Get restaurants with input postcode
    const postcode = searchInput;
    const apiUrl = `https://jet-restaurant-finder-h895.onrender.com/api/restaurants/${postcode}`;

    // Using fetch to get data from the API
    try {
      const returnedRestaurants = await fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setRestaurants(data.restaurants);
          setIsLoading(false);
        });
      console.log(restaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
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
        <p className="text-secondary">
          This site uses free server hosting service, performance may be delayed
          due to inactive use. (Please allow up to 1 min for response.)
        </p>
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
          {/* Display loading spinner if isLoading is true */}
          {isLoading && (
            <div className="m-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
        </Container>
        <Container className="my-5" ref={resultsRef}>
          <Row xs={2} md={4} className="g-4">
            {restaurants.slice(0, 10).map((restaurant, i) => {
              return (
                <Col key="j">
                  <Card height="150pt">
                    <Card.Img
                      variant="top"
                      width="50%"
                      className="p-5"
                      src={restaurant.logoUrl}
                    />
                    <Card.Body className="card-body-custom">
                      <Card.Title className="text-md">
                        {restaurant.name}
                      </Card.Title>
                      <Card.Text className="text-sm">
                        <img width="15px" src={require("./img/star.png")}></img>
                        {restaurant.rating.starRating}
                      </Card.Text>
                      <Card.Text className="text-sm">
                        {restaurant.address.firstLine}
                      </Card.Text>
                      {restaurant.cuisines.slice(0, 2).map((cuisine, i) => {
                        return (
                          <Button
                            className="m-1 btn-outline-success"
                            size="sm"
                            disabled
                          >
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
        <Footer />
      </div>
    </div>
  );
}

export default App;
