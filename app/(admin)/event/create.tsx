import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView , Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useInsertEvent } from '@/api/events';


const CreateProductScreen = () => {
    const [clubname, setclubname] = useState('');
    const [eventname, seteventname] = useState('');
    const [venue, setvenuename] = useState('');
    const [Errors,setErrors] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [date, setDate] = useState(new Date()); 
    const [mode, setMode] = useState('date');
    const [time, setTime] = useState(date.toLocaleTimeString());
    const [showPicker, setShowPicker] = useState(false); 

    
    const {id} = useLocalSearchParams();
    const isupdating = !!id;
    const displayDate = date.toLocaleDateString(); 
    const displayTime = date.toLocaleTimeString(); 

    const { mutate: insertEvent } = useInsertEvent();

    useEffect(() => {
        setTime(date.toLocaleTimeString()); // Update time whenever date changes
      }, [date]);

    const validInput = () => {
        setErrors('');
        if(!eventname) {
            setErrors('Event name is required');
            return false;
        }
        if(!clubname) {
            setErrors('Club name is required');
            return false;
        }
        if(!venue) {
            setErrors('Venue is required');
            return false;
        }
        return true;
    };
    const onChange = (event, selectedValue) => {
        const currentDate = selectedValue || date;
        setDate(currentDate);
        setShowPicker(false); 
    };
    const showMode = (currentMode) => {
        setShowPicker(true);
        setMode(currentMode);
    };
        

    const onSubmit = () => {
        if(isupdating){
            onUpdate();
        }
        else{
            onCreate();
        }
    };
    const onDelete = () => {
        console.warn('DELETE');
    }
    const confirmDelete = () => {
        Alert.alert("Confirm", "Are you sure you want to delete this event", [
            {
                text: 'Cancel'
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: onDelete,

            }
        ])
    }

    const onUpdate = () => {
        if(!validInput()) return;
        console.warn("Updating event", eventname)
        //store in database
        resetFields();  
    };

    const eventData = {
        eventname,
        clubname,
        venue,
        date,
        time,
      };

    const onCreate = () => {
        if(!validInput()) return;
        console.warn("creating event", eventname)
        //store in database
        insertEvent(eventData)
        resetFields();  
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

    const resetFields = () => {
        setclubname('');
        seteventname('');
        setvenuename('');
    };
    return (
    <ScrollView>
    <View style={styles.container}>
        <Stack.Screen options={{title: isupdating ? 'Update Event' : 'Create Event'}}/>
        <Image 
        source={{uri: image || 'https://cdn.dribbble.com/users/55871/screenshots/2158022/media/95f08ed3812af28b93fa534fb5d277b3.jpg'}}
        style = {styles.imageplaceholder}
        />
        <Text onPress={pickImage} style = {styles.imgbtn}>Select Image</Text>
        <Text style = {styles.label}>Event Name</Text>
        <TextInput 
            placeholder='Event Name'
            value={eventname}
            onChangeText={seteventname}
            style={styles.input}/>
        <Text style = {styles.label}>Club Name</Text>
        <TextInput 
        placeholder='Club Name' 
        style={styles.input}
        value={clubname}
        onChangeText={setclubname}
        />

        <Text style = {styles.label}>Venue</Text>
        <TextInput 
        placeholder='Venue' 
        style={styles.input}
        value={venue}
        onChangeText={setvenuename}
        />
        <Text style = {styles.label}>Date</Text>
        <Text onPress={() => showMode('date')} style={styles.input}>
            {displayDate}
        </Text>
        <Text style = {styles.label}>Time</Text>
        <Text onPress={() => showMode('time')} style={styles.input}>
            {displayTime}
        </Text>
        {showPicker && (
        <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={mode} 
        is24Hour={true} 
        display="default" // Can be "clock" or "spinner" (platform-dependent)
        onChange={onChange}
        />
        )}
        <Text style={{color: 'red'}}>{Errors}</Text>
        <TouchableOpacity onPress={onSubmit} style={styles.createbtn}>
            <Text style={styles.btntext}>{isupdating ? 'Update' : 'Create'}</Text>
        </TouchableOpacity>
        {isupdating && <Text onPress={confirmDelete} style={styles.deltext}>Delete</Text>}
    </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        padding: 10
    },
    input:{
        backgroundColor: 'white',
        padding: 10,
        borderRadius:5,
        marginBottom:20,
        marginTop:5
    },
    label:{
        color:'grey',
        fontSize:17
    },
    createbtn:{
        borderRadius:20,
        padding: 10,
        backgroundColor: Colors.light.tint,
    },
    btntext: {
        color:'white',
        textAlign:'center'
    },
    deltext: {
        color:'red',
        textAlign:'center'
    },
    imgbtn: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10
    },
    imageplaceholder: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center'
    }
})

export default CreateProductScreen;