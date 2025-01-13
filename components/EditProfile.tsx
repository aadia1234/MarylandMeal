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

export default function EditProfile({showModal, setShowModal}: { showModal: boolean; setShowModal: any; }) {
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
    const onSubmit = (_data: userSchemaDetails) => {
        setShowModal(false);
        reset();
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
                <Box className={"w-full h-[215px] "}>
                    <Image
                        source={require("@/assets/images/MarylandMeal.png")}
                        height={100}
                        width={100}
                        alt="Banner Image"
                    />
                </Box>
                <Pressable className="absolute bg-background-500 rounded-full items-center justify-center h-8 w-8 right-6 top-44">
                    <Icon as={GlobeIcon} />
                </Pressable>
                <ModalHeader className="absolute w-full">
                    <Heading size="2xl" className="text-typography-800 pt-4 pl-4">
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
                <Center className="w-full absolute top-16">
                    <Avatar size="2xl">
                        <AvatarImage source={require("@/assets/images/MarylandMeal.png")} />
                        <AvatarBadge className="justify-center items-center bg-background-500">
                            <Icon as={GlobeIcon} />
                        </AvatarBadge>
                    </Avatar>
                </Center>
                <ModalBody className="px-10 py-6">
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
                            <FormControl className="w-[47%]" isInvalid={!!errors.gender}>
                                <FormControlLabel className="mb-2">
                                    <FormControlLabelText>Gender</FormControlLabelText>
                                </FormControlLabel>
                                <Controller
                                    name="gender"
                                    control={control}
                                    rules={{
                                        validate: async (value) => {
                                            try {
                                                await userSchema.parseAsync({ city: value });
                                                return true;
                                            } catch (error: any) {
                                                return error.message;
                                            }
                                        },
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <Select onValueChange={onChange} selectedValue={value}>
                                            <SelectTrigger variant="outline" size="md">
                                                <SelectInput placeholder="Select" />
                                                <SelectIcon className="mr-3" as={ChevronDownIcon} />
                                            </SelectTrigger>
                                            <SelectPortal>
                                                <SelectBackdrop />
                                                <SelectContent>
                                                    <SelectDragIndicatorWrapper>
                                                        <SelectDragIndicator />
                                                    </SelectDragIndicatorWrapper>
                                                    <SelectItem label="Male" value="male" />
                                                    <SelectItem label="Female" value="female" />
                                                    <SelectItem label="Others" value="others" />
                                                </SelectContent>
                                            </SelectPortal>
                                        </Select>
                                    )}
                                />
                                <FormControlError>
                                    <FormControlErrorIcon as={AlertCircle} size="md" />
                                    <FormControlErrorText>
                                        {errors?.gender?.message}
                                    </FormControlErrorText>
                                </FormControlError>
                            </FormControl>

                            <FormControl className="w-[47%]" isInvalid={!!errors.phoneNumber}>
                                <FormControlLabel className="mb-2">
                                    <FormControlLabelText>Phone number</FormControlLabelText>
                                </FormControlLabel>
                                <Controller
                                    name="phoneNumber"
                                    control={control}
                                    rules={{
                                        validate: async (value) => {
                                            try {
                                                await userSchema.parseAsync({ phoneNumber: value });
                                                return true;
                                            } catch (error: any) {
                                                return error.message;
                                            }
                                        },
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <HStack className="gap-1">
                                            <Select className="w-[28%]">
                                                <SelectTrigger variant="outline" size="md">
                                                    <SelectInput placeholder="+91" />
                                                    <SelectIcon className="mr-1" as={ChevronDownIcon} />
                                                </SelectTrigger>
                                                <SelectPortal>
                                                    <SelectBackdrop />
                                                    <SelectContent>
                                                        <SelectDragIndicatorWrapper>
                                                            <SelectDragIndicator />
                                                        </SelectDragIndicatorWrapper>
                                                        <SelectItem label="93" value="93" />
                                                        <SelectItem label="155" value="155" />
                                                        <SelectItem label="1-684" value="-1684" />
                                                    </SelectContent>
                                                </SelectPortal>
                                            </Select>
                                            <Input className="flex-1">
                                                <InputField
                                                    placeholder="89867292632"
                                                    type="text"
                                                    value={value}
                                                    onChangeText={onChange}
                                                    keyboardType="number-pad"
                                                    onBlur={onBlur}
                                                    onSubmitEditing={handleKeyPress}
                                                    returnKeyType="done"
                                                />
                                            </Input>
                                        </HStack>
                                    )}
                                />
                                <FormControlError>
                                    <FormControlErrorIcon as={AlertCircle} size="md" />
                                    <FormControlErrorText>
                                        {errors?.phoneNumber?.message}
                                    </FormControlErrorText>
                                </FormControlError>
                            </FormControl>
                        </HStack>
                        <HStack className="items-center justify-between">
                            <FormControl
                                className="w-[47%]"
                                isInvalid={(!!errors.city || isEmailFocused) && !!errors.city}
                            >
                                <FormControlLabel className="mb-2">
                                    <FormControlLabelText>City</FormControlLabelText>
                                </FormControlLabel>
                                <Controller
                                    name="city"
                                    control={control}
                                    rules={{
                                        validate: async (value) => {
                                            try {
                                                await userSchema.parseAsync({ city: value });
                                                return true;
                                            } catch (error: any) {
                                                return error.message;
                                            }
                                        },
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Select onValueChange={onChange} selectedValue={value}>
                                            <SelectTrigger variant="outline" size="md">
                                                <SelectInput placeholder="Select" />
                                                <SelectIcon className="mr-3" as={ChevronDownIcon} />
                                            </SelectTrigger>
                                            <SelectPortal>
                                                <SelectBackdrop />
                                                <SelectContent>
                                                    <SelectDragIndicatorWrapper>
                                                        <SelectDragIndicator />
                                                    </SelectDragIndicatorWrapper>
                                                    <SelectItem label="Bengaluru" value="Bengaluru" />
                                                    <SelectItem label="Udupi" value="Udupi" />
                                                    <SelectItem label="Others" value="Others" />
                                                </SelectContent>
                                            </SelectPortal>
                                        </Select>
                                    )}
                                />
                                <FormControlError>
                                    <FormControlErrorIcon as={AlertCircle} size="md" />
                                    <FormControlErrorText>
                                        {errors?.city?.message}
                                    </FormControlErrorText>
                                </FormControlError>
                            </FormControl>

                            <FormControl
                                className="w-[47%]"
                                isInvalid={(!!errors.state || isEmailFocused) && !!errors.state}
                            >
                                <FormControlLabel className="mb-2">
                                    <FormControlLabelText>State</FormControlLabelText>
                                </FormControlLabel>
                                <Controller
                                    name="state"
                                    control={control}
                                    rules={{
                                        validate: async (value) => {
                                            try {
                                                await userSchema.parseAsync({ state: value });
                                                return true;
                                            } catch (error: any) {
                                                return error.message;
                                            }
                                        },
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Select onValueChange={onChange} selectedValue={value}>
                                            <SelectTrigger variant="outline" size="md">
                                                <SelectInput placeholder="Select" />
                                                <SelectIcon className="mr-3" as={ChevronDownIcon} />
                                            </SelectTrigger>
                                            <SelectPortal>
                                                <SelectBackdrop />
                                                <SelectContent>
                                                    <SelectDragIndicatorWrapper>
                                                        <SelectDragIndicator />
                                                    </SelectDragIndicatorWrapper>
                                                    <SelectItem label="Karnataka" value="Karnataka" />
                                                    <SelectItem label="Haryana" value="Haryana" />
                                                    <SelectItem label="Others" value="Others" />
                                                </SelectContent>
                                            </SelectPortal>
                                        </Select>
                                    )}
                                />
                                <FormControlError>
                                    <FormControlErrorIcon as={AlertCircle} size="md" />
                                    <FormControlErrorText>
                                        {errors?.state?.message}
                                    </FormControlErrorText>
                                </FormControlError>
                            </FormControl>
                        </HStack>
                        <HStack className="items-center justify-between">
                            <FormControl
                                className="w-[47%]"
                                isInvalid={
                                    (!!errors.country || isEmailFocused) && !!errors.country
                                }
                            >
                                <FormControlLabel className="mb-2">
                                    <FormControlLabelText>Country</FormControlLabelText>
                                </FormControlLabel>
                                <Controller
                                    name="country"
                                    control={control}
                                    rules={{
                                        validate: async (value) => {
                                            try {
                                                await userSchema.parseAsync({ country: value });
                                                return true;
                                            } catch (error: any) {
                                                return error.message;
                                            }
                                        },
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Select onValueChange={onChange} selectedValue={value}>
                                            <SelectTrigger variant="outline" size="md">
                                                <SelectInput placeholder="Select" />
                                                <SelectIcon className="mr-3" as={ChevronDownIcon} />
                                            </SelectTrigger>
                                            <SelectPortal>
                                                <SelectBackdrop />
                                                <SelectContent>
                                                    <SelectDragIndicatorWrapper>
                                                        <SelectDragIndicator />
                                                    </SelectDragIndicatorWrapper>
                                                    <SelectItem label="India" value="India" />
                                                    <SelectItem label="Sri Lanka" value="Sri Lanka" />
                                                    <SelectItem label="Others" value="Others" />
                                                </SelectContent>
                                            </SelectPortal>
                                        </Select>
                                    )}
                                />
                                <FormControlError>
                                    <FormControlErrorIcon as={AlertCircle} size="md" />
                                    <FormControlErrorText>
                                        {errors?.country?.message}
                                    </FormControlErrorText>
                                </FormControlError>
                            </FormControl>
                            <FormControl
                                className="w-[47%]"
                                isInvalid={!!errors.zipcode || isEmailFocused}
                            >
                                <FormControlLabel className="mb-2">
                                    <FormControlLabelText>Zipcode</FormControlLabelText>
                                </FormControlLabel>
                                <Controller
                                    name="zipcode"
                                    control={control}
                                    rules={{
                                        validate: async (value) => {
                                            try {
                                                await userSchema.parseAsync({
                                                    zipCode: value,
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
                                                placeholder="Enter 6 - digit zip code"
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
                                    <FormControlErrorIcon as={AlertCircle} size="md" />
                                    <FormControlErrorText>
                                        {errors?.zipcode?.message}
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