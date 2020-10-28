const app = require("./src/config/express");
const db = require("./src/config/sequalize");

const PORT = process.env.PORT || 5000;

Promise.resolve()
  .then(() =>
    db
      .authenticate()
      .then(() => console.log("DB connected."))
      .catch((err) => console.error(err))
  )
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
  });
