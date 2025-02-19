import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { Center } from "@/components/ui/center";
import CircularProgress from 'react-native-circular-progress-indicator';
import React from "react";
import { View } from "./ui/view";

export default function MacroCard({ macro, target, consumed, preview }: { macro: string, target: number, consumed: number, preview?: number }) {
    if (preview == undefined) {
        preview = 0;
    }


    console.log("Macro:", macro, ", target:", target, ", consumed:", consumed, ", preview:", preview);

    function strokeColor() {
        const ratio = consumed / target;
        const color = 255 * ratio;
        const green = color <= 255 ? color : 255;
        const red = 255 - green;
        return `rgb(${red}, ${green}, 0)`
    }
    return (
        <Card variant="elevated" className="rounded-md w-full h-fit grow p-2 m-auto">
            <Center className="aspect-video m-auto">
                <Center className="w-fit">
                    <View style={{ position: 'relative', width: 70, height: 70 }}>
                        <View style={{ position: 'absolute', top: 0, left: 0 }}>
                            
                            {/* Preview Progress Circle */}
                            {/* TODO: change text inside circle? currently showing old value w/o preview */}
                            <CircularProgress
                                value={(preview + consumed)}
                                radius={35}
                                duration={0}
                                progressValueColor={'transparent'}
                                activeStrokeColor={'pink'}
                                activeStrokeWidth={5}
                                inActiveStrokeWidth={5}
                                maxValue={target}
                            />
                        </View>
                        <View style={{ position: 'absolute', top: 0, left: 0 }}>
                            {/* Original Progress Circle */}
                            <CircularProgress
                                value={consumed}
                                radius={35}
                                duration={1000}
                                progressValueColor={'black'}
                                activeStrokeColor={strokeColor()}
                                activeStrokeWidth={5}
                                inActiveStrokeWidth={5}
                                inActiveStrokeColor="transparent"
                                maxValue={target}
                                valueSuffix="g"
                                title={macro}
                                titleColor={'black'}
                                titleStyle={{ fontWeight: 'bold' }}
                            />
                        </View> 
                    </View>
                </Center>
            </Center>
        </Card>
    );
};