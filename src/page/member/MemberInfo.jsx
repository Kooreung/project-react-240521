import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export function MemberInfo() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    axios
      .get(`/api/member/${id}`)
      .then((res) => setMember(res.data))
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "warning",
            position: "top",
            description: "존재하지 않는 회원입니다.",
          });
          navigate("/member/list");
        }
      });
  }, []);

  if (member === null) {
    return <Spinner />;
  }

  function handleClickUpdate() {}

  function handleClickDelete() {
    setIsLoading(true);
    axios
      .delete(`/api/member/${id}`)
      .then((res) => {
        toast({
          status: "success",
          position: "top",
          description: "회원 탈퇴를 하였습니다.",
        });
        navigate("/member/list");
      })
      .catch((err) => {
        toast({
          status: "warning",
          position: "top",
          description: "회원 탈퇴 중 문제가 발생하였습니다.",
        });
      })
      .finally(setIsLoading(false));
  }

  return (
    <Box>
      <Box>{member.nickName}의 회원 정보</Box>
      <Box>
        <Box>
          <FormControl>
            <FormLabel>이메일</FormLabel>
            <Input value={member.email} readOnly />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>닉네임</FormLabel>
            <Input value={member.nickName} readOnly />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>가입일자</FormLabel>
            <Input value={member.inserted} readOnly />
          </FormControl>
        </Box>
        <Box mt={6}>
          <Button onClick={handleClickUpdate} colorScheme={"orange"}>
            수정
          </Button>
          <Button
            onClick={handleClickDelete}
            colorScheme={"red"}
            isLoading={isLoading}
          >
            회원탈퇴
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
