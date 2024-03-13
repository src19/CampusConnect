import { View} from 'react-native'; 
import events from '@/assets/data/events';
import EventList from '@/components/EventList';

export default function MenuScreen() {
  return(
    <View>
      <EventList event = {events[0]}/>
      <EventList event = {events[1]}/> 
    </View>
  );
};