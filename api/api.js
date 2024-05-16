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
      SELECT a.id, a."name", a.stars, a."numberOfGuests", a."roomType", ST_AsGeoJSON(a.geom)::json AS geometry,
        ${nestQuery(`
          SELECT p.url, p.caption
          FROM photos p
          WHERE p.id_airbnb = a.id
        `)} AS photos
      FROM airbnb a
      WHERE a.address = 'Medellín, Antioquia, Colombia'
      limit 30`,
    );

    res.send(results.rows);
  } catch (err) {
    console.error(err);
  }
});

app.get("/layer-poligonos", async function (req, res) {
  try {
    const results = await client.query(`select id, comuna, nombre_com, barrio, nombre_bar, ST_AsGeoJSON(geom)::json AS geometry
      from "barrio-vereda" limit 40`,
    );

    res.send(results.rows);
  } catch (err) {
    console.error(err);
  }
});

app.get("/layer-poligonos-airbnb", async function (req, res) {
  try {
    const results = await client.query(`
      SELECT bv.id, bv.nombre_bar, bv.nombre_com, ST_AsGeoJSON(bv.geom)::json AS geometry,
        json_agg(json_build_object('point_geom', a.geom)) AS airbnbs
      FROM "barrio-vereda" bv
      JOIN airbnb a ON ST_Contains(bv.geom, a.geom)
      GROUP BY bv.id
      ORDER BY COUNT(*) DESC
      LIMIT 5;`,
    );

    res.send(results.rows);
  } catch (err) {
    console.error(err);
  }
});

app.listen(3001);
