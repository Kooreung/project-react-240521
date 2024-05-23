import {
  Box,
  Button,
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
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function MemberEdit() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [isCheckedNickName, setIsCheckedNickName] = useState(true);
  const [passwordCheck, setPasswordCheck] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [oldNickName, setOldNickName] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    axios
      .get(`/api/member/${id}`)
      .then((res) => {
        const memberData = res.data;
        setMember({ ...memberData, password: "" });
        setOldNickName(member.nickName);
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
      .then(() => {
        navigate("/member/list");
      })
      .catch(() => {})
      .finally(() => {});
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
    <Box>
      <Box>회원 정보 수정</Box>
      <Box>
        <Box>
          <FormControl>
            <FormLabel>이메일</FormLabel>
            <Input readOnly value={member.email} disabled={true} />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>패스워드</FormLabel>
            <Input
              placeholder={"암호를 변경하려면 입력하세요."}
              onChange={(e) =>
                setMember({ ...member, password: e.target.value })
              }
            />
            <FormHelperText>
              입력하지 않으면 기존 암호로 유지됩니다.
            </FormHelperText>
          </FormControl>
        </Box>
        <Box>
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
        <Box>
          <FormControl>
            <FormLabel>별명</FormLabel>
            <InputGroup>
              <Input
                value={member.nickName}
                onChange={(e) => {
                  setMember({ ...member, nickName: e.target.value.trim() });
                  setIsCheckedNickName(false);
                }}
              />
              <InputRightElement w={"75px"} mr={1}>
                <Button
                  size={"sm"}
                  onClick={handleCheckNickName}
                  isDisabled={
                    member.nickName.trim().length == 0 ||
                    member.nickName === oldNickName
                  }
                >
                  중복확인
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Box>
        <Box>
          <Button
            colorScheme={"blue"}
            isDisabled={member.nickName.length == 0 || isDisabledToPassword}
            onClick={onOpen}
          >
            수정
          </Button>
        </Box>
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
  );
}
