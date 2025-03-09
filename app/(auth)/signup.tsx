import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native'
import React, { useState } from 'react'
import { Link, Stack } from 'expo-router'
import Colors from '@/constants/Colors';
import { supabase } from '@/lib/supabase';

const signup = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);
    
    async function Signupwithemail () {
        setLoading(true);
        const { error } = await supabase.auth.signUp( { email, password } );
        if (error) Alert.alert(error.message);
        setLoading(false);
    } 

    return (
    <View style={styles.container}>
        <Stack.Screen options={{title:'Sign-Up'}}/>
        <Text style={styles.text}>Email</Text>
        <TextInput
        value = {email}
        onChangeText={setEmail}
        placeholder='xyz@srmist.edu.in'
        style={styles.input}
        />
        <Text style={styles.text}>Password</Text>
        <TextInput 
        value={password}
        onChangeText={setPassword}
        placeholder=''
        secureTextEntry
        style={styles.input}
        />
        <TouchableOpacity onPress={Signupwithemail} disabled={loading} style={styles.signinbtn}>
            <Text style={styles.btntext}>{loading ? 'Creating Account' : 'Create Account'}</Text>
        </TouchableOpacity>
        <Link href="/(auth)/signin" style={styles.textButton}>
        Sign In
        </Link>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        padding:20,
    },
    text:{
        color:'grey'
    },
    input:{
        borderWidth:1,
        backgroundColor:'white',
        marginTop:5,
        marginBottom:20,
        borderRadius:5,
        padding: 10
    },
    signinbtn: {
        borderRadius:20,
        padding: 10,
        marginTop:20,
        marginBottom:5,
        backgroundColor: '#ba64d9',
    },
    btntext: {
        color:'white',
        textAlign:'center'
    },
    textButton : {
        alignSelf: 'center',
        color: '#ba64d9',
        marginVertical: 10
    }

})

export default signup