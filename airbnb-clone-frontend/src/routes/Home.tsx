import {
    Box,
    Button,
    Grid,
    HStack,
    Heading,
    Image,
    Text,
    VStack,
} from "@chakra-ui/react";
import { FaStar, FaRegHeart } from "react-icons/fa6";

export default function Home() {
    return (
        <Grid
            mt={10}
            px={40}
            columnGap={4}
            rowGap={8}
            templateColumns={"repeat(5, 1fr)"}
        >
            {[
                1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3,
                4, 5, 6, 1, 2, 3, 4, 5, 6,
            ].map((index) => (
                <VStack key={index} alignItems={"flex-start"}>
                    <Box
                        position={"relative"}
                        mb={3}
                        overflow={"hidden"}
                        rounded={"3xl"}
                    >
                        <Image
                            h="280"
                            src="https://a0.muscache.com/im/pictures/e2bcb474-9938-47b0-a417-c4a02fd0532a.jpg?im_w=720"
                        />
                        <Button
                            variant={"unstyled"}
                            position={"absolute"}
                            top={0}
                            right={0}
                            color={"white"}
                        >
                            <FaRegHeart fontSize={"15px"} />
                        </Button>
                    </Box>
                    <Box>
                        <Grid gap={2} templateColumns={"6fr 1fr"}>
                            <Text as={"b"} noOfLines={1} fontSize={"md"}>
                                Cheomdangwahak-ro, Jeongeup-si, North Jeolla
                                Province, South Korea
                            </Text>
                            <HStack spacing={1}>
                                <FaStar size={15} />
                                <Text>5.0</Text>
                            </HStack>
                        </Grid>
                        <Text fontSize={"sm"} color={"gray.600"}>
                            Seoul, S.Korea
                        </Text>
                    </Box>
                    <Text fontSize={"sm"} color={"gray.600"}>
                        <Text as={"b"}>$72</Text> / night
                    </Text>
                </VStack>
            ))}
        </Grid>
    );
}
