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

  return (
    <Box>
      <Box>{member.id}번 회원의 회원 정보</Box>
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
        <Box>
          <Button>수정</Button>
          <Button>삭제</Button>
        </Box>
      </Box>
    </Box>
  );
}
