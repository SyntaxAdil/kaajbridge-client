import React from "react";

const Wrapper = ({ className, children }) => {
  return (
    <section className={`container mx-auto px-4 md:px-6 py-4 ${className}`}>{children}</section>
  );
};

export default Wrapper;
