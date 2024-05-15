import React from "react";
import { Popup, GeoJSON } from "react-leaflet";
import Slider from "react-slick";

const sliderSettings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

export default function LayerAirbnb({ item }) {
  return (
    <GeoJSON data={item.geometry}>
      <Popup maxWidth="400">
        <Slider className="photos-airbnb" {...sliderSettings}>
          {item.photos.map((photo, i) => (
            <img key={i} src={photo.url} height="250px" />
          ))}
        </Slider>
        <div className="modal-info">
          <p className="name-airbnb">{item.name}</p>
          <p>Puntaje: {item.stars}</p>
          <p>Número de invitados: {item.numberOfGuests}</p>
          <p>Tipo habitación: {item.roomType}</p>
        </div>
      </Popup>
    </GeoJSON>
  );
}
