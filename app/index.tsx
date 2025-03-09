import { View , Text} from "@/components/Themed";
import { ActivityIndicator, Button} from "react-native";
import { Link, Redirect } from "expo-router";
import React, { useEffect } from "react";
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
        return <Redirect href={'/(user)/event'} />;
    }
    
    return (
        <Redirect href={'/(admin)/event'} />
    );
 };
 
 export default index;