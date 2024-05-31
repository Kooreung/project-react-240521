import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, CardBody, Stack, StackDivider } from "@chakra-ui/react";
import { CommentItem } from "./CommentItem.jsx";

export function CommentList({ boardId, isProcessing, setIsProcessing }) {
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    if (!isProcessing) {
      axios
        .get(`/api/comment/list/${boardId}`)
        .then((res) => {
          setCommentList(res.data);
        })
        .catch((err) => console.log(err))
        .finally(() => {});
    }
  }, [isProcessing]);

  if (commentList.length === 0) {
    return <Box>댓글이 없습니다.</Box>;
  }
  return (
    <Card my={4}>
      <CardBody bgColor={"gray.300"}>
        <Stack divider={<StackDivider />} spacing={4}>
          {commentList.map((comment) => (
            <CommentItem
              comment={comment}
              key={comment.id}
              isProcessing={isProcessing}
              setIsProcessing={setIsProcessing}
            />
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
}
