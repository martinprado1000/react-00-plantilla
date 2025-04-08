import React from "react";
import NavBarLoggedIn from "../components/navbar/NavBarLoggedIn";
import BodyUsers from "../components/body/BodyUsers";

export function UsersPage() {
  return (
    <>
      <NavBarLoggedIn />
      <BodyUsers />
    </>
  );
}