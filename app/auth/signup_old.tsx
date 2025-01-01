"use client";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import register from "../../scripts/createUser.mjs";
import axios from "axios";
import { TextInput, View } from "react-native";
import NavButton from "@/components/NavButton";
import * as api from "@/api/session";
import { Center } from "@/components/ui/center";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";


export default function Signup() {
    const [error, setError] = useState<string>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function submit() {
        api.register("test", "test2", email, password);
    }


    return (
      <View>
        <Center>
          <Box className="p-5 max-w-96 border border-background-300 rounded-lg">
            <VStack className="pb-4" space="xs">
              <Heading className="leading-[30px]">Signup</Heading>
              <Text className="text-sm">
                Almost done. Enter your new password and you are all set.
              </Text>
            </VStack>
            <VStack space="xl" className="py-2">
              <Input>
                <InputField className="py-2" placeholder="Email address" />
              </Input>
              <Input>
                <InputField
                  className="py-2"
                  placeholder="Password"
                />
              </Input>
            </VStack>
            <VStack space="lg" className="pt-4">
              <Button size="sm" action="positive">
                <ButtonText>Submit</ButtonText>
              </Button>
              <Box className="flex flex-row">
                <Button variant="link" size="sm" className="p-0" onPress={submit}>
                  {/* <ButtonIcon className="mr-1" size="md" as={ArrowLeftIcon} /> */}
                  <ButtonText>Back to login</ButtonText>
                </Button>
              </Box>
            </VStack>
          </Box>
        </Center>
      </View>
    );
}

