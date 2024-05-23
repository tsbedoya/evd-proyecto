const { Pool } = require("pg");
const cors = require("cors");
const express = require("express");

const app = express();

const client = new Pool({
  host: "visualizacion-datos.postgres.database.azure.com",
  port: 5432,
  database: "postgres",
  user: "tati",
  password: "triodinamico123*",
  ssl: {
    rejectUnauthorized: false,
  },
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
      limit 30`);

    res.send(results.rows);
  } catch (err) {
    console.error(err);
  }
});

app.get("/layer-poligonos", async function (req, res) {
  try {
    const results =
      await client.query(`select id, comuna, nombre_com, barrio, nombre_bar, ST_AsGeoJSON(geom)::json AS geometry
      from "barrio-vereda" limit 20`);

    res.send(results.rows);
  } catch (err) {
    console.error(err);
  }
});

app.get("/layer-metro", async function (req, res) {
  try {
    const results =
      await client.query(`select id, nombre, linea, tipo_est, ST_AsGeoJSON(geom)::json AS geometry
      from "estaciones_metro" limit 20`);

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
      LIMIT 5;`);

    res.send(results.rows);
  } catch (err) {
    console.error(err);
  }
});

app.get("/reporte-cantidad-airbnb", async function (req, res) {
  try {
    const results = await client.query(`
<<<<<<< HEAD
      WITH top10 AS (
    SELECT 
        bv.id, 
        bv.nombre_bar, 
        COUNT(a.id) AS cantidad
    FROM 
        "barrio-vereda" bv
    JOIN 
        airbnb a ON ST_Contains(bv.geom, a.geom)
    GROUP BY 
        bv.id
    ORDER BY 
        COUNT(a.id) DESC
    LIMIT 10
),
remaining AS (
    SELECT 
        CAST(NULL AS INTEGER) AS id, 
        'Otros Barrios de Medellín' AS nombre_bar, 
        SUM(subquery.cantidad) AS cantidad
    FROM (
        SELECT 
            COUNT(a.id) AS cantidad
        FROM 
            "barrio-vereda" bv
        JOIN 
            airbnb a ON ST_Contains(bv.geom, a.geom)
        GROUP BY 
            bv.id
        ORDER BY 
            COUNT(a.id) DESC
        OFFSET 10
    ) AS subquery
)
SELECT * FROM top10
UNION ALL
SELECT * FROM remaining;`);
=======
      SELECT bv.id, bv.nombre_bar, COUNT(a.id) as cantidad
      FROM "barrio-vereda" bv
      JOIN airbnb a ON ST_Contains(bv.geom, a.geom)
      GROUP BY bv.id
      ORDER BY COUNT(*) DESC
      LIMIT 10;`,
    );

    res.send(results.rows);
  } catch (err) {
    console.error(err);
  }
});

app.get("/estaciones-mas-cercana", async function (req, res) {
  try {
    const { lat, long } = req.query;
    const results = await client.query(`
      SELECT id, nombre, ST_Distance(
        ST_Transform(geom, 3857),
        ST_Transform(ST_SetSRID(ST_MakePoint(${lat}, ${long}), 4326), 3857)
      ) / 1000 AS distance_kilometers
      FROM estaciones_metro em 
      ORDER BY geom <-> ST_SetSRID(ST_MakePoint(${lat}, ${long}), 4326)
      LIMIT 5;`,
    );
>>>>>>> 1b37f177d770bb2c5938d71f6e27740bf5067b26

    res.send(results.rows);
  } catch (err) {
    console.error(err);
  }
});

app.get("/reporte-precioPromedio-airbnb", async function (req, res) {
  try {
    const results = await client.query(`
    SELECT bv.id, bv.nombre_bar, MIN(a.price) as precio_promedio
    FROM "barrio-vereda" bv
    JOIN airbnb a ON ST_Contains(bv.geom, a.geom)
    GROUP BY bv.id
    ORDER BY COUNT(*) DESC
    LIMIT 10;`);
    res.send(results.rows);
  } catch (err) {
    console.error(err);
  }
});

app.listen(3001);
