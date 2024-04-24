import { View, Text , Image , TouchableOpacity, StyleSheet} from 'react-native'
import React, { useState } from 'react'
import { Redirect } from 'expo-router';

export default function onboarding() {
    const [shouldRedirect, setShouldRedirect] = useState(false);
    return (
      <View style={styles.container}>
        <Image source={require('@/assets/images/login.png')} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>Campus Connect</Text>
          <Text style={styles.description}>
            A One Stop app for all events in SRM where you can create or view all
            events occuring on campus
          </Text>
          <TouchableOpacity onPress={() => setShouldRedirect(true)} style={styles.button}>
            <Text style={styles.buttonText}>Start Now</Text>
          </TouchableOpacity>
        </View>
        {shouldRedirect && <Redirect href="/(auth)/signin" />}
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      width: '100%',
      height: 400,
      resizeMode: 'cover',
    },
    content: {
        padding: 20,
    },
    title: {
      fontSize: 25,
      fontWeight: 'bold',
    },
    description: {
      fontSize: 16,
      marginTop: 6,
    },
    button: {
      backgroundColor: '#9932CC',
      padding: 15,
      marginTop: 100,
      borderRadius: 100,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 18,
    },
  });

