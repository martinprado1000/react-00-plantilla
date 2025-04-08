import React from "react";
import NavBarLoggedIn from "../components/navbar/NavBarLoggedIn";
import BodyUsersAddEdit from "../components/body/BodyUsersAddEdit";

export function UsersEditPage() {
  return (
    <>
      <NavBarLoggedIn />
      <BodyUsersAddEdit />
    </>
  );
}