const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

connectDB();

app.use(express.json({ extended:false }));
app.use(cors());

//define API 
app.use("/api/user", require("./routes/api/user"));
app.use("/api/recipe", require("./routes/api/recipe"));
app.use("/api/recipe/kategori", require("./routes/api/recipe"));
app.use("/api/recipe/bahan", require("./routes/api/recipe"));
app.use("/api/recipe/makanan", require("./routes/api/recipe"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Running in PORT ${PORT}`);
});