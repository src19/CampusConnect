import { View, FlatList, ActivityIndicator, Text} from 'react-native'; 
import EventList from '@/components/EventList';
import { useEventsList } from '@/api/events';

export default function EventsScreen() {

  const {data: events,error,isLoading} = useEventsList();
  if(isLoading){
    return <ActivityIndicator/>;
  }
  if(error){
    return <Text>Failed to fetch event</Text>;
  }

  return(
      <FlatList 
      data={events}
      renderItem={({item}) => <EventList event = {item}/>}
      />
  );
};