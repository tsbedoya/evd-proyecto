const pg = require("pg");
const cors = require("cors");
const express = require("express");

const app = express();
/*const { Client } = pg
const client = new Client({
    host: 'visualizacion-datos.postgres.database.azure.com',
    port: 5432,
    database: 'postgres',
    user: 'tati',
    password: 'triodinamico123*',
  })
await client.connect()
 
const res = await client.query('SELECT $1::text as message', ['Hello world!'])
console.log(res.rows[0].message) // Hello world!
await client.end()*/
const data = [
  {
    id: 45752742,
    name: "mock cabaña",
    location_x: 6.34079,
    location_y: -75.70528,
    photos: [
      {
        caption: "Cabaña Museo Campestre",
        url: "https://a0.muscache.com/im/pictures/3b2fd8eb-2097-4d50-89d8-d3521c2e8a94.jpg?aki_policy=large",
      },
      {
        caption: "Cabaña Museo Campestre",
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-45752742/original/0094758c-6237-4653-a0c1-dc25f9e1105e.jpeg?aki_policy=large",
      },
      {
        caption: "Cabaña Museo Campestre",
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-45752742/original/7092e83a-8dc4-4bf2-add9-833693eabf44.jpeg?aki_policy=large",
      },
    ],
  },
];

// Use CORS middleware
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", function (req, res) {
  res.send(data);
});

app.listen(3001);
