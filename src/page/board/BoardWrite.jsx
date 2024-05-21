import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";

export function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");

  function handleClickSave() {
    axios.post("/api/board/add", {
      title,
      content,
      writer,
    });
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
