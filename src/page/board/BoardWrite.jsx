import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  StackDivider,
  Text,
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
    fileNameList.push(
      <Box>
        <Text fontSize={"mb"}>{files[i].name}</Text>
      </Box>,
    );
  }

  return (
    <Center>
      <Box mb={10} w={{ base: 700, lg: 1000 }}>
        <Box fontWeight={"bold"} fontSize={"2xl"} mb={6} color={"blue.700"}>
          글 작성 화면
        </Box>
        <Box my={4}>
          <FormControl>
            <FormLabel>제목</FormLabel>
            <Input onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
        </Box>
        <Box my={4}>
          <FormControl>
            <FormLabel>본문</FormLabel>
            <Textarea onChange={(e) => setContent(e.target.value)} />
          </FormControl>
        </Box>
        <Box my={4}>
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
            <FormHelperText textAlign={"right"} color={"orange"}>
              총 용량은 10MB, 한 파일은 3MB 를 초과할 수 없습니다.
            </FormHelperText>
          </FormControl>
        </Box>
        {fileNameList.length > 0 && (
          <Box my={4}>
            <Card>
              <CardHeader>
                <Heading size={"md"}>선택된 파일 목록</Heading>
              </CardHeader>
              <CardBody>
                <Stack divider={<StackDivider />} spacing={4}>
                  {fileNameList}
                </Stack>
              </CardBody>
            </Card>
          </Box>
        )}

        <Box my={4}>
          <FormControl>
            <FormLabel>작성자</FormLabel>
            <Input value={account.nickName} readOnly disabled />
          </FormControl>
        </Box>
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
    </Center>
  );
}
