import { Box } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../component/Navbar.jsx";

export function Home() {
  return (
    <Box>
      <Navbar />
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
}
