import { Theme } from "@/constants/Colors";
import { Text, View, Image, StyleSheet } from "react-native";
import { useRef } from "react";
import NavButton from "../components/NavButton";
// import type { NavigationProps } from "./_layout";
import { Link, Redirect, router, useNavigation } from "expo-router";
import registerUser from "../scripts/createUser.mjs";
import axios from "axios";
import Welcome from "./auth/welcome";
import "global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Button, ButtonGroup, ButtonText } from "@/components/ui/button";

export default function Index() {
  return <Redirect href="/home"></Redirect>;
}
