const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");
const axios = require('axios');
const db = require('./firebase_admin')

const accountSid = 'AC85386c3bb01703ccaf4258ad968233a3';
const authToken = '08ed077a854681c3d0a20c30bbf1c2cc';
const client = require('twilio')(accountSid, authToken);


// REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel
mercadopago.configure({
  access_token: "TEST-4263842648119825-061517-b60e93e2733eaec4605949e6274da2e3-239337438",
});
const token = 'TEST-4263842648119825-061517-b60e93e2733eaec4605949e6274da2e3-239337438'


const url = 'https://node-mora.vercel.app'


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


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
      "success": "http://morafit.uy/ordenes/gracias",
      "failure": "http://morafit.uy/ordenes/fail",
      "pending": "http://morafit.uy/ordenes/pendiente",
    },
    auto_return: "approved",
    notification_url: `${url}/Notification`,
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
/* var prueba = { id: '1311092477' }
console.log(prueba.id) */




app.post('/Notification', async function (req, res) {

  try {
    await axios.get(`https://api.mercadopago.com/v1/payments/${req.body.data.id}`,
      {
        headers: {
          Authorization: `Bearer TEST-4263842648119825-061517-b60e93e2733eaec4605949e6274da2e3-239337438`,
          'Accept-Encoding': '*'
        }
      })
      .then((response) => {
        const id = response.data.metadata.idorden
        console.log(id)
        if (response.data.status === 'approved') {
          db.collection('orders').doc(id).update({
            status: 'Pagado'
          })

          /*     client.messages
                .create({
                  body: 'Alguien compro un producto por mercadopago',
                  from: 'whatsapp:+19896324694',
                  to: 'whatsapp:+59898412760'
                })
                .then(message => console.log(message.sid))
                .done();
     */

        }
        return response
      })
  }
  catch (error) {
    console.log('error')
  };



  res.status(200).send('ok')

});





app.post('/ordencreada', async (req, res) => {
  console.log(req.body)
  try {
    client.messages
      .create({
        body: `
      Nuevo pedido: 
    Nombre: ${req.body.name}
    celular: ${req.body.phone}
      email: ${req.body.email}
      pickup: ${req.body.pickup} 
      metodo: ${req.body.metodo}
      items: ${req.body.items.map(a => `
      nombre: ${a.title}
      cantidad: ${a.quantity}
      talle: ${a.size}
      color: ${a.color}`
        )}
      total: *${req.body.total}*
      `,
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+59898412760'
      })
      .then(message => console.log(message.sid))
      .done();
  } catch (error) {
    console.log(error)
  }
})


app.post('/create', async (req, res) => {
  console.log(req.body)
  try {
    const response = db.collection('orders').doc('1669781439293').set({
      status: 'nunca'
    })
    res.send('subido')
  } catch (error) {
    console.log(error)
  }
})


app.post('/update', async (req, res) => {

  try {
    const response = db.collection('orders').doc('1669781439293').update({
      status: 'lpma'
    })
    res.send('subido')
  } catch (error) {
    console.log(error)
  }
})

app.get('/feedback', function (req, res) {
  /*  const merchantOrder =  mercadopago.payment.findById(req.query.payment_id)
   console.log(merchantOrder) */
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
});

/* enviar = async () => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'janelle.monahan37@ethereal.email',
        pass: 'snUMPUhHu5BJuvyFFu'
    }
});

  const mensaje = {
    from: 'Remitente',
    to: 'sebagonzalez_97@hotmail.com',
    subject: 'correoprueba',
    text: 'envio by node js'
  }

  const info = await transporter.sendMail(mensaje)
  console.log(info)
} */



app.get("/", (req, res) => {
  res.send("Bienvenido/a al inicio");
})

let puerto = process.env.PORT || 3000;

app.listen(puerto, () => console.log("Servidor corriendo en puerto 3000"));

