import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { Center } from "@/components/ui/center";
import CircularProgress from 'react-native-circular-progress-indicator';
import React from "react";
import { View } from "./ui/view";

export default function MacroCard({ macro, target, consumed }: { macro: string, target: number, consumed: number }) {
    return (
        <Card variant="outline" className="rounded-lg w-full h-fit grow p-2 m-auto">
            <Center className="aspect-video m-auto">
                <Center className="w-fit">
                    <CircularProgress
                        value={consumed}
                        radius={35}
                        duration={2000}
                        progressValueColor={'black'}
                        activeStrokeColor={'#f15164'}
                        activeStrokeWidth={5}
                        inActiveStrokeWidth={5}
                        maxValue={target}
                        valueSuffix="g"
                        title={macro}
                        titleColor={'black'}
                        titleStyle={{ fontWeight: 'bold' }}
                    />
                </Center>
            </Center>
        </Card>
    );
};