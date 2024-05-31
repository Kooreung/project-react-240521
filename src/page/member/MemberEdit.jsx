import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../../component/LoginProvider.jsx";

export function MemberEdit() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [isCheckedNickName, setIsCheckedNickName] = useState(true);
  const [passwordCheck, setPasswordCheck] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [oldNickName, setOldNickName] = useState("");
  const account = useContext(LoginContext);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    axios
      .get(`/api/member/${id}`)
      .then((res) => {
        const memberData = res.data;
        setMember({ ...memberData, password: "" });
        setOldNickName(memberData.nickName);
      })
      .catch(() => {
        toast({
          status: "warning",
          position: "top",
          description: "회원 정보 조회 중 문제가 발생하였습니다.",
        });
        navigate("/");
      });
  }, []);

  function handleClickSave() {
    axios
      .put("/api/member/modify", { ...member, oldPassword })
      .then((res) => {
        navigate(`/member/${id}`);
        toast({
          status: "success",
          position: "top",
          description: "회원 정보가 수정 되었습니다.",
        });
        account.login(res.data.token);
      })
      .catch((err) => {
        toast({
          status: "error",
          position: "top",
          description: "회원 정보 수정에 실패하였습니다.",
        });
      })
      .finally(() => {
        onClose();
        setOldNickName("");
      });
  }

  function handleClickCancel() {
    navigate(`/member/${member.id}`);
  }

  function handleCheckNickName() {
    axios
      .get(`/api/member/check?nickName=${member.nickName}`)
      .then(() => {
        toast({
          status: "warning",
          position: "top",
          description: "사용할 수 없는 닉네임입니다.",
        });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setIsCheckedNickName(true);
          toast({
            status: "info",
            position: "top",
            description: "사용할 수 있는 닉네임입니다.",
          });
        }
      });
  }

  if (member === null) {
    return <Spinner />;
  }

  let isPasswordCheck = member.password === passwordCheck;
  let isDisabledToPassword = false;
  if (!isPasswordCheck) {
    isDisabledToPassword = true;
  }

  return (
    <Center>
      <Box mb={10} w={{ base: 700, lg: 1000 }}>
        <Box fontWeight={"bold"} fontSize={"2xl"} mb={6} color={"blue.700"}>
          회원 정보 수정
        </Box>
        <Box>
          <Box my={4}>
            <FormControl>
              <FormLabel>이메일</FormLabel>
              <Input readOnly value={member.email} disabled={true} />
            </FormControl>
          </Box>
          <Box my={4}>
            <FormControl>
              <FormLabel>패스워드</FormLabel>
              <Input
                type={"password"}
                placeholder={"암호를 변경하려면 입력하세요."}
                onChange={(e) =>
                  setMember({ ...member, password: e.target.value })
                }
              />
              <FormHelperText textAlign={"right"} color={"orange"}>
                입력하지 않으면 기존 암호로 유지됩니다.
              </FormHelperText>
            </FormControl>
          </Box>
          <Box my={4}>
            <FormControl>
              <FormLabel>패스워드 확인</FormLabel>
              <Input
                onChange={(e) => setPasswordCheck(e.target.value)}
                type="password"
              />

              {isPasswordCheck || (
                <FormHelperText color={"red"} textAlign={"right"}>
                  패스워드가 일치하지 않습니다.
                </FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box my={4}>
            <FormControl>
              <FormLabel>별명</FormLabel>
              <InputGroup>
                <Input
                  value={member.nickName}
                  onChange={(e) => {
                    const newNickName = e.target.value.trim();
                    setMember({ ...member, nickName: e.target.value.trim() });
                    setIsCheckedNickName(newNickName === oldNickName);
                  }}
                />
                <InputRightElement w={"75px"} mr={1}>
                  <Button
                    size={"sm"}
                    onClick={handleCheckNickName}
                    isDisabled={
                      member.nickName.trim().length == 0 ||
                      member.nickName === oldNickName ||
                      isCheckedNickName
                    }
                  >
                    중복확인
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </Box>
          <Flex gap={4}>
            <Button
              colorScheme={"blue"}
              isDisabled={
                member.nickName.length == 0 ||
                isDisabledToPassword ||
                !isCheckedNickName
              }
              onClick={onOpen}
            >
              수정
            </Button>
            <Button bgColor={"lightgray"} onClick={handleClickCancel}>
              취소
            </Button>
          </Flex>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>기존 암호 확인</ModalHeader>
            <ModalBody>
              <FormControl>
                <FormLabel>기존 암호</FormLabel>
                <Input onChange={(e) => setOldPassword(e.target.value)} />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button onClick={handleClickSave}>수정</Button>
              <Button onClick={onClose}>취소</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Center>
  );
}
