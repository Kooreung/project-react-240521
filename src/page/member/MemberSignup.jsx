import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

export function MemberSignup() {
  return (
    <Box>
      <Box>회원가입</Box>
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
          <FormControl>
            <FormLabel>닉네임</FormLabel>
            <Input />
          </FormControl>
        </Box>
        <Box mt={6}>
          <Button colorScheme={"blue"}>회원가입</Button>
          <Button>취소</Button>
        </Box>
      </Box>
    </Box>
  );
}
