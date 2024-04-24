import { View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { useEvent } from '@/api/events';
import { useUpdateEventSubscription } from '@/api/events/subscriptions';

const EventDetails = () => {
  const {id: idString} = useLocalSearchParams();
  const id = parseFloat(typeof idString =='string' ? idString : idString[0]);
  const {data: event, error, isLoading} = useEvent(id);
  useUpdateEventSubscription();

  if(isLoading){
    return <ActivityIndicator/>;
  }
  if(error){
    return <Text>Failed to fetch event</Text>;
  }

  return (
    <View style = {styles.container}>
      <Stack.Screen options={{title : event?.eventname}}/>
      <Image 
      source = {{uri: event.image || 'https://cdn.dribbble.com/users/55871/screenshots/2158022/media/95f08ed3812af28b93fa534fb5d277b3.jpg'}}
      style={styles.img}
      resizeMode='contain'
      />
      <Text style={styles.description}>Event : {event.eventname}</Text>
      <Text style={styles.description}>ClubName : {event.clubname}</Text>
      <Text style={styles.description}>Venue(Timings and location) : {event.venue}</Text>
      <Text style={styles.description}>Date: {event.date}</Text>
      <Text style={styles.description}>Time: {event.time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    flex:1,
  },
  img : {
    width:'100%',
    aspectRatio:1
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    padding:8,
    marginTop: 10

  }
})

export default EventDetails;