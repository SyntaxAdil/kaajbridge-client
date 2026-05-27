import Image from "next/image";
import React from "react";

const Logo = ({ isDark = false }) => {
  return (
    <>
      {isDark ? (
        <Image
          src={"/logo/kaajbridge_dark.png"}
          width={100}
          height={60}
          alt="KaajBridge"
        />
      ) : (
        <Image
          src={"/logo/kaajbridge_light.png"}
          width={200}
          height={100}
          alt="KaajBridge"
          className="w-40"
        />
      )}
    </>
  );
};

export default Logo;
