import React from "react";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";

const Widgets = ({ store }) => <JSONPretty id="json-pretty" data={store} />;

export default Widgets;
