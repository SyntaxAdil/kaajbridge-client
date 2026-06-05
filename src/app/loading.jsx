import { Loader2 } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <section className="flex items-center justify-center min-h-screen">
      <Loader2 className="animate-spin"></Loader2>
    </section>
  );
};

export default loading;
