import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { Center } from "@/components/ui/center";
import CircularProgress from 'react-native-circular-progress-indicator';
import React from "react";
import { View } from "./ui/view";

export default function MacroCard(props: any) {
    return (
        <Card variant="outline" className="rounded-lg w-fit h-fit grow p-2">
            <Center className="aspect-video ">
                <Center className="">
                    <CircularProgress
                        value={props.num}
                        radius={35}
                        duration={2000}
                        progressValueColor={'black'}
                        activeStrokeColor={'#f15164'}
                        activeStrokeWidth={7.5}
                        inActiveStrokeWidth={7.5}
                        maxValue={200}
                        valueSuffix="g"
                        title={props.text}
                        titleColor={'black'}
                        titleStyle={{ fontWeight: 'bold' }}
                    />
                </Center>
            </Center>
        </Card>
    );
};