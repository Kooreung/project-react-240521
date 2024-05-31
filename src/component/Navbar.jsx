import { useNavigate } from "react-router-dom";
import { Center, Flex, Hide, Show, Spacer, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { LoginContext } from "./LoginProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser } from "@fortawesome/free-solid-svg-icons";

export function Navbar() {
  const navigate = useNavigate();
  const account = useContext(LoginContext);

  return (
    <Flex
      gap={3}
      px={{ lg: 150, md: 100, base: 25 }}
      mb={6}
      h={24}
      bgColor="gray.300"
      justifyContent="space-evenly"
      color={"blue.700"}
    >
      <Center
        p={6}
        fontSize={"large"}
        fontWeight={"bold"}
        onClick={() => navigate("/")}
        cursor={"pointer"}
        _hover={{ bgColor: "gray.200" }}
      >
        <Show below={"lg"}>
          <FontAwesomeIcon icon={faHouse} size={"2xl"} />
        </Show>
        <Hide below={"lg"}>
          <Text>React HOME</Text>
        </Hide>
      </Center>
      <Spacer />

      {account.isLoggedIn() && (
        <Center
          p={{ base: 3, lg: 6 }}
          fontSize={"large"}
          fontWeight={"bold"}
          onClick={() => navigate(`/member/${account.id}`)}
          cursor={"pointer"}
          _hover={{ bgColor: "gray.200" }}
        >
          <FontAwesomeIcon icon={faUser} /> {account.nickName}
        </Center>
      )}
      {account.isAdmin() && (
        <Center
          p={{ base: 3, lg: 6 }}
          fontSize={"large"}
          fontWeight={"bold"}
          onClick={() => navigate("/member/list")}
          cursor={"pointer"}
          _hover={{ bgColor: "gray.200" }}
        >
          회원목록
        </Center>
      )}
      {account.isLoggedIn() || (
        <Center
          p={{ base: 3, lg: 6 }}
          fontSize={"large"}
          fontWeight={"bold"}
          onClick={() => navigate("/signup")}
          cursor={"pointer"}
          _hover={{ bgColor: "gray.200" }}
        >
          회원가입
        </Center>
      )}
      {account.isLoggedIn() || (
        <Center
          p={{ base: 3, lg: 6 }}
          fontSize={"large"}
          fontWeight={"bold"}
          onClick={() => navigate("/login")}
          cursor={"pointer"}
          _hover={{ bgColor: "gray.200" }}
        >
          로그인
        </Center>
      )}
      {account.isLoggedIn() && (
        <Center
          p={{ base: 3, lg: 6 }}
          fontSize={"large"}
          fontWeight={"bold"}
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
        </Center>
      )}
    </Flex>
  );
}
