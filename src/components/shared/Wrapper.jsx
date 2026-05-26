import React from "react";

const Wrapper = ({ className, children }) => {
  return (
    <section className={`container mx-auto ${className}`}>{children}</section>
  );
};

export default Wrapper;
