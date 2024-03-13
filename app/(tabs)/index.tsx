import { View, FlatList} from 'react-native'; 
import events from '@/assets/data/events';
import EventList from '@/components/EventList';

export default function MenuScreen() {
  return(
      <FlatList 
      data={events}
      renderItem={({item}) => <EventList event = {item}/>}
      />
  );
};