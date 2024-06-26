import { Box, Heading } from "@chakra-ui/react";
import { CommentWrite } from "./CommentWrite.jsx";
import { CommentList } from "./CommentList.jsx";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";

export function CommentComponent({ boardId }) {
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <Box>
      <Heading my={4}>
        <FontAwesomeIcon icon={faComments} /> Comment
      </Heading>
      <CommentWrite
        boardId={boardId}
        isProcessing={isProcessing}
        setIsProcessing={setIsProcessing}
      />
      <CommentList
        boardId={boardId}
        isProcessing={isProcessing}
        setIsProcessing={setIsProcessing}
      />
    </Box>
  );
}
