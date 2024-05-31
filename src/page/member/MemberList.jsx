import {
  Box,
  Center,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function MemberList() {
  const [memberList, setMemberList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/member/list").then((res) => setMemberList(res.data));
  }, []);

  if (memberList.length === 0) {
    return <Spinner />;
  }

  return (
    <Center>
      <Box mb={10} w={{ base: 700, lg: 1000 }}>
        <Box fontWeight={"bold"} fontSize={"2xl"} mb={6} color={"blue.700"}>
          회원 목록
        </Box>
        <Box>
          <Table>
            <Thead>
              <Tr borderY={"solid 2px gray"}>
                <Th color={"blue.700"} w={20}>
                  회원번호
                </Th>
                <Th color={"blue.700"}>이메일</Th>
                <Th color={"blue.700"} w={40}>
                  닉네임
                </Th>
                <Th color={"blue.700"}>가입일시</Th>
              </Tr>
            </Thead>
            <Tbody>
              {memberList.map((member) => (
                <Tr
                  cursor={"pointer"}
                  _hover={{ bgColor: "blue.100" }}
                  onClick={() => navigate(`/member/${member.id}`)}
                  key={member.id}
                >
                  <Td>{member.id}</Td>
                  <Td>{member.email}</Td>
                  <Td>{member.nickName}</Td>
                  <Td>{member.signupDateAndTime}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Center>
  );
}
