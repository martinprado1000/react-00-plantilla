import React from "react";
import NavBarLoggedOut from "../components/navbar/NavBarLoggedOut";
import BodyRegister from "../components/body/BodyRegister";

export function RegisterPage() {
  return (
    <>
      <NavBarLoggedOut />
      <BodyRegister />
    </>
  );
}
