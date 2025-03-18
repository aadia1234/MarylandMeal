import React, { useState } from "react";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { LinkText } from "@/components/ui/link";
import Link from "@unitools/link";
import { router } from "expo-router";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import {
  ArrowLeftIcon,
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  Icon,
} from "@/components/ui/icon";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Keyboard } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle } from "lucide-react-native";
import { Pressable } from "@/components/ui/pressable";
import AuthLayout from "../../components/layouts/AuthLayout";
import { register } from "@/api/authenticateSession";
import { Center } from "@/components/ui/center";
import { Image } from "@/components/ui/image";

const signUpSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z
    .string()
    .min(6, "Must be at least 8 characters in length")
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*\\d.*"), "One number")
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      "One special character"
    ),
  confirmpassword: z
    .string()
    .min(6, "Must be at least 8 characters in length")
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*\\d.*"), "One number")
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      "One special character"
    ),
  rememberme: z.boolean().optional(),
});
type SignUpSchemaType = z.infer<typeof signUpSchema>;

const SignUpView = () => {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const handleConfirmPwState = () => {
    setShowConfirmPassword((showState) => {
      return !showState;
    });
  };

  const handleKeyPress = () => {
    Keyboard.dismiss();
    handleSubmit(onSubmit)();
  };

  const onSubmit = (data: SignUpSchemaType) => {
    if (data.password === data.confirmpassword) {
      toast.show({
        placement: "bottom right",
        render: ({ id }) => {
          return (
            <Toast nativeID={id} variant="solid" action="success">
              <ToastTitle>Success</ToastTitle>
            </Toast>
          );
        },
      });
      register("first last", data.email, data.password);
      reset();
    } else {
      toast.show({
        placement: "bottom right",
        render: ({ id }) => {
          return (
            <Toast nativeID={id} variant="solid" action="error">
              <ToastTitle>Passwords do not match</ToastTitle>
            </Toast>
          );
        },
      });
    }
  };


  return (
    <VStack className="max-w-[440px] w-full h-full" space="md">
      <HStack className="items-center justify-between w-full">
        <Pressable onPress={() => { router.back(); }} >
          <Icon
            as={ArrowLeftIcon}
            className="md:hidden stroke-background-800"
            size="xl"
          />
        </Pressable>
        <Heading size="xl" numberOfLines={1} className="max-w-[80%]">Sign up</Heading>
        <Icon
          as={undefined}
          size="xl"
        />
      </HStack>
      <VStack className="w-full h-fit">
        <VStack className="items-center justify-center my-10" space="md">
          <Image
            size="xl"
            source={require("../../assets/images/MarylandMeal.png")}
            alt="MarylandMeals"
            className="rounded-3xl"
          />
          <Heading size="3xl" numberOfLines={1} className="text-primary-500">MarylandMeals</Heading>
        </VStack>


        <VStack space="xl" className="w-full">
          <VStack space="4xl">
            <FormControl isInvalid={!!errors.email}>
              <FormControlLabel>
                <FormControlLabelText>Email</FormControlLabelText>
              </FormControlLabel>
              <Controller
                name="email"
                defaultValue=""
                control={control}
                rules={{
                  validate: async (value) => {
                    try {
                      await signUpSchema.parseAsync({ email: value });
                      return true;
                    } catch (error: any) {
                      return error.message;
                    }
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="rounded-lg">
                    <InputField
                      placeholder="Email"
                      type="text"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      onSubmitEditing={handleKeyPress}
                      returnKeyType="done"
                      selectionColor="#E11932"
                      className="text-md"
                    />
                  </Input>
                )}
              />
              <FormControlError>
                <FormControlErrorIcon size="md" as={AlertTriangle} />
                <FormControlErrorText>
                  {errors?.email?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
            <FormControl isInvalid={!!errors.password}>
              <FormControlLabel>
                <FormControlLabelText>Password</FormControlLabelText>
              </FormControlLabel>
              <Controller
                defaultValue=""
                name="password"
                control={control}
                rules={{
                  validate: async (value) => {
                    try {
                      await signUpSchema.parseAsync({
                        password: value,
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
                      placeholder="Password"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      onSubmitEditing={handleKeyPress}
                      returnKeyType="done"
                      type={showPassword ? "text" : "password"}
                      selectionColor="#E11932"
                      className="text-md"
                    />
                    <InputSlot onPress={handleState} className="pr-3">
                      <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                    </InputSlot>
                  </Input>
                )}
              />
              <FormControlError>
                <FormControlErrorIcon size="sm" as={AlertTriangle} />
                <FormControlErrorText>
                  {errors?.password?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
            <FormControl isInvalid={!!errors.confirmpassword}>
              <FormControlLabel>
                <FormControlLabelText>Confirm Password</FormControlLabelText>
              </FormControlLabel>
              <Controller
                defaultValue=""
                name="confirmpassword"
                control={control}
                rules={{
                  validate: async (value) => {
                    try {
                      await signUpSchema.parseAsync({
                        password: value,
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
                      placeholder="Confirm Password"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      onSubmitEditing={handleKeyPress}
                      returnKeyType="done"
                      type={showConfirmPassword ? "text" : "password"}
                      selectionColor="#E11932"
                      className="text-md"
                    />

                    <InputSlot onPress={handleConfirmPwState} className="pr-3">
                      <InputIcon
                        as={showConfirmPassword ? EyeIcon : EyeOffIcon}
                      />
                    </InputSlot>
                  </Input>
                )}
              />
              <FormControlError>
                <FormControlErrorIcon size="sm" as={AlertTriangle} />
                <FormControlErrorText>
                  {errors?.confirmpassword?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
          </VStack>
        </VStack>

        <VStack className="w-full my-10" space="lg">
          <Button className="w-full rounded-lg" onPress={handleSubmit(onSubmit)}>
            <ButtonText className="font-medium">Sign up</ButtonText>
          </Button>
          <Button
            variant="outline"
            action="secondary"
            className="w-full gap-1 rounded-lg"
            onPress={() => { }}
          >
            <ButtonText className="font-medium">
              Continue with Google
            </ButtonText>
            {/* <ButtonIcon as={GoogleIcon} /> */}
          </Button>
        </VStack>
        <HStack className="self-center" space="sm">
          <Text size="md">Already have an account?</Text>
          <Button variant="link" className="h-6" onPress={() => router.replace("/auth/login")}>
            <ButtonText>Log in</ButtonText>
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default function Signup() {
  return (
    <AuthLayout>
      <SignUpView />
    </AuthLayout>
  );
}
