import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  function handleClickSave() {
    axios
      .post("/api/board/add", {
        title,
        content,
        writer,
      })
      .then(() => {
        toast({
          description: "새 글이 등록되었습니다.",
          status: "success",
          position: "top",
        });
        navigate("/");
      })
      .catch()
      .finally();
  }

  return (
    <Box>
      <Box>글 작성 화면</Box>
      <br />
      <Box>
        <FormControl>
          <FormLabel>제목</FormLabel>
          <Input onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
      </Box>
      <br />
      <Box>
        <FormControl>
          <FormLabel>본문</FormLabel>
          <Textarea onChange={(e) => setContent(e.target.value)} />
        </FormControl>
      </Box>
      <br />
      <Box>
        <FormControl>
          <FormLabel>작성자</FormLabel>
          <Input onChange={(e) => setWriter(e.target.value)} />
        </FormControl>
      </Box>
      <br />
      <Box>
        <Button colorScheme={"blue"} onClick={handleClickSave}>
          저장
        </Button>
        <Button>취소</Button>
      </Box>
    </Box>
  );
}
