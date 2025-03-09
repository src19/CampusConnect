import { View, Text, Pressable, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import events from '@/assets/data/events';
import { useEvent } from '@/api/events';
import { useUpdateEventSubscription } from '@/api/events/subscriptions';
import RemoteImage from '@/components/RemoteImage';

const EventDetails = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);
  const { data: event, error, isLoading } = useEvent(id);
  useUpdateEventSubscription();

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch event</Text>;
  }

  const handleRegisterPress = () => {
    // Use Linking to open the URL in the device's default browser
      Linking.openURL(event.reg_link);
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Stack.Screen options={{ title: event?.eventname }} />
      <RemoteImage
        path={event?.image}
        fallback='https://cdn.dribbble.com/users/55871/screenshots/2158022/media/95f08ed3812af28b93fa534fb5d277b3.jpg'
        style={styles.image} // Use a different style name for clarity
      />
      <Text style={styles.description}>Event : {event.eventname}</Text>
      <Text style={styles.description}>ClubName : {event.clubname}</Text>
      <Text style={styles.description}>Venue : {event.venue}</Text>
      <Text style={styles.description}>Date: {event.date}</Text>
      <Text style={styles.description}>Time: {event.time}</Text>
      {/* <Text style={styles.description}>{event.description}</Text> */}
      <View style={styles.registerview}>
        <TouchableOpacity onPress= {handleRegisterPress} style={styles.button}>
          <Text style={styles.buttonText}>{'Register'}</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  image: {
    width: '100%', // Maintain full width
    aspectRatio: 1, // Maintain square aspect ratio (adjust if needed)
    borderRadius: 5, // Add a slight border radius for aesthetics
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    padding: 4,
    marginTop: 10,
  },
  registerview: {
    padding : 6,
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#ba64d9',
    padding: 15,
    borderRadius: 100,
    width: '70%', // Adjust the width as needed
    alignItems: 'center', 
  },
  buttonText: {
    color: '#ffffff', // Text color
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default EventDetails;