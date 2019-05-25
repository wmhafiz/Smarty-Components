import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const MyResponsiveBar = ({ rows, limit, ...props }) => (
  <ResponsiveBar
    data={rows.slice(0, limit)}
    keys={["count"]}
    indexBy="key1"
    margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
    padding={0.3}
    colors={{ scheme: "nivo" }}
    borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
    animate={true}
    motionStiffness={90}
    motionDamping={15}
    tooltip={({ indexValue, value, color }) => (
      <span style={{ color }}>
        {indexValue}: {value}
      </span>
    )}
    {...props}
  />
);

export default MyResponsiveBar;
