import { useAuth } from "@/providers/AuthProvider";
import { Redirect, Stack } from "expo-router";

export default function AuthFlow() {
    const {session} = useAuth();

    if(session){
        return <Redirect href={'/'}/>
    }
    return (
    <Stack>
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
    </Stack>
    )
};