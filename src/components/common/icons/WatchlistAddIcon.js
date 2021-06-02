import React from "react";

export const WatchlistAddIcon = (props) => {
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
      <path d="M9 12V9H12V7H9V4H7V7H4V9H7V12H9Z" fill="black" />
      <path
        d="M16 20V2C16 0.897 15.103 0 14 0H2C0.897 0 0 0.897 0 2V20L8 15.428L16 20ZM2 8V2H14V16.553L8 13.125L2 16.553V8Z"
        fill="black"
      />
    </svg>
  );
};
