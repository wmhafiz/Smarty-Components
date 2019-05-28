import React from "react";

import { SmartyProvider } from "../context/smarty-context";
import LeafletMap from "../components/presentational/map/leaflet";

const markers = [
  {
    icon: "suitcase",
    lat: 2.9402756,
    lng: 101.7011364,
    text: [
      "Name: KAMOR RESTAURANT",
      "Category: Food and Beverages > Malay",
      "City: SHAH ALAM",
      "State: SELANGOR"
    ]
  },
  {
    icon: "pointer",
    lat: 2.9502756,
    lng: 101.7111364,
    text: ["Marker 2"]
  }
];
const MapPage = () => (
  <SmartyProvider token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNEY3dmxHa0I3X0JrT1g5bVQwbjEiLCJ1c2VybmFtZSI6IndtaGFmaXoiLCJ1c2VyX3R5cGUiOiJ1c2VyIn0sImlhdCI6MTU1MzU3MTk1MCwiZXhwIjoxNTg1MTI5NTUwfQ.wz_s0ef7OkizBIztv_6MZp6Uaooapwd6xGukcyBwIEg">
    <LeafletMap markers={markers} />
  </SmartyProvider>
);

export default MapPage;
