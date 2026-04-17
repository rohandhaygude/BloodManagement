import React from "react";
import Hero from "../components/Hero";
import BloodRequestForm from "../components/BloodRequestForm";

const Request = () => {
  return (
    <>
      <Hero
        title={"Request Blood | Online Blood Management System"}
        imageUrl={"/signin.png"}
      />
      <BloodRequestForm />
    </>
  );
};

export default Request;