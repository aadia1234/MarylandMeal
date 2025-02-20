import LoadingSpinner from "@/components/LoadingSpinner";
import { SafeAreaView, View } from "react-native";


export default function ContentLayout(props: any) {

    // use skeleton instead! (maybe!)
    if (!props.data) {
        return <LoadingSpinner />
    } else {
        return (
            <SafeAreaView className="w-full h-full bg-zinc-100">
                <View className="w-full h-full pt-5">
                    {props.children}
                </View>
            </SafeAreaView>
        );
    }

}