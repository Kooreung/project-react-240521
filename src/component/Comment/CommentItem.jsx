import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export function CommentItem({ comment }) {
  function handleCommentRemoveClick() {
    axios
      .delete(`/api/comment/remove`, {
        data: { id: comment.id },
      })
      .then((res) => {})
      .catch((err) => {})
      .finally(() => {});
  }

  return (
    <Box>
      <Box border={"1px solid black"} my={3}>
        <Flex>
          <Box>{comment.nickName}</Box>
          <Spacer />
          <Box>{comment.inserted}</Box>
        </Flex>
        <Box>{comment.comment}</Box>
        <Box>
          <Button colorScheme="red" onClick={handleCommentRemoveClick}>
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
