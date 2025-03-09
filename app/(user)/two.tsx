import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '@/providers/AuthProvider'; // Import the useAuth hook
import { supabase } from '@/lib/supabase';

const Settings = () => {
    const { session, profile } = useAuth(); // Access session and profile from the AuthProvider
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (profile) {
            setUsername(profile.username || '');
            setFullName(profile.full_name || '');
        }
    }, [profile]);

    const updateProfile = async () => {
        try {
            setLoading(true);
            if (!session?.user?.id) {
                throw new Error('User details not found');
            }

            // Update profile
            const { error } = await supabase
                .from('profiles')
                .update({ username, full_name: fullName })
                .eq('id', session.user.id);

            if (error) {
                throw error;
            }

            Alert.alert('Success', 'Profile updated successfully');
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        try {
            setLoading(true);
            await supabase.auth.signOut();
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                value={session?.user?.email || ''}
                editable={false}
            />

            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Enter username"
            />

            <Text style={styles.label}>Full Name</Text>
            <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter full name"
            />

            <TouchableOpacity
                style={styles.button}
                onPress={updateProfile}
                disabled={loading}
            >
                <Text style={styles.buttonText}>{loading ? 'Updating Profile...' : 'Update Profile'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={handleSignOut}
                disabled={loading}
            >
                <Text style={styles.buttonText}>{loading ? 'Signing Out...' : 'Sign Out'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#ba64d9',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Settings;
