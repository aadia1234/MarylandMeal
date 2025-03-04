import Allergen from "@/interfaces/Allergen";
import { HStack } from "../ui/hstack";
import { createIcon, Icon } from "../ui/icon";
import { Text } from "../ui/text";
import { Path } from "react-native-svg";
import { Center } from "../ui/center";



const allergenIcon = (symbol: string, color: string) => {
    const radius = 12;

    const icon = createIcon({
        viewBox: "0 0 32 32",
        path: (
            <>
                <Path
                    d={`M 16 16 m -${radius}, 0 a ${radius},${radius} 0 1,0 ${2 * radius},0 a ${radius},${radius} 0 1,0 -${2 * radius},0`}
                    fill={color}
                    stroke={color}
                    strokeWidth="2"
                />
            </>
        ),
    })

    return icon;
}

export default function AllergenView({ name, symbol, color, size, className }: Allergen & { size?: string, className?: string }) {
    return (
        size === "sm" ?
            <Center className={className}>
                <Icon
                    as={allergenIcon(symbol, color)}
                    className="aspect-square p-4"
                    size="xl"
                />
                {/* <Text className="">{name}</Text> */}
                <Text size="sm" className="absolute font-bold text-white">{symbol}</Text>
            </Center>
            :
            <HStack space="md" className={"w-fit items-center" + className}>
                <Center>
                    <Icon
                        as={allergenIcon(symbol, color)}
                        className="aspect-square p-4"
                        size="xl"
                    />
                    <Text size="sm" className="absolute font-bold text-white">{symbol}</Text>
                </Center>
                <Text className="my-auto">{name}</Text>
            </HStack>
    );
}