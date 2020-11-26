import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Chat from '../pages/Chat';
import GroupList from '../pages/GroupList';


const Stack = createStackNavigator();



export default function ChatRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Lista de Grupos' component={GroupList} />
            <Stack.Screen name='Chat' component={Chat}/>
        </Stack.Navigator>
    )
}
