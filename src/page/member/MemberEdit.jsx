import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
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
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    axios
      .get(`/api/member/${id}`)
      .then((res) => {
        const memberData = res.data;
        setMember({ ...memberData, password: "" });
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
      .put("/api/member/modify", member)
      .then((res) => {
        navigate("/member/list");
      })
      .catch()
      .finally();
  }

  if (member === null) {
    return <Spinner />;
  }

  return (
    <Box>
      <Box>회원 정보 수정</Box>
      <Box>
        <Box>
          <FormControl>
            <FormLabel>이메일</FormLabel>
            <Input readOnly value={member.email} />
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
            <Input />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>별명</FormLabel>
            <Input
              value={member.nickName}
              onChange={(e) =>
                setMember({ ...member, nickName: e.target.value })
              }
            />
          </FormControl>
        </Box>
        <Box>
          <Button colorScheme={"blue"} onClick={handleClickSave}>
            저장
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
