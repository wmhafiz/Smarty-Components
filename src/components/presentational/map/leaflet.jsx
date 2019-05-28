import React, { useContext } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Leaflet from "leaflet";
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

const LeafletMap = ({ markers, center }) => {
  const { token } = useContext(SmartyContext);
  const { lat, lng, zoom } = center;
  const position = [lat, lng];
  const url = `https://smartmap-api.tk/api/map/wmts?api_key=${token}&request=GetTile&layer=Malaysia:TMSmartmap&format=image/png&TILEMATRIXSET=EPSG:4326&TILEMATRIX=EPSG:4326:{z}&TILEROW={y}&TILECOL={x}`;
  console.log("url", url);
  return (
    <Map center={position} zoom={zoom} crs={Leaflet.CRS.EPSG4326}>
      <TileLayer url={url} attribution="TM SmartMap © 2019 Telekom Malaysia" />
      {markers &&
        markers.map(({ lat, lng, text, icon }) => {
          const position = [lat, lng];
          return (
            <Marker
              position={position}
              icon={icon === "suitcase" ? suitcasePoint : pointerIcon}
            >
              <Popup>
                <div className="marker">
                  <ul>
                    {text.map(paragraph => (
                      <li>{paragraph}</li>
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
