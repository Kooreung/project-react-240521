import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import React from "react";

export function Home() {
  return;
  <Box>
    <Box>navBar</Box>
    <Box>
      <Outlet />
    </Box>
  </Box>;
}
