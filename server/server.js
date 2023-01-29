require("dotenv").config();
const express = require("express");
const db = require("./db");

const app = express();

app.use(express.json());

// GET ALL Restaurants
app.get("/api/v1/getRestaurants", async (req, res) => {
  try {
    const results = await db.query("select * from restaurants");
    res.status(200).json({
      status: "Success",
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// GET a Restaurant
app.get("/api/v1/getRestaurants/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await db.query("select * from restaurants where id = $1", [
      id,
    ]);
    res.status(200).json({
      status: "Success",
      data: {
        restaurants: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Create Restaurants
app.post("/api/v1/restaurants", async (req, res) => {
  try {
    const { name, location, price_range } = req.body;
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *",
      [name, location, price_range]
    );
    res.status(200).json({
      status: "Success",
      data: {
        restaurants: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Update Restaurants
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, price_range } = req.body;
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
      [name, location, price_range, id]
    );
    res.status(200).json({
      status: "Success",
      data: {
        restaurants: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Delete restaurants
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await db.query(
      "DELETE FROM restaurants where id = $1 returning *",
      [id]
    );
    res.status(200).json({
      message: "succesfuly delete data!",
      results: results.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
