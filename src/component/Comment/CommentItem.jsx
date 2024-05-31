import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useContext } from "react";
import { LoginContext } from "../LoginProvider.jsx";

export function CommentItem({ comment, isProcessing, setIsProcessing }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();
  const account = useContext(LoginContext);

  function handleCommentRemoveClick() {
    setIsProcessing(true);
    axios
      .delete(`/api/comment/remove`, {
        data: { id: comment.id },
      })
      .then(() => {
        toast({
          status: "info",
          position: "top",
          description: "댓글이 삭제되었습니다.",
        });
      })
      .catch((err) => {})
      .finally(() => {
        onClose();
        setIsProcessing(false);
      });
  }

  return (
    <Box border={"1px solid black"} my={3}>
      <Flex>
        <Box>{comment.nickName}</Box>
        <Spacer />
        <Box>{comment.inserted}</Box>
      </Flex>
      <Flex>
        <Box>{comment.comment}</Box>
        <Spacer />
        {account.hasAccess(comment.memberId) && (
          <Box>
            <Button
              onClick={onOpen}
              colorScheme={"orange"}
              isLoading={isProcessing}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </Button>
          </Box>
        )}
      </Flex>
      {account.hasAccess(comment.memberId) && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>삭제 확인</ModalHeader>
            <ModalBody>댓글을 삭제하시겠습니까?</ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>취소</Button>
              <Button
                onClick={handleCommentRemoveClick}
                colorScheme={"red"}
                isLoading={isProcessing}
              >
                삭제
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
}
