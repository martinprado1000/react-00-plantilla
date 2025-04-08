import React from "react";
import NavBarLoggedOut from "../components/navbar/NavBarLoggedOut";
import BodyLogin from "../components/body/BodyLogin";

export function LoginPage() {
  return (
    <>
      <NavBarLoggedOut />
      <BodyLogin />
    </>
  );
}
