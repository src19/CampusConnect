import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";

const customActiveTintColor = '#ba64d9'

export default function EventsStack () {
    return(
    <Stack>
        <Stack.Screen 
        name="index" 
        options={{
            title:'Events',
            headerRight: () => (
                <Link href ="/(admin)/event/create" asChild>
                    <Pressable>
                        {({ pressed }) => (
                            <FontAwesome
                            name="plus-square-o"
                            size={25}
                            color={customActiveTintColor}
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