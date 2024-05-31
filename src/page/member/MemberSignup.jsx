import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function MemberSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickName, setNickName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckedEmail, setIsCheckedEmail] = useState(false);
  const [isCheckedNickName, setIsCheckedNickName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
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
        navigate("/login");
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

  function handleCheckEmail() {
    axios
      .get(`/api/member/check?email=${email}`)
      .then((res) => {
        toast({
          status: "warning",
          position: "top",
          description: "사용할 수 없는 이메일입니다.",
        });
      }) // 이미 있는 이메일
      .catch((err) => {
        if (err.response.status === 404) {
          // 사용 가능한 이메일
          toast({
            status: "info",
            position: "top",
            description: "사용할 수 있는 이메일입니다.",
          });
          setIsCheckedEmail(true);
        }
      });
  }

  function handleCheckNickName() {
    axios
      .get(`/api/member/check?nickName=${nickName}`)
      .then((res) => {
        toast({
          status: "warning",
          position: "top",
          description: "사용할 수 없는 닉네임입니다.",
        });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "info",
            position: "top",
            description: "사용할 수 있는 닉네임입니다.",
          });
          setIsCheckedNickName(true);
        }
      });
  }

  let isCheckPassword = password === passwordCheck;

  let isDisabled = false;

  if (!isCheckPassword) {
    isDisabled = true;
  }
  if (
    !(
      email.trim().length > 0 &&
      password.trim().length > 0 &&
      nickName.trim().length > 0
    )
  ) {
    isDisabled = true;
  }
  if (!(isCheckedEmail && isCheckedNickName)) {
    isDisabled = true;
  }

  if (!isValidEmail) {
    isDisabled = true;
  }

  return (
    <Center>
      <Box mb={10} w={500}>
        <Box fontWeight={"bold"} fontSize={"2xl"} mb={6} color={"blue.700"}>
          회원가입
        </Box>
        <Box>
          <Box my={4}>
            <FormControl>
              <FormLabel>이메일</FormLabel>
              <InputGroup>
                <Input
                  type={"email"}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value.trim());
                    setIsCheckedEmail(false);
                    setIsValidEmail(!e.target.validity.typeMismatch);
                  }}
                />
                <InputRightElement w={"75px"} mr={1}>
                  <Button
                    isDisabled={!isValidEmail || email.trim().length == 0}
                    size={"sm"}
                    onClick={handleCheckEmail}
                  >
                    중복확인
                  </Button>
                </InputRightElement>
              </InputGroup>
              {isCheckedEmail || (
                <FormHelperText textAlign={"right"} color={"orange"}>
                  이메일 중복확인을 해주세요.
                </FormHelperText>
              )}
              {isValidEmail || (
                <FormHelperText textAlign={"right"} color={"orange"}>
                  올바른 이메일 형식으로 작성해주세요.
                </FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box my={4}>
            <FormControl>
              <FormLabel>패스워드</FormLabel>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </FormControl>
          </Box>
          <Box my={4}>
            <FormControl>
              <FormLabel>패스워드 확인</FormLabel>
              <Input
                onChange={(e) => setPasswordCheck(e.target.value)}
                type="password"
              />
              {isCheckPassword || (
                <FormHelperText color={"red"} textAlign={"right"}>
                  패스워드가 일치하지 않습니다.
                </FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box my={4}>
            <FormControl>
              <FormLabel>닉네임</FormLabel>
              <InputGroup>
                <Input
                  value={nickName}
                  onChange={(e) => {
                    setNickName(e.target.value.trim());
                    setIsCheckedNickName(false);
                  }}
                />
                <InputRightElement w={"75px"} mr={1}>
                  <Button
                    isDisabled={nickName.trim().length == 0}
                    size={"sm"}
                    onClick={handleCheckNickName}
                  >
                    중복확인
                  </Button>
                </InputRightElement>
              </InputGroup>
              {isCheckedNickName || (
                <FormHelperText textAlign={"right"} color={"orange"}>
                  닉네임 중복확인을 해주세요.
                </FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box mt={6}>
            <Button
              colorScheme={"blue"}
              onClick={handleSignupClick}
              isLoading={isLoading}
              isDisabled={isDisabled}
            >
              회원가입
            </Button>
            <Button>취소</Button>
          </Box>
        </Box>
      </Box>
    </Center>
  );
}
