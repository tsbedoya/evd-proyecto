import React, { useState, useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Slider from "react-slick";

import "./mapa.css";
/*import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";*/
import "leaflet/dist/leaflet.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

const sliderSettings = {
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function Map() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3001");
      const airbnb = await response.json();
      setData(airbnb);
    };

    fetchData();
  }, []);

  return (
    <div className="wrap-map">
      {data.length ? (
        <MapContainer
          center={[data[0]?.location_x, data[0]?.location_y]}
          zoom={13}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {data.map((item) => (
            <Marker key={item.id} position={[item.location_x, item.location_y]}>
              <Popup>
                <Slider className="photos-airbnb" {...sliderSettings}>
                  {item.photos.map((photo) => (
                    <img src={photo.url} height="240px" />
                  ))}
                </Slider>
                Airbnb: {item.name}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : null}
    </div>
  );
}
