import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  FormControl,
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
  Spacer,
  Spinner,
  Textarea,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../../component/LoginProvider.jsx";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CommentComponent } from "../../component/Comment/CommentComponent.jsx";

export function BoardView() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [like, setLike] = useState({
    like: false,
    count: 0,
  });
  const [isLikeProcessing, setIsLikeProcessing] = useState(false);
  const account = useContext(LoginContext);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    axios
      .get(`/api/board/${id}`)
      .then((res) => {
        setBoard(res.data.board);
        setLike(res.data.like);
      })
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
    axios
      .delete(`/api/board/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        toast({
          status: "success",
          position: "top",
          description: `${id}번 게시물이 삭제 되었습니다.`,
        });
        navigate("/");
      })
      .catch(() => {
        toast({
          status: "error",
          position: "top",
          description: `${id}번 게시물 삭제에 실패하였습니다.`,
        });
      })
      .finally(() => {
        onClose();
      });
  }

  function handleClickLike() {
    if (!account.isLoggedIn()) {
      return;
    }
    setIsLikeProcessing(true);
    axios
      .put(`/api/board/like`, { boardId: board.id })
      .then((res) => {
        setLike(res.data);
      })
      .catch(() => {})
      .finally(() => {
        setIsLikeProcessing(false);
      });
  }

  return (
    <Center>
      <Box mb={10} w={{ base: 700, lg: 1000 }}>
        <Flex>
          <Heading>{board.id} 번 게시물</Heading>
          <Spacer />
          {isLikeProcessing || (
            <Flex color={"orange"}>
              <Tooltip
                isDisabled={account.isLoggedIn()}
                hasArrow
                label="로그인 해주세요."
              >
                <Box
                  onClick={handleClickLike}
                  cursor="pointer"
                  fontSize={"3xl"}
                >
                  {like.like && <FontAwesomeIcon icon={fullHeart} />}
                  {like.like || <FontAwesomeIcon icon={emptyHeart} />}
                </Box>
              </Tooltip>
              {like.count > 0 && <Box fontSize={"3xl"}>{like.count}</Box>}
            </Flex>
          )}
          {isLikeProcessing && (
            <Box pr={3}>
              <Spinner />
            </Box>
          )}
        </Flex>
        <Box my={4}>
          <FormControl>
            <FormLabel>제목</FormLabel>
            <Input value={board.title} readOnly={true} />
          </FormControl>
        </Box>
        <Box my={4}>
          <FormControl>
            <FormLabel>본문</FormLabel>
            <Textarea value={board.content} readOnly={true} />
          </FormControl>
        </Box>
        <Box my={4}>
          {board.fileList &&
            board.fileList.map((file) => (
              <Card m={2} key={file.name}>
                <CardBody>
                  <Image w={"100%"} src={file.src} />
                </CardBody>
              </Card>
            ))}
        </Box>
        <Box my={4}>
          <FormControl>
            <FormLabel>작성자</FormLabel>
            <Input value={board.writer} readOnly={true} />
          </FormControl>
        </Box>
        <Box my={4}>
          <FormControl>
            <FormLabel>작성일시</FormLabel>
            <Input
              type={"datetime-local"}
              value={board.inserted}
              readOnly={true}
            />
          </FormControl>
        </Box>
        {account.hasAccess(board.memberId) && (
          <Flex my={4} gap={4}>
            <Button
              colorScheme={"blue"}
              onClick={() => navigate(`/edit/${board.id}`)}
            >
              수정
            </Button>
            <Button colorScheme={"red"} onClick={onOpen}>
              삭제
            </Button>
          </Flex>
        )}
        <Box my={8} border={"2px solid gray"} opacity={"0.25"} />

        <CommentComponent boardId={board.id} />

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalBody>삭제하시겠습니까?</ModalBody>
            <ModalFooter>
              <Flex gap={4}>
                <Button onClick={onClose}>취소</Button>
                <Button colorScheme={"red"} onClick={handleRemoveClick}>
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
