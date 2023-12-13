// Footer.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import RequestScreen from '../screens/RequestScreen';
import HomeScreen from '../screens/HomeScreen';
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

// Bottom Nav Bar Layout
const NavBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // Customizing the appearance of each tab icon
        tabBarIcon: ({ size, focused }) => {
          const iconName = route.name === 'Home' ? 'home' : 'add-circle';
          return <Ionicons name={iconName} color={focused ? '#388E3C' : '#B0BEC5'} size={size} />;
        },
        tabBarLabelStyle: { fontSize: 13 }, // Adjust the font size here
      })}
    >
      {/* Home Tab */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            // Customizing the appearance of the tab label
            <Text style={{ color: focused ? '#388E3C' : '#B0BEC5' }}>Home</Text>
          ),
        }}
      />
      {/* Request Tab */}
      <Tab.Screen
        name="Request"
        component={RequestScreen}
        options={{
          headerShown: false,
          tabBarLabel: ({ color, focused }) => (
            // Customizing the appearance of the tab label
            <Text style={{ color: focused ? '#388E3C' : '#B0BEC5' }}>Request</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default NavBar;
