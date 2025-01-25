import React from "react";
import AllBooks from "./AllBooks";
import AuthGuard from "../components/AuthGuard";

function Home() {
  return (
    <AuthGuard authentication={true}>
    <AllBooks />
    </AuthGuard>
  );
}

export default Home;
