import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ActivityIndicator,
} from 'react-native';

import { Transition } from 'react-navigation-fluid-transitions';

export default class UserDetails extends React.Component {
    state = {
        user: null
    }

    componentDidMount() {
        this.setState({
            user: this.props.navigation.state.params.user
        })
    }

    render() {
        const { user } = this.state

        if (!user) {
            return <ActivityIndicator size="large" color="black" />
        }

        return (
            <View style={[{ flex: 1, alignItems: 'center' }, user.gender == "male" ? styles.male : styles.female]}>
                <View style={{ alignItems: 'center' }}>
                    <Transition delay appear="horizontal" disappear="scale">
                        <Image
                            source={{ uri: user.picture.large }}
                            style={styles.itemImage}
                        />
                    </Transition>
                    <Transition delay appear="bottom">
                        <Text style={styles.name}>
                            {user.name.title + ". " + user.name.first + " " + user.name.last}
                        </Text>
                    </Transition>
                    <Transition delay appear="bottom">
                        <Text style={styles.info}>
                            {user.email}
                        </Text>
                    </Transition>
                    <Transition delay appear="bottom">
                        <Text style={styles.info}>
                            {user.location.city + " - " + user.location.street.name + ", " + user.location.street.number}
                        </Text>
                    </Transition>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    itemImage: {
        width: 100,
        height: 100,
        borderRadius: 0,
        marginTop: 100,
        marginBottom: 10,
    },
    name: {
        fontSize: 20,
        color: 'gray',
        marginBottom: 5,
    },
    info: {
        fontSize: 15,
        color: 'gray',
        marginBottom: 5,
    },
    male: {
        backgroundColor: '#f1fff8',
    },
    female: {
        backgroundColor: '#fff5ff',
    },
})