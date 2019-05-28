import React, { useContext } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Leaflet from "leaflet";
import uniqid from "uniqid";

import "./styles.css";
import { SmartyContext } from "../../../context/smarty-context";

const pointerIcon = new Leaflet.Icon({
  iconUrl: require("../../../assets/pointerIcon.svg"),
  iconRetinaUrl: require("../../../assets/pointerIcon.svg"),
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [25, 55],
  shadowUrl: "../../../assets/marker-shadow.png",
  shadowSize: [68, 95],
  shadowAnchor: [20, 92]
});

const suitcasePoint = new Leaflet.Icon({
  iconUrl: require("../../../assets/suitcaseIcon.svg"),
  iconRetinaUrl: require("../../../assets/suitcaseIcon.svg"),
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
  iconSize: [40, 40],
  shadowUrl: "../../../assets/marker-shadow.png",
  shadowSize: [29, 40],
  shadowAnchor: [7, 40]
});

const LeafletMap = ({ rows, columns, zoom = 10 }) => {
  const { token } = useContext(SmartyContext);
  const markers =
    rows &&
    rows.map(row => ({
      icon: "suitcase",
      lat: row.location.lat,
      lng: row.location.lon,
      text: columns ? columns.map(c => `${c.label}: ${row[c.key]}`) : "No Label"
    }));
  const bounds = markers
    ? Leaflet.latLngBounds(markers.map(m => [m.lat, m.lng]))
    : null;
  const url = `https://smartmap-api.tk/api/map/wmts?api_key=${token}&request=GetTile&layer=Malaysia:TMSmartmap&format=image/png&TILEMATRIXSET=EPSG:4326&TILEMATRIX=EPSG:4326:{z}&TILEROW={y}&TILECOL={x}`;

  return (
    <Map bounds={bounds} zoom={zoom} crs={Leaflet.CRS.EPSG4326}>
      <TileLayer url={url} attribution="TM SmartMap © 2019 Telekom Malaysia" />
      {markers &&
        markers.map(({ lat, lng, text, icon }) => {
          const position = [lat, lng];
          return (
            <Marker
              key={uniqid()}
              position={position}
              icon={icon === "suitcase" ? suitcasePoint : pointerIcon}
            >
              <Popup>
                <div className="marker">
                  <ul>
                    {text &&
                      text.map(paragraph => (
                        <li key={uniqid()}>{paragraph}</li>
                      ))}
                  </ul>
                </div>
              </Popup>
            </Marker>
          );
        })}
    </Map>
  );
};

export default LeafletMap;
