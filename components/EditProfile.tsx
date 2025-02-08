import React, { useRef, useState } from "react";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import {
    AlertCircleIcon,
    ChevronDownIcon,
    CloseIcon,
    GlobeIcon,
    Icon,
} from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import { AlertCircle } from "lucide-react-native";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import {
    Modal,
    ModalBackdrop,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
} from "@/components/ui/modal";
import { Input, InputField } from "@/components/ui/input";
import {
    Avatar,
    AvatarBadge,
    AvatarImage,
} from "@/components/ui/avatar";
import { Center } from "@/components/ui/center";
import { Keyboard } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    FormControl,
    FormControlError,
    FormControlErrorIcon,
    FormControlErrorText,
    FormControlLabel,
    FormControlLabelText,
} from "@/components/ui/form-control";
import {
    Select,
    SelectBackdrop,
    SelectContent,
    SelectDragIndicator,
    SelectDragIndicatorWrapper,
    SelectIcon,
    SelectInput,
    SelectItem,
    SelectPortal,
    SelectTrigger,
} from "@/components/ui/select";
import { userSchema, userSchemaDetails } from "@/app/(tabs)/profile/AccountCardType";
import { updateUser } from "@/api/userSession";

export default function EditProfile({ showModal, setShowModal }: { showModal: boolean; setShowModal: any; }) {
    const ref = useRef(null);
    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<userSchemaDetails>({
        resolver: zodResolver(userSchema),
    });

    const handleKeyPress = () => {
        Keyboard.dismiss();
    };
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isNameFocused, setIsNameFocused] = useState(false);
    const onSubmit = async (_data: userSchemaDetails) => {
        // check if async works or not with handleSubmit!
        const name = _data.firstName + " " + _data.lastName;
        const didUpdate = await updateUser(name, _data.oldPassword, _data.newPassword);
        if (didUpdate) {
            setShowModal(false);
            reset();
            // show successful message
        } else {
            // show error message
        }

    };

    return (
        <Modal
            isOpen={showModal}
            onClose={() => {
                setShowModal(false);
            }}
            finalFocusRef={ref}
            size="lg"
        >
            <ModalBackdrop />
            <ModalContent>
                <ModalHeader className="absolute w-full mt-4 ml-6">
                    <Heading size="2xl" className="text-typography-800">
                        Edit Profile
                    </Heading>
                    <ModalCloseButton>
                        <Icon
                            as={CloseIcon}
                            size="md"
                            className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
                        />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody className="mt-10">
                    <VStack space="2xl">
                        <HStack className="items-center justify-between">
                            <FormControl
                                isInvalid={!!errors.firstName || isNameFocused}
                                className="w-[47%]"
                            >
                                <FormControlLabel className="mb-2">
                                    <FormControlLabelText>First Name</FormControlLabelText>
                                </FormControlLabel>
                                <Controller
                                    name="firstName"
                                    control={control}
                                    rules={{
                                        validate: async (value) => {
                                            try {
                                                await userSchema.parseAsync({
                                                    firstName: value,
                                                });
                                                return true;
                                            } catch (error: any) {
                                                return error.message;
                                            }
                                        },
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input>
                                            <InputField
                                                placeholder="First Name"
                                                type="text"
                                                value={value}
                                                onChangeText={onChange}
                                                onBlur={onBlur}
                                                onSubmitEditing={handleKeyPress}
                                                returnKeyType="done"
                                            />
                                        </Input>
                                    )}
                                />
                                <FormControlError>
                                    <FormControlErrorIcon as={AlertCircleIcon} size="md" />
                                    <FormControlErrorText>
                                        {errors?.firstName?.message}
                                    </FormControlErrorText>
                                </FormControlError>
                            </FormControl>
                            <FormControl
                                isInvalid={!!errors.lastName || isNameFocused}
                                className="w-[47%]"
                            >
                                <FormControlLabel className="mb-2">
                                    <FormControlLabelText>Last Name</FormControlLabelText>
                                </FormControlLabel>
                                <Controller
                                    name="lastName"
                                    control={control}
                                    rules={{
                                        validate: async (value) => {
                                            try {
                                                await userSchema.parseAsync({
                                                    lastName: value,
                                                });
                                                return true;
                                            } catch (error: any) {
                                                return error.message;
                                            }
                                        },
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input>
                                            <InputField
                                                placeholder="Last Name"
                                                type="text"
                                                value={value}
                                                onChangeText={onChange}
                                                onBlur={onBlur}
                                                onSubmitEditing={handleKeyPress}
                                                returnKeyType="done"
                                            />
                                        </Input>
                                    )}
                                />
                                <FormControlError>
                                    <FormControlErrorIcon as={AlertCircleIcon} size="md" />
                                    <FormControlErrorText>
                                        {errors?.lastName?.message}
                                    </FormControlErrorText>
                                </FormControlError>
                            </FormControl>
                        </HStack>
                        <HStack className="items-center justify-between">
                            <FormControl
                                // fix this
                                isInvalid={!!errors.oldPassword || isNameFocused}
                                className="w-[47%]"
                            >
                                <FormControlLabel className="mb-2">
                                    <FormControlLabelText>Old Password</FormControlLabelText>
                                </FormControlLabel>
                                <Controller
                                    name="oldPassword"
                                    control={control}
                                    rules={{
                                        validate: async (value) => {
                                            try {
                                                await userSchema.parseAsync({
                                                    oldPassword: value,
                                                });
                                                return true;
                                            } catch (error: any) {
                                                return error.message;
                                            }
                                        },
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input>
                                            <InputField
                                                placeholder="Old Password"
                                                type="text"
                                                value={value}
                                                onChangeText={onChange}
                                                onBlur={onBlur}
                                                onSubmitEditing={handleKeyPress}
                                                returnKeyType="done"
                                            />
                                        </Input>
                                    )}
                                />
                                <FormControlError>
                                    <FormControlErrorIcon as={AlertCircleIcon} size="md" />
                                    <FormControlErrorText>
                                        {errors?.firstName?.message}
                                    </FormControlErrorText>
                                </FormControlError>
                            </FormControl>
                            <FormControl
                                isInvalid={!!errors.newPassword || isNameFocused}
                                className="w-[47%]"
                            >
                                <FormControlLabel className="mb-2">
                                    <FormControlLabelText>New Password</FormControlLabelText>
                                </FormControlLabel>
                                <Controller
                                    name="newPassword"
                                    control={control}
                                    rules={{
                                        validate: async (value) => {
                                            try {
                                                await userSchema.parseAsync({
                                                    newPassword: value,
                                                });
                                                return true;
                                            } catch (error: any) {
                                                return error.message;
                                            }
                                        },
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input>
                                            <InputField
                                                placeholder="New Password"
                                                type="text"
                                                value={value}
                                                onChangeText={onChange}
                                                onBlur={onBlur}
                                                onSubmitEditing={handleKeyPress}
                                                returnKeyType="done"
                                            />
                                        </Input>
                                    )}
                                />
                                <FormControlError>
                                    <FormControlErrorIcon as={AlertCircleIcon} size="md" />
                                    <FormControlErrorText>
                                        {errors?.lastName?.message}
                                    </FormControlErrorText>
                                </FormControlError>
                            </FormControl>
                        </HStack>
                        <Button
                            onPress={() => {
                                handleSubmit(onSubmit)();
                            }}
                            className="flex-1 p-2"
                        >
                            <ButtonText>Save Changes</ButtonText>
                        </Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};