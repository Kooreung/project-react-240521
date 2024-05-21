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
  const [loading, setLoading] = useState(false);

  function handleClickSave() {
    setLoading(true);
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
      .catch((e) => {
        const code = e.response.status;

        if (code === 400) {
          toast({
            status: "error",
            position: "top",
            description: "게시글 등록에 실패하였습니다.",
          });
        }
      })
      .finally(() => setLoading(false));
  }

  let disableSaveButton = false;
  if (title.trim().length === 0) {
    disableSaveButton = true;
  }
  if (content.trim().length === 0) {
    disableSaveButton = true;
  }
  if (writer.trim().length === 0) {
    disableSaveButton = true;
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
        <Button
          isLoading={loading}
          colorScheme={"blue"}
          onClick={handleClickSave}
          isDisabled={disableSaveButton}
        >
          저장
        </Button>
        <Button>취소</Button>
      </Box>
    </Box>
  );
}
