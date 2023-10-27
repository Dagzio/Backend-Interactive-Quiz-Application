const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(
    `Server running on port: ${port}`
  );
});


