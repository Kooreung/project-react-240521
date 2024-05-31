import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../component/LoginProvider.jsx";

export function MemberLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const account = useContext(LoginContext);

  function handleLogin() {
    axios
      .post("/api/member/token", { email, password })
      .then((res) => {
        account.login(res.data.token);
        toast({
          status: "success",
          position: "top",
          description: "로그인 되었습니다.",
        });
        navigate("/");
      })
      .catch(() => {
        account.logout();
        toast({
          status: "warning",
          position: "top",
          description: "이메일과 패스워드를 확인해주세요.",
        });
      });
  }

  return (
    <Center>
      <Box mb={10} w={500}>
        <Box fontWeight={"bold"} fontSize={"2xl"} mb={6} color={"blue.700"}>
          로그인
        </Box>
        <Box>
          <Box my={4}>
            <FormControl>
              <FormLabel>이메일</FormLabel>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                type={"email"}
              />
            </FormControl>
          </Box>
          <Box my={4}>
            <FormControl>
              <FormLabel>패스워드</FormLabel>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                type={"password"}
              />
            </FormControl>
          </Box>
          <Box mt={6}>
            <Button colorScheme={"blue"} onClick={handleLogin}>
              로그인
            </Button>
            <Button>취소</Button>
          </Box>
        </Box>
      </Box>
    </Center>
  );
}
