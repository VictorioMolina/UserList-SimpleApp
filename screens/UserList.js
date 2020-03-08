import React from 'react'
import {
    Text,
    View,
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import uuid from 'uuid';
import UserService from '../utils/api'

const keyExtractor = () => {
    return uuid.v4()
}

export default class UserList extends React.Component {
    state = {
        users: null,
        isLoading: true,
    }

    componentDidMount() {
        UserService.getUsers().then((results) => {
            if (results && results.data && results.data.results) {
                this.setState({
                    users: results.data.results,
                    isLoading: false,
                })
            }
        }).catch((err) => {
            console.log("Err", err)
        })
    }

    _renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={[styles.itemContainer, item.gender == "male" ? styles.male : styles.female]}
                onPress={() => {
                    this.props.navigation.navigate('UserDetails', {
                        user: item
                    })
                }}
            >
                <Image
                    source={{ uri: item.picture.large }}
                    style={styles.itemImage}
                />
                <View style={styles.itemTitleContainer}>
                    <Text style={styles.itemTitle}>
                        <Feather name="user" size={20} color="gray" /> {item.login.username}
                    </Text>
                    <Text style={styles.itemTitle}>
                        <Feather name="phone" size={20} color="gray" /> {item.phone}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { users, isLoading } = this.state
        
        return (
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white' }}>
                {isLoading &&
                    <ActivityIndicator size="large" color="black" />
                }
                {!isLoading &&
                    <FlatList
                        data={users}
                        renderItem={this._renderItem}
                        keyExtractor={keyExtractor}
                    />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        paddingBottom: 20,
        alignItems: 'center',
        marginBottom: 1,
    },
    itemTitleContainer: {
        flex: 1,
        flexDirection: 'column',
        textAlign: 'left',
        marginLeft: 15,
    },
    itemTitle: {
        fontSize: 20,
        color: 'gray',
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    male: {
        backgroundColor: '#f1fff8',
    },
    female: {
        backgroundColor: '#fff5ff',
    },
})
