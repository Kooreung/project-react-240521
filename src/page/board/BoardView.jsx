import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function BoardView() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/board/${id}`)
      .then((res) => setBoard(res.data))
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "info",
            description: "해당 게시물이 존재하지 않습니다.",
            position: "top",
          });
          navigate("/");
        }
      });
  }, []);

  // 기다리는 동안 로딩 화면
  if (board === null) {
    return <Spinner />;
  }

  function handleRemoveClick() {
    axios.delete(`/api/board/${id}`);
  }

  return (
    <Box>
      <Box>{board.id} 번 게시물</Box>
      <Box>
        <FormControl>
          <FormLabel>제목</FormLabel>
          <Input value={board.title} readOnly />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>본문</FormLabel>
          <Textarea value={board.content} readolny />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>작성자</FormLabel>
          <Input value={board.writer} readOnly />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>작성일시</FormLabel>
          <Input type={"datetime-local"} value={board.inserted} readonly />
        </FormControl>
      </Box>
      <Box mt={6}>
        <Button colorScheme={"blue"} mr={2}>
          수정
        </Button>
        <Button colorScheme={"red"} onClick={handleRemoveClick}>
          삭제
        </Button>
      </Box>
    </Box>
  );
}
