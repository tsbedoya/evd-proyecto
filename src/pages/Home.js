import React from "react";

export default function Home() {
  return (
    <div className="container">
      <div className="row" style={{ marginTop: "20px" }}>
        <div className="col">
          <h2>Descubre los Airbnb en Medellín</h2>
          <hr></hr>
          <div>
            <p>
              <h4>Bienvenidos a nuestro proyecto interactivo</h4>
              Medellín, conocida como la "Ciudad de la Eterna Primavera", es un
              destino turístico vibrante y dinámico, con una mezcla única de
              cultura, innovación y belleza natural. En este proyecto, te
              invitamos a explorar los alojamientos disponibles a través de
              Airbnb en esta fascinante ciudad colombiana.
              <p style={{ marginTop: "15px" }}>
                <h5>¿Qué encontrarás en este mapa interactivo?</h5>
                <ul>
                  <li typeof="circle">
                    <span style={{ fontWeight: "bold" }}>
                      Ubicación de los Airbnb:
                    </span>{" "}
                    Un mapa detallado que muestra la ubicación de los diferentes
                    Airbnb disponibles en Medellín. Podrás ver en qué barrios se
                    concentran más opciones de alojamiento y qué áreas pueden
                    ofrecerte la experiencia que buscas.
                  </li>
                  <li>
                    <span style={{ fontWeight: "bold" }}>
                      Gráficas informativas:
                    </span>{" "}
                    Presentamos una serie de gráficas que proporcionan
                    información valiosa sobre el mercado de Airbnb en Medellín.
                    Estas gráficas incluyen:
                  </li>
                </ul>

                <ul>
                  <li itemType="circle">Precios promedio por barrio.</li>
                  <li itemType="circle">Cantidad de airbnb por barrio.</li>
                  <li itemType="circle">
                    Estacion de metro más cercana y ruta.
                  </li>
                </ul>
              </p>
              <h4>Contexto del mercado de Airbnb en Medellín</h4> Medellín ha
              experimentado un auge en el turismo en los últimos años, lo que ha
              llevado a un incremento significativo en la oferta de alojamientos
              a través de plataformas como Airbnb. Esta expansión ha sido
              impulsada tanto por viajeros de negocios como por turistas que
              buscan explorar la ciudad.
              <ul>
                <li>
                  <span style={{ fontWeight: "bold" }}>
                    Atractivos turísticos:
                  </span>{" "}
                  Medellín ofrece una amplia gama de atracciones, desde el
                  innovador sistema de transporte público (Metro de Medellín)
                  hasta eventos culturales y festivales, como la famosa Feria de
                  las Flores.
                </li>
                <li>
                  <span style={{ fontWeight: "bold" }}>Desarrollo urbano:</span>{" "}
                  La ciudad ha sido reconocida internacionalmente por sus
                  esfuerzos en urbanismo e innovación, haciendo de Medellín un
                  destino atractivo para visitantes de todo el mundo.
                </li>
                <li>
                  {" "}
                  <span style={{ fontWeight: "bold" }}>
                    Diversidad de alojamientos:{" "}
                  </span>
                  Desde modernos apartamentos en El Poblado hasta acogedores
                  espacios en Laureles, la oferta de Airbnb en Medellín es
                  variada y se adapta a diferentes gustos y presupuestos.
                </li>
              </ul>
              <h4>¿Por qué utilizar este mapa?</h4> Este mapa interactivo es una
              herramienta valiosa para cualquier persona que esté planificando
              una visita a Medellín. Ya seas un turista en busca de la mejor
              ubicación para tu estadía, un anfitrión que desea entender mejor
              el mercado local, o un investigador interesado en el impacto del
              turismo en la ciudad, nuestra plataforma te proporcionará
              información precisa y útil.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
