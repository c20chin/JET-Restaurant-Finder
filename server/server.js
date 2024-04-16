const express = require("express");
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Use cors middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Sample route
app.get("/api/restaurants/:postcode", async (req, res) => {
    const { postcode } = req.params;
    const apiUrl = `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
