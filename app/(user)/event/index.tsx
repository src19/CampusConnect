import { View, FlatList, ActivityIndicator, Text} from 'react-native'; 
import EventList from '@/components/EventList';
import { useEventsList } from '@/api/events';
import { useDeleteEventSubscription, useInsertEventSubscription } from '@/api/events/subscriptions';

export default function EventsScreen() {

  const {data: events,error,isLoading} = useEventsList();

  useInsertEventSubscription();
  useDeleteEventSubscription();

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