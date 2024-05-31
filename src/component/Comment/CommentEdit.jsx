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
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";

export function CommentEdit({
  comment,
  setIsEditing,
  setIsProcessing,
  isProcessing,
}) {
  const [commentText, setCommentText] = useState(comment.comment);
  const { onClose, onOpen, isOpen } = useDisclosure();
  const toast = useToast();

  function handleCommentSubmit() {
    setIsProcessing(true);
    axios
      .put("/api/comment/edit", {
        id: comment.id,
        comment: commentText,
      })
      .then(() => {
        toast({
          status: "info",
          position: "top",
          description: "댓글이 수정되었습니다.",
        });
      })
      .catch(() => {})
      .finally(() => {
        setIsEditing(false);
        setIsProcessing(false);
      });
  }

  return (
    <Flex>
      <Box flex={1}>
        <Textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
      </Box>
      <Box>
        <Button
          variant="outline"
          colorScheme={"gray"}
          onClick={() => setIsEditing(false)}
        >
          <FontAwesomeIcon icon={faXmark} />
        </Button>
        <Button
          onClick={onOpen}
          variant="outline"
          colorScheme={"blue"}
          isLoading={isProcessing}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>수정 확인</ModalHeader>
          <ModalBody>댓글을 수정하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button onClick={onClose} colorScheme={"gray"}>
              취소
            </Button>
            <Button onClick={handleCommentSubmit} colorScheme={"yellow"}>
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
