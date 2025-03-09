import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native'
import React, { useState } from 'react'
import { Link, Stack } from 'expo-router'
import Colors from '@/constants/Colors';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';

const signin = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);
    
    async function Signinwithemail () {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword( { email, password } );
        if (error) {
            Alert.alert('Sign In Failed', error.message);
        }
        
        setLoading(false);
    };

    return (
    <View style={styles.container}>
        <Stack.Screen options={{title:'Sign-In'}}/>
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
        <TouchableOpacity onPress= {Signinwithemail} disabled={loading} style={styles.signinbtn}>
            <Text style={styles.btntext}>{loading ? 'Signing In' : 'Sign In'}</Text>
        </TouchableOpacity>
        <Link href="/(auth)/signup" style={styles.textButton}>
        Create an account
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
        marginTop:10,
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

export default signin