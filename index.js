const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json());

const authRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movies");

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

app.get("/", (req, res) => {
  res.send("Bienvenidos...");
});

app.listen(port, () => {
  console.log(`La API esta sirviendo en el puerto: ${port}`);
});