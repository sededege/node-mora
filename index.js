const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");

// REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel
mercadopago.configure({
  access_token: "TEST-4263842648119825-061517-b60e93e2733eaec4605949e6274da2e3-239337438",
});


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
/* app.use(express.static("../../client"));
 */
/* app.get("/", function (req, res) {
  res.status(200).sendFile("index.html");
});  */

app.post("/checkout", (req, res) => {
console.log(req.body)
  let preference = {
    items: req.body,
    back_urls: {
      "success": "http://localhost:3002/Success",
      "failure": "http://localhost:3002/feedback",
      "pending": "http://localhost:3002/feedback"
    },
    auto_return: "approved",
  };

  mercadopago.preferences.create(preference)
    .then(function (response) {
    /*       res.redirect(response.body.init_point);
     */      res.send(response.body.init_point)
}).catch(function (error) {
  console.log(error);
});
});

app.get('/feedback', function (req, res) {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id
  });
});

app.listen(3000, () => {
  console.log("The server is now running on Port 8080");
  
});

app.get("/", (req, res) => {
  res.send("Bienvenido/a al inicio");
})