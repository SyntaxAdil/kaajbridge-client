import Image from "next/image";
import React from "react";

const Logo = ({ isDark = false, className="" }) => {
  return (
    <Image
      src={isDark ? "/logo/kaajbridge_dark.png" : "/logo/kaajbridge_light.png"}
      width={200}
      height={100}
      alt="KaajBridge"
      className={`w-40 pointer-events-none select-none ${className}`}
    />
  );
};

export default Logo;
