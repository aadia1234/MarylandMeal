import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { Center } from "@/components/ui/center";
import CircularProgress from 'react-native-circular-progress-indicator';
import React from "react";
import { View } from "./ui/view";

export default function MacroCard(props: { macro: string, amount: number }) {
    return (
        <Card variant="outline" className="rounded-lg w-full h-fit grow p-2 m-auto">
            <Center className="aspect-video m-auto">
                <Center className="w-fit">
                    <CircularProgress
                        value={props.amount}
                        radius={35}
                        duration={2000}
                        progressValueColor={'black'}
                        activeStrokeColor={'#f15164'}
                        activeStrokeWidth={5}
                        inActiveStrokeWidth={5}
                        maxValue={200}
                        valueSuffix="g"
                        title={props.macro}
                        titleColor={'black'}
                        titleStyle={{ fontWeight: 'bold' }}
                    />
                </Center>
            </Center>
        </Card>
    );
};