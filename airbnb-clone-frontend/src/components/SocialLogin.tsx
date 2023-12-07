import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaComment, FaGithub } from "react-icons/fa6";

export default function SocialLogin() {
    const kakaoParams = {
        client_id: "11d2cf7b2e89af2d0fa9e201d694f842",
        redirect_uri: "http://127.0.0.1:3000/social/kakao",
        response_type: "code",
    };
    const params = new URLSearchParams(kakaoParams).toString();
    console.log("PARAMS : ", params);
    return (
        <Box mb={4}>
            <HStack my={8}>
                <Divider />
                <Text
                    textTransform={"uppercase"}
                    color={"gray.500"}
                    fontSize={"xs"}
                    as="b"
                >
                    Or
                </Text>
                <Divider />
            </HStack>
            <VStack>
                <Button
                    as={"a"}
                    href="https://github.com/login/oauth/authorize?client_id=0d95a90665671ebe5f20&scope=read:user,user:email"
                    w={"100%"}
                    leftIcon={<FaGithub />}
                >
                    Continue with GitHub
                </Button>
                <Button
                    as={"a"}
                    href={`https://kauth.kakao.com/oauth/authorize?${params}`}
                    w={"100%"}
                    leftIcon={<FaComment />}
                    colorScheme="yellow"
                >
                    Continue with Kakao
                </Button>
            </VStack>
        </Box>
    );
}
