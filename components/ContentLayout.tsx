import LoadingSpinner from "@/components/LoadingSpinner";
import { SafeAreaView, View } from "react-native";


export default function ContentLayout(props: any) {

    if (!props.data) {
        return <LoadingSpinner />
    } else {
        return (
            <SafeAreaView className="w-full h-full bg-white">
                <View className="w-full h-full pt-5">
                    {props.children}
                </View>
            </SafeAreaView>
        );
    }

}