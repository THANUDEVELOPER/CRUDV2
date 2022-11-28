const express = require("express");
const authRouter = require("./routes/auth");
const appRouter = require("./routes/routes");

const mongoDb = require("./db/connect");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
const authentication = require("./middleware/auth");

const app = express();

app.use(express.json());
app.use("/api/v1", authRouter);
app.use("/api/v1/product", authentication, appRouter);
app.get("/", (req, res) => {
  res.send("CRUD API");
});
app.use(notFound);
app.use(errorHandlerMiddleware);
// local DB url
// const URL = "mongodb://localhost:27017/crudapp";
// cloud DB url
const URL =
  "mongodb+srv://thanukrishnadev:Srec%40123@firstcluster.zad66ap.mongodb.net/?retryWrites=true&w=majority";
mongoDb(URL);

app.listen(process.env.PORT || 5000);
