import React from "react";
import { Marker, Popup } from "react-leaflet";
import Slider from "react-slick";

const sliderSettings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

export default function AirbnbModal({ item }) {
  return (
    <Marker position={[item.location_x, item.location_y]}>
      <Popup maxWidth="400">
        <Slider className="photos-airbnb" {...sliderSettings}>
          {item.photos.map((photo, i) => (
            <img key={i} src={photo.url} height="250px" />
          ))}
        </Slider>
        <div className="modal-info">
            Airbnb: {item.name}
        </div>
      </Popup>
    </Marker>
  );
}
