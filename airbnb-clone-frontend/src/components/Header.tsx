import {
    Box,
    Button,
    DarkMode,
    Avatar,
    HStack,
    IconButton,
    LightMode,
    Stack,
    useColorMode,
    useColorModeValue,
    Menu,
    MenuItem,
    useDisclosure,
    MenuButton,
    MenuList,
    useToast,
    ToastId,
} from "@chakra-ui/react";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa6";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import useUser from "../lib/useUser";
import { logOut } from "../api";
import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Headers() {
    const { userLoading, isLoggedIn, user } = useUser();
    const {
        isOpen: isLoginOpen,
        onClose: onLoginClose,
        onOpen: onLoginOpen,
    } = useDisclosure();
    const {
        isOpen: isSignUpOpen,
        onClose: onSignUpClose,
        onOpen: onSignUpOpen,
    } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const logoColor = useColorModeValue("red.500", "red.200");
    const Icon = useColorModeValue(FaMoon, FaSun);
    const toast = useToast();
    const toastId = useRef<ToastId>();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: logOut,
        onMutate: () => {
            console.log("Mutation starting(Logout)");
            toastId.current = toast({
                title: "Login out ...",
                description: "Sad to see you go ...",
                status: "loading",
                position: "bottom-right",
            });
        },
        onSuccess: (data) => {
            if (toastId.current) {
                toast.update(toastId.current, {
                    status: "success",
                    title: "Done!",
                    description: "See you later!",
                    duration: 5000,
                    isClosable: true,
                });
            }
            queryClient.refetchQueries({ queryKey: ["me"] });
        },
        onError: (error) => {
            console.log("Mutation has on error(Logout)");
        },
    });
    const onLogOut = async () => {
        mutation.mutate();
    };
    return (
        <Stack
            justifyContent={"space-between"}
            alignItems={"center"}
            py={5}
            px={40}
            direction={{
                sm: "column",
                md: "row",
            }}
            spacing={{
                sm: 3,
                md: 0,
            }}
            borderBottomWidth={1}
        >
            <Box color={logoColor}>
                <FaAirbnb size={"48"} />
            </Box>
            <HStack spacing={2}>
                <IconButton
                    onClick={toggleColorMode}
                    variant={"ghost"}
                    aria-label="Toggle dark mode"
                    icon={<Icon />}
                />
                {!userLoading ? (
                    !isLoggedIn ? (
                        <>
                            <Button onClick={onLoginOpen}>Log in</Button>
                            <LightMode>
                                <Button
                                    onClick={onSignUpOpen}
                                    colorScheme={"red"}
                                >
                                    Sign up
                                </Button>
                            </LightMode>
                        </>
                    ) : (
                        <Menu>
                            <MenuButton>
                                <Avatar
                                    name={user.name}
                                    src={user.avatar}
                                    size={"md"}
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={onLogOut}>Log out</MenuItem>
                            </MenuList>
                        </Menu>
                    )
                ) : null}
            </HStack>
            <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
        </Stack>
    );
}
