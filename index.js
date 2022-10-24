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
  /* console.log(req.body) */
  /*  let preference = {
     items: [
         {
             id: "item-ID-1234",
             title: "Mi producto",
             currency_id: "UYU",
             picture_url: "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
             description: "Descripción del Item",
             category_id: "art",
             quantity: 1,
             unit_price: 75.76
         }
     ],
     payer: {
         name: "Juan",
         surname: "Lopez",
         email: "user@email.com",
         phone: {
             area_code: "11",
             number: 44444444
         },
         identification: {
             type: "DNI",
             number: "12345678"
         },
         address: {
             street_name: "Street",
             street_number: 123,
             zip_code: "5700"
         }
     },
     back_urls: {
       success: "http://localhost:3000/feedback",
       failure: "http://localhost:3002/feedback",
       pending: "http://localhost:3002/feedback"
     },
     auto_return: "approved",
     payment_methods: {
         installments: 12
     },
     notification_url: "https://intense-forest-73258.herokuapp.com/feedback",
     statement_descriptor: "MORAUY",
    
 } */
  let preference = {
    items: req.body,
    metadata: { idorden: req.body[0].idorden },
    back_urls: {
      "success": "http://localhost:3000/feedback",
      "failure": "http://localhost:3002/feedback",
      "pending": "http://localhost:3002/feedback"
    },
    auto_return: "approved",
    notification_url: "https://intense-forest-73258.herokuapp.com/feedback",
    statement_descriptor: "MORAUY",
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
  /*  const merchantOrder =  mercadopago.payment.findById(req.query.payment_id)
   console.log(merchantOrder) */
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
});



app.get("/", (req, res) => {
  res.send("Bienvenido/a al inicio");
})

let puerto = process.env.PORT || 3000;

app.listen(puerto, () => console.log("Servidor corriendo en puerto 3000"));

