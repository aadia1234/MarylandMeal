import React, { useRef, useState } from "react";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import {
    AlertCircleIcon,
    CloseIcon,
    Icon,
} from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import {
    Modal,
    ModalBackdrop,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
} from "@/components/ui/modal";
import { Input, InputField } from "@/components/ui/input";
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
import { Grid, GridItem } from "./ui/grid";
import { z } from "zod";
import { updateName } from "@/api/updateSession";

const userSchema = z.object({
    firstName: z
        .string()
        .min(1, "First name is required")
        .max(50, "First name must be less than 50 characters"),
    lastName: z
        .string()
        .min(1, "Last name is required")
        .max(50, "Last name must be less than 50 characters"),
    // oldPassword: z
    //     .string()
    //     .min(1, "Old password is required")
    //     .max(50, "Old password must be less than 50 characters"),
    // newPassword: z
    //     .string()
    //     .min(1, "New Password is required")
    //     .max(50, "New password must be less than 50 characters"),
});

type userSchemaDetails = z.infer<typeof userSchema>;

export default function EditProfile({ update, showModal, setShowModal }: { update: any, showModal: boolean; setShowModal: any; }) {
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
        const didUpdate = await updateName(name);
        
        if (didUpdate) {
            setShowModal(false);
            reset();
            update(true);
            // show successful message
        } else {
            // show error message
        }

    };

    const inputs: { name: string, controllerName: "firstName" | "lastName" }[] = [
        { name: "First Name", controllerName: "firstName" },
        { name: "Last Name", controllerName: "lastName" },
        // { name: "Old Password", controllerName: "oldPassword" },
        // { name: "New Password", controllerName: "newPassword" }
    ];

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
            <ModalContent className="rounded-2xl">
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
                <ModalBody className="mt-10 mb-0">
                    <VStack space="2xl">
                        <Grid className="gap-y-4 gap-x-4" _extra={{ className: "grid-cols-2" }}>
                            {
                                inputs.map(({ name, controllerName }, index) => {
                                    return (
                                        <GridItem _extra={{
                                            className: "col-span-1",
                                        }} key={index}>
                                            <FormControl
                                                isInvalid={!!errors.firstName || isNameFocused}
                                                className="w-full"
                                            >
                                                <FormControlLabel className="mb-2">
                                                    <FormControlLabelText>{name}</FormControlLabelText>
                                                </FormControlLabel>
                                                <Controller
                                                    name={controllerName}
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
                                                        <Input className="rounded-lg">
                                                            <InputField
                                                                placeholder={name}
                                                                type={controllerName.includes("Password") ? "password" : "text"}
                                                                value={value}
                                                                onChangeText={onChange}
                                                                onBlur={onBlur}
                                                                onSubmitEditing={handleKeyPress}
                                                                selectionColor="rgb(225, 25, 50)"
                                                                returnKeyType="done"
                                                            />
                                                        </Input>
                                                    )}
                                                />
                                                <FormControlError>
                                                    <FormControlErrorIcon as={AlertCircleIcon} size="md" />
                                                    <FormControlErrorText>
                                                        {/* not working  */}
                                                        {errors[controllerName]?.message}
                                                    </FormControlErrorText>
                                                </FormControlError>
                                            </FormControl>
                                        </GridItem>
                                    );
                                })
                            }
                        </Grid>
                        <Button className="rounded-lg" onPress={() => { handleSubmit(onSubmit)() }}>
                            <ButtonText>
                                Save Changes
                            </ButtonText>
                        </Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};