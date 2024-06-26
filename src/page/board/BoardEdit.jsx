import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Switch,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function BoardEdit() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [removeFileList, setRemoveFileList] = useState([]);
  const [addFileList, setAddFileList] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    axios.get(`/api/board/${id}`).then((res) => setBoard(res.data.board));
  }, []);

  function handleClickSave() {
    axios
      .putForm(`/api/board/edit`, {
        id: board.id,
        title: board.title,
        content: board.content,
        removeFileList,
        addFileList,
      })
      .then(() => {
        toast({
          status: "success",
          position: "top",
          description: `${board.id}번 게시글이 수정되었습니다.`,
        });
        navigate(`/board/${board.id}`);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast({
            status: "error",
            position: "top",
            description: `게시글 수정에 실패하였습니다.`,
          });
        }
      })
      .finally(() => {
        onClose();
      });
  }

  function handleClickCancel() {
    navigate(`/board/${board.id}`);
  }

  if (board === null) {
    return <Spinner />;
  }

  function handleRemoveSwitchChange(name, checked) {
    if (checked) {
      setRemoveFileList([...removeFileList, name]);
    } else {
      setRemoveFileList(removeFileList.filter((item) => item !== name));
    }
  }

  const fileNameList = [];
  for (let addFile of addFileList) {
    let duplicate = false;
    for (let file of board.fileList) {
      if (file.name === addFile.name) {
        duplicate = true;
        break;
      }
    }
    fileNameList.push(
      <li>
        {addFile.name}
        {duplicate && <Badge colorScheme={"orange"}>override</Badge>}
      </li>,
    );
  }

  return (
    <Center>
      <Box mb={10} w={{ base: 700, lg: 1000 }}>
        <Flex>
          <Box fontWeight={"bold"} fontSize={"2xl"} mb={6} color={"blue.700"}>
            {board.id} 번 게시물 수정
          </Box>
        </Flex>
        <Box my={4}>
          <Box>
            <FormControl>
              <FormLabel>제목</FormLabel>
              <Input
                defaultValue={board.title}
                onChange={(e) => setBoard({ ...board, title: e.target.value })}
              />
            </FormControl>
          </Box>
          <Box my={4}>
            <FormControl>
              <FormLabel>본문</FormLabel>
              <Textarea
                defaultValue={board.content}
                onChange={(e) =>
                  setBoard({ ...board, content: e.target.value })
                }
              ></Textarea>
            </FormControl>
          </Box>
          <Box my={4}>
            {board.fileList &&
              board.fileList.map((file) => (
                <Box border={"2px solid black"} m={3} key={file.name}>
                  <Flex>
                    <FontAwesomeIcon icon={faTrashCan} />
                    <Switch
                      onChange={(e) =>
                        handleRemoveSwitchChange(file.name, e.target.checked)
                      }
                    />
                    <Text>{file.name}</Text>
                  </Flex>
                  <Box>
                    <Image
                      sx={
                        removeFileList.includes(file.name)
                          ? { filter: "blur(8px)" }
                          : {}
                      }
                      src={file.src}
                    />
                  </Box>
                </Box>
              ))}
          </Box>
          <Box my={4}>
            <FormControl>
              <FormLabel>파일</FormLabel>
              <Input
                type={"file"}
                accept={"image/*"}
                multiple={true}
                onChange={(e) => {
                  setAddFileList(e.target.files);
                }}
              />
              <FormHelperText textAlign={"right"} color={"orange"}>
                총 용량은 10MB, 한 파일은 3MB 를 초과할 수 없습니다.
              </FormHelperText>
            </FormControl>
          </Box>
          {fileNameList.length > 0 && (
            <Box>
              <Card m={2} bgColor={"gray.300"}>
                <CardHeader>
                  <Heading size={"md"}>선택된 파일 목록</Heading>
                </CardHeader>
                <CardBody>
                  <Stack>{fileNameList}</Stack>
                </CardBody>
              </Card>
            </Box>
          )}
          <Box my={4}>
            <FormControl>
              <FormLabel>작성자</FormLabel>
              <Input defaultValue={board.writer} readOnly />
            </FormControl>
          </Box>
          <Box my={4}>
            <Flex gap={4}>
              <Button colorScheme={"blue"} onClick={onOpen}>
                저장
              </Button>
              <Button bgColor={"lightgray"} onClick={handleClickCancel}>
                취소
              </Button>
            </Flex>
          </Box>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalBody>저장하시겠습니까?</ModalBody>
            <ModalFooter>
              <Flex gap={4}>
                <Button onClick={onClose}>취소</Button>
                <Button onClick={handleClickSave} colorScheme={"blue"}>
                  확인
                </Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Center>
  );
}
