import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
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
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export function MemberInfo() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();

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

  function handleClickUpdate() {
    navigate(`/member/edit/${member.id}`);
  }

  function handleClickDelete() {
    setIsLoading(true);
    axios
      .delete(`/api/member/${id}`, {
        data: { id, password },
      })
      .then(() => {
        toast({
          status: "success",
          position: "top",
          description: "회원 탈퇴를 하였습니다.",
        });
        navigate("/member/list");
      })
      .catch(() => {
        toast({
          status: "warning",
          position: "top",
          description: "회원 탈퇴 중 문제가 발생하였습니다.",
        });
      })
      .finally(() => {
        setIsLoading(false);
        setPassword("");
        onClose;
      });
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
          <Button onClick={onOpen} colorScheme={"red"}>
            회원탈퇴
          </Button>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>탈퇴 확인</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>암호</FormLabel>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>취소</Button>
            <Button
              onClick={handleClickDelete}
              colorScheme={"red"}
              isLoading={isLoading}
            >
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
