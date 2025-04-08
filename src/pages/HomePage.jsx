import React from "react";
import NavBarLoggedIn from "../components/navbar/NavBarLoggedIn";
import BodyHome from "../components/body/BodyHome";

export function HomePage() {
  return (
    <>
      <NavBarLoggedIn />
      <BodyHome />
    </>
  );
}
