import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

const RoutingComponent = ({ startPoint, endPoint }) => {
    const map = useMap();
  
    useEffect(() => {
      if (!map) return;
  
      const routingControl = L.Routing.control({
        waypoints: [L.latLng(startPoint), L.latLng(endPoint)],
        routeWhileDragging: true,
      }).addTo(map);
  
      return () => {
        map.removeControl(routingControl);
      };
    }, [map, startPoint, endPoint]);
  
    return null;
  };
  
  export default RoutingComponent;