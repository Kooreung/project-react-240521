import { useNavigate } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";

export function Navbar() {
  const navigate = useNavigate();

  return (
    <Flex
      gap={3}
      mb={6}
      h={10}
      bgColor="gray.500"
      justifyContent="space-evenly"
      fontSize={"large"}
      fontWeight={"bold"}
      alignItems="center"
      color={"white"}
    >
      <Box
        onClick={() => navigate("/")}
        cursor={"pointer"}
        _hover={{ bgColor: "blue.100" }}
      >
        HOME
      </Box>
      <Box
        onClick={() => navigate("/write")}
        cursor={"pointer"}
        _hover={{ bgColor: "blue.100" }}
      >
        글쓰기
      </Box>
      <Box
        onClick={() => navigate("/member/list")}
        cursor={"pointer"}
        _hover={{ bgColor: "blue.100" }}
      >
        회원목록
      </Box>
      <Box
        onClick={() => navigate("/signup")}
        cursor={"pointer"}
        _hover={{ bgColor: "blue.100" }}
      >
        회원가입
      </Box>
      <Box
        onClick={() => navigate("/login")}
        cursor={"pointer"}
        _hover={{ bgColor: "blue.100" }}
      >
        로그인
      </Box>
    </Flex>
  );
}
