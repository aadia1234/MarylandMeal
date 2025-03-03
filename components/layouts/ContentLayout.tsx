import { SafeAreaView } from "react-native-safe-area-context";
import LoadingSpinner from "../widgets/LoadingSpinner";
import { View } from "react-native";


export default function ContentLayout(props: any) {

    // use skeleton instead! (maybe!)
    if (!props.data) {
        return <LoadingSpinner />
    } else {
        return (
            <SafeAreaView edges={["top", "left", "right"]} className="w-full h-full bg-zinc-100">
                <View className="w-full h-full pt-5">
                    {props.children}
                </View>
            </SafeAreaView>
        );
    }

}