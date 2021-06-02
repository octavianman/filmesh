import React from "react";

export const WatchlistRemoveIcon = (props) => {
  const width = props.width || "16";
  const height = props.height || "20";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.28571 0C1.02857 0 0 1 0 2.22222V20L8 16.6667L16 20V2.22222C16 1.63285 15.7592 1.06762 15.3305 0.650874C14.9019 0.234126 14.3205 0 13.7143 0H2.28571ZM2.28571 2.22222H13.7143V16.6667L8 14.2444L2.28571 16.6667V2.22222ZM5.57714 4.96667L3.96571 6.53333L6.38857 8.88889L3.96571 11.2444L5.57714 12.8222L8 10.4667L10.4229 12.8111L12.0457 11.2444L9.62286 8.88889L12.0343 6.53333L10.4229 4.96667L8 7.32222L5.57714 4.96667V4.96667Z"
        fill="black"
      />
    </svg>
  );
};
