const functions = require("firebase-functions");
const express = require("express");
const app = express();
const userRouter = require("./api/controllers/user_controller");
const recipeRouter = require("./api/controllers/recipe_controller");

app.use(express.json());
app.use("/users", userRouter);
app.use("/recipes", recipeRouter);

exports.api = functions.https.onRequest(app);

// To handle "Function Timeout" exception
exports.functionsTimeOut = functions.runWith({
    timeoutSeconds: 300,
});

// Add the following line. It should only be used temporarily. In production mode, it should be commented out,
exports.setupdb = functions.https.onRequest(require("./setup_database"));