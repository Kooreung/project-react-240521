import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function MemberSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  function handleSignupClick() {
    setIsLoading(true);

    axios
      .post("/api/member/signup", { email, password, nickName })
      .then((res) => {
        toast({
          status: "success",
          position: "top",
          description: "회원가입 완료",
        });
        navigate("/");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast({
            status: "error",
            position: "top",
            description: "입력 내용을 확인해주세요.",
          });
        } else {
          toast({
            status: "error",
            position: "top",
            description: "회원가입에 실패하였습니다.",
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Box>
      <Box>회원가입</Box>
      <Box>
        <Box>
          <FormControl>
            <FormLabel>이메일</FormLabel>
            <Input onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>패스워드</FormLabel>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>닉네임</FormLabel>
            <Input onChange={(e) => setNickName(e.target.value)} />
          </FormControl>
        </Box>
        <Box mt={6}>
          <Button
            colorScheme={"blue"}
            onClick={handleSignupClick}
            isLoading={isLoading}
          >
            회원가입
          </Button>
          <Button>취소</Button>
        </Box>
      </Box>
    </Box>
  );
}
