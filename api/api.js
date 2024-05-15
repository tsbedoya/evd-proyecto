const { Pool } = require("pg");
const cors = require("cors");
const express = require("express");

const app = express();

const client = new Pool({
  host: 'visualizacion-datos.postgres.database.azure.com',
  port: 5432,
  database: 'postgres',
  user: 'tati',
  password: 'triodinamico123*',
  ssl: {
    rejectUnauthorized: false
  }
});

function nestQuery(query) {
  return `
    coalesce(
      (
        SELECT array_to_json(array_agg(row_to_json(data_photos)))
        FROM (${query}) data_photos
      ),
      '[]'
    )`;
}

// Use CORS middleware
app.use(
  cors({
    origin: "*",
  })
);

app.get("/layer-airbnb", async function (req, res) {
  try {
    const results = await client.query(`
      select ndlt.id, ndlt."name", ndlt.stars, ndlt."numberOfGuests", ndlt."roomType", ST_AsGeoJSON(ndlt.geom)::json AS geometry,
        ${nestQuery(`
          SELECT p.url, p.caption
          FROM photos p
          WHERE p.id_airbnb = ndlt.id
        `)} AS photos
      FROM nombre_de_la_tabla ndlt
      limit 20`,
    );

    res.send(results.rows);
  } catch (err) {
    console.error(err);
  }
});

app.get("/layer-poligonos", async function (req, res) {
  try {
    const results = await client.query(`select id, comuna, nombre_com, barrio, nombre_bar, ST_AsGeoJSON(geom)::json AS geometry
      from "barrio-vereda" limit 20`,
    );

    res.send(results.rows);
  } catch (err) {
    console.error(err);
  }
});

app.listen(3001);
