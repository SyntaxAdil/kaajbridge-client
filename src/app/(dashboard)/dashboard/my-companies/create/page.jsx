import React from "react";
import CompanyCreateForm from "./CompanyCreateForm";

export const metadata = {
  title: "Register Company - KaajBridge",
};

export default function Page() {
  return (
    <section className="w-full min-h-screen bg-background px-6 py-8">
      <CompanyCreateForm />
    </section>
  );
}