import { View , Text} from "@/components/Themed";
import { Button } from "react-native";
import { Link } from "expo-router";
import React from "react";
 
 const index = () => {
    return (
        <View style ={{flex:1, justifyContent: 'center' , padding: 10}}>
            <Link href={'/(user)'} asChild>
                <Button title ="User" />
            </Link>
            <Link href={'/(admin)'} asChild>
                <Button title ='Admin'/>
            </Link>
        </View>
    );
 };

 export default index;