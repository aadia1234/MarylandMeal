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
import Tabbar from "./(tabs)/tabbar";
import React from "react";
import Home from "./(tabs)/home/home";
import { Box } from "lucide-react-native";

export default function Index() {
  return <Redirect href="/tabbar"></Redirect>;
}
