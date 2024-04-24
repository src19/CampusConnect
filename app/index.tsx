import { View , Text} from "@/components/Themed";
import { ActivityIndicator, Button} from "react-native";
import { Link, Redirect } from "expo-router";
import React from "react";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/lib/supabase";
 
 const index = () => {
    const {session, loading, isAdmin} = useAuth();

    if(loading){
        return  <ActivityIndicator />;
    }

    if(!session){
        return <Redirect href={'/onboarding'} />;
    }

    if(!isAdmin){
        return <Redirect href={'/(user)'} />;
    }

    return (
        <View style ={{flex:1, justifyContent: 'center' , padding: 10}}>
            <Link href={'/(user)'} asChild>
                <Button title ="User" />
            </Link>
            <Link href={'/(admin)'} asChild>
                <Button title ='Admin'/>
            </Link>
            <Button title='Sign-Out' onPress={() => supabase.auth.signOut()}/>
        </View>
        // <Redirect href={'/(admin)'} />
    );
 };
 
 export default index;