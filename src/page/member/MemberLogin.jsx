import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

export function MemberLogin() {
  return (
    <Box>
      <Box>로그인</Box>
      <Box>
        <Box>
          <FormControl>
            <FormLabel>이메일</FormLabel>
            <Input />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>패스워드</FormLabel>
            <Input />
          </FormControl>
        </Box>
        <Box>
          <Button colorScheme={"blue"}>로그인</Button>
          <Button>취소</Button>
        </Box>
      </Box>
    </Box>
  );
}
