import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function EventsStack () {
    return(
    <Stack>
        <Stack.Screen 
        name="index" 
        options={{
            title:'Event',
            headerRight: () => (
                <Link href ="/(admin)/event/create" asChild>
                    <Pressable>
                        {({ pressed }) => (
                            <FontAwesome
                            name="plus-square-o"
                            size={25}
                            color={Colors.light.tint}
                            />
                        )} 
                    </Pressable>
                </Link>
            )
        }}
        />

        <Stack.Screen 
        name="[id]" 
        options={{
            title:'Event',
            headerRight: () => (
                <Link href ="/(admin)/event/create" asChild>
                    <Pressable>
                        {({ pressed }) => (
                            <FontAwesome
                            name="pencil"
                            size={25}
                            color={Colors.light.tint}
                            />
                        )} 
                    </Pressable>
                </Link>
            )
        }}
        />
    </Stack>
    )
}