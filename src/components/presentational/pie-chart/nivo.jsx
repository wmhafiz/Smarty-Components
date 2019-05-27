import React from "react";
import { ResponsivePie } from "@nivo/pie";

const MyResponsivePie = ({ rows, mapper, limit, field, addFilter, ...props }) =>
  rows ? (
    <ResponsivePie
      onClick={(e) => addFilter && addFilter({
        field: field.toLowerCase(),
        value: e.id
      })}
      colors={{ scheme: "nivo" }}
      data={rows.slice(0, limit).map(mapper)}
      margin={{ top: 20, right: 20, bottom: 40, left: 20 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={0}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      enableRadialLabels={true}
      radialLabelsSkipAngle={10}
      radialLabelsTextXOffset={6}
      radialLabelsTextColor="#333333"
      radialLabelsLinkOffset={0}
      radialLabelsLinkDiagonalLength={16}
      radialLabelsLinkHorizontalLength={24}
      radialLabelsLinkStrokeWidth={1}
      radialLabelsLinkColor={{ from: "color" }}
      slicesLabelsSkipAngle={10}
      slicesLabelsTextColor="#333333"
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      tooltip={({ id, value, color }) => (
        <span style={{ color }}>
          {id}: {value}
        </span>
      )}
      theme={{
        tooltip: {
          container: {
            background: "#333"
          }
        }
      }}
      {...props}
    />
  ) : (
      <p>Rendering Chart..</p>
    );

export default MyResponsivePie;
