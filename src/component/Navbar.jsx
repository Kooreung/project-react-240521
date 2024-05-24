import { useNavigate } from "react-router-dom";
import { Box, Flex, Spacer } from "@chakra-ui/react";
import React, { useContext } from "react";
import { LoginContext } from "./LoginProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export function Navbar() {
  const navigate = useNavigate();
  const account = useContext(LoginContext);

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
      {account.isLoggedIn() && (
        <Box
          onClick={() => navigate("/write")}
          cursor={"pointer"}
          _hover={{ bgColor: "blue.100" }}
        >
          글쓰기
        </Box>
      )}
      <Spacer />
      {account.isLoggedIn() && (
        <Box
          onClick={() => navigate(`/member/${account.id}`)}
          cursor={"pointer"}
          _hover={{ bgColor: "blue.100" }}
        >
          <FontAwesomeIcon icon={faUser} /> {account.nickName}
        </Box>
      )}
      {account.isAdmin() && (
        <Box
          onClick={() => navigate("/member/list")}
          cursor={"pointer"}
          _hover={{ bgColor: "blue.100" }}
        >
          회원목록
        </Box>
      )}
      {account.isLoggedIn() || (
        <Box
          onClick={() => navigate("/signup")}
          cursor={"pointer"}
          _hover={{ bgColor: "blue.100" }}
        >
          회원가입
        </Box>
      )}
      {account.isLoggedIn() || (
        <Box
          onClick={() => navigate("/login")}
          cursor={"pointer"}
          _hover={{ bgColor: "blue.100" }}
        >
          로그인
        </Box>
      )}
      {account.isLoggedIn() && (
        <Box
          onClick={() => {
            account.logout();
            navigate("/login");
          }}
          cursor={"pointer"}
          _hover={{
            bgColor: "gray.200",
          }}
        >
          로그아웃
        </Box>
      )}
    </Flex>
  );
}
