import { View, Text } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'

const EventDetails = () => {
  const {id} = useLocalSearchParams();
  return (
    <View>
      <Stack.Screen options={{title : 'Details: ' + id}}/>
      <Text>These are the details of the event {id}</Text>
    </View>
  );
};

export default EventDetails;