import React from "react";

export const ImageIcon = (props) => {
  const width = props.width || "22";
  const height = props.height || "22";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 5C1 3.93913 1.42143 2.92172 2.17157 2.17157C2.92172 1.42143 3.93913 1 5 1H17C18.0609 1 19.0783 1.42143 19.8284 2.17157C20.5786 2.92172 21 3.93913 21 5V17C21 18.0609 20.5786 19.0783 19.8284 19.8284C19.0783 20.5786 18.0609 21 17 21H5C3.93913 21 2.92172 20.5786 2.17157 19.8284C1.42143 19.0783 1 18.0609 1 17V5Z"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 10C8.88071 10 10 8.88071 10 7.5C10 6.11929 8.88071 5 7.5 5C6.11929 5 5 6.11929 5 7.5C5 8.88071 6.11929 10 7.5 10Z"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.526 11.6211L5 21.0001H17.133C18.1586 21.0001 19.1422 20.5926 19.8674 19.8674C20.5926 19.1422 21 18.1586 21 17.1331V17.0001C21 16.5341 20.825 16.3551 20.51 16.0101L16.48 11.6151C16.2922 11.4102 16.0637 11.2467 15.8092 11.135C15.5546 11.0234 15.2796 10.966 15.0017 10.9666C14.7237 10.9671 14.449 11.0256 14.1949 11.1383C13.9408 11.251 13.713 11.4154 13.526 11.6211V11.6211Z"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
