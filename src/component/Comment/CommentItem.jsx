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
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays, faUser } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useContext, useState } from "react";
import { LoginContext } from "../LoginProvider.jsx";
import { CommentEdit } from "./CommentEdit.jsx";

export function CommentItem({ comment, isProcessing, setIsProcessing }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);
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
    <Box>
      <Flex>
        <Flex fontWeight={"bold"} gap={2}>
          <Box>
            <FontAwesomeIcon icon={faUser} />
          </Box>
          <Box>{comment.nickName}</Box>
        </Flex>
        <Spacer />
        <Flex gap={2}>
          <Box>
            <FontAwesomeIcon icon={faCalendarDays} />
          </Box>
          <Box>{comment.inserted}</Box>
        </Flex>
      </Flex>
      {isEditing || (
        <Flex>
          <Box whiteSpace={"pre"}>{comment.comment}</Box>
          <Spacer />
          {account.hasAccess(comment.memberId) && (
            <Stack>
              <Box>
                <Button
                  onClick={() => setIsEditing(true)}
                  color={"blue.700"}
                  colorScheme={"yellow"}
                  variant={"outline"}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Button>
              </Box>
              <Box>
                <Button
                  onClick={onOpen}
                  colorScheme={"orange"}
                  isLoading={isProcessing}
                  variant={"outline"}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </Button>
              </Box>
            </Stack>
          )}
        </Flex>
      )}
      {isEditing && (
        <CommentEdit
          comment={comment}
          setIsEditing={setIsEditing}
          setIsProcessing={setIsProcessing}
          isProcessing={isProcessing}
        />
      )}

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
