import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Flex, Spacer } from "@chakra-ui/react";

export function CommentList({ boardId }) {
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/comment/list/${boardId}`)
      .then((res) => {
        setCommentList(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {});
  }, []);

  if (commentList.length === 0) {
    return <Box>댓글이 없습니다.</Box>;
  }
  return (
    <Box>
      {commentList.map((comment) => (
        <Box key={comment.id} boarder={"1px solid black"} my={3}>
          <Flex>
            <Box>{comment.memberId}</Box>
            <Spacer />
            <Box>{comment.inserted}</Box>
          </Flex>
          <Box>{comment.comment}</Box>
        </Box>
      ))}
    </Box>
  );
}
