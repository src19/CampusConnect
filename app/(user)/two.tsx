import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Button } from 'react-native-elements';
import { supabase } from '@/lib/supabase';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Button title='Sign-Out' onPress={async () => await supabase.auth.signOut()}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
