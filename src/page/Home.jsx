import { Box } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../component/Navbar.jsx";

export function Home() {
  return (
    <Box>
      <Navbar />
      <Box mx={{ base: 15, lg: 300 }} mt={12}>
        <Outlet />
      </Box>
    </Box>
  );
}
