import { Box, Button, Flex, Textarea } from "@chakra-ui/react";
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

  function handleCommentSubmit() {
    setIsProcessing(true);
    axios
      .put("/api/comment/edit", {
        id: comment.id,
        comment: commentText,
      })
      .then(() => {})
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
          onClick={handleCommentSubmit}
          variant="outline"
          colorScheme={"blue"}
          isLoading={isProcessing}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </Button>
      </Box>
    </Flex>
  );
}
