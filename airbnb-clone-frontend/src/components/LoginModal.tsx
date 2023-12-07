import { useForm } from "react-hook-form";
import {
    Box,
    Button,
    Text,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    VStack,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { FaLock, FaUserNinja } from "react-icons/fa6";
import SocialLogin from "./SocialLogin";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    IUsernameLoginError,
    IUsernameLoginSuccess,
    IUsernameLoginVariables,
    usernameLogIn,
} from "../api";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface IForm {
    username: string;
    password: string;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IForm>();
    const queryClient = useQueryClient();
    const toast = useToast();
    const mutation = useMutation<
        IUsernameLoginSuccess,
        IUsernameLoginError,
        IUsernameLoginVariables
    >({
        mutationFn: usernameLogIn,
        onMutate: () => {
            console.log("Mutation starting");
        },
        onSuccess: (data) => {
            // data.ok;
            toast({
                title: "Welcome back!",
                status: "success",
                position: "bottom-right",
            });
            onClose();
            reset();
            queryClient.refetchQueries({ queryKey: ["me"] });
        },
        onError: (error) => {
            // error.error;
            console.log("Mutation has on error");
        },
    });
    const onSubmit = ({ username, password }: IForm) => {
        mutation.mutate({ username, password });
    };
    return (
        <Modal motionPreset="slideInRight" onClose={onClose} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Log in</ModalHeader>
                <ModalCloseButton></ModalCloseButton>
                <ModalBody as={"form"} onSubmit={handleSubmit(onSubmit)}>
                    <VStack>
                        <InputGroup>
                            <InputLeftElement
                                children={
                                    <Box color="gray.500">
                                        <FaUserNinja />
                                    </Box>
                                }
                            />
                            <Input
                                isInvalid={Boolean(errors.username?.message)}
                                required
                                {...register("username", {
                                    required: "Please write a username",
                                })}
                                variant={"filled"}
                                placeholder="Username"
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement
                                children={
                                    <Box color="gray.500">
                                        <FaLock />
                                    </Box>
                                }
                            />
                            <Input
                                isInvalid={Boolean(errors.password?.message)}
                                required
                                {...register("password", {
                                    required: "Please write a password",
                                })}
                                type="password"
                                variant={"filled"}
                                placeholder="Password"
                            />
                        </InputGroup>
                    </VStack>
                    {mutation.isError ? (
                        <Text
                            color={"red.500"}
                            textAlign={"center"}
                            fontSize={"sm"}
                        >
                            Username or Password are wrong
                        </Text>
                    ) : null}
                    <Button
                        isLoading={mutation.isPending}
                        type="submit"
                        mt={4}
                        colorScheme={"red"}
                        w="100%"
                    >
                        Log in
                    </Button>
                    <SocialLogin />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
