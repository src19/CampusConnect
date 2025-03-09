import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import EventList from './EventList'; // Assuming the EventList component is in a separate file

const Searchbar = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={handleSearch}
                placeholder="Search by event name"
            />
            <EventList searchQuery={searchQuery} onSearch={handleSearch} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
});

export default Searchbar;
