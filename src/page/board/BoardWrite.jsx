import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../component/LoginProvider.jsx";

export function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const account = useContext(LoginContext);

  function handleClickSave() {
    setLoading(true);
    axios
      .postForm("/api/board/add", {
        title,
        content,
        files,
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

  const fileNameList = [];
  for (let i = 0; i < files.length; i++) {
    fileNameList.push(<li>{files[i].name}</li>);
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
          <FormLabel>파일</FormLabel>
          <Input
            type={"file"}
            accept={"image/*"}
            multiple={true}
            onChange={(e) => {
              setFiles(e.target.files);
            }}
          />
          <FormHelperText>
            총 용량은 10MB, 한 파일은 3MB 를 초과할 수 없습니다.
          </FormHelperText>
        </FormControl>
      </Box>
      <Box>
        <ul>{fileNameList}</ul>
      </Box>
      <br />
      <Box>
        <FormControl>
          <FormLabel>작성자</FormLabel>
          <Input value={account.nickName} readOnly disabled />
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
