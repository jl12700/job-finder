import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import JobFinderScreen from './screens/JobFinderScreen';
import SavedJobsScreen from './screens/SavedJobsScreen';
import ApplicationForm from './screens/ApplicationForm';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="JobFinder">
        <Stack.Screen
          name="JobFinder"
          component={JobFinderScreen}
          options={{ title: 'Job Finder', headerStyle: { backgroundColor: '#007BFF' }, headerTintColor: '#fff' }}
        />
        <Stack.Screen
          name="SavedJobs"
          component={SavedJobsScreen}
          options={{ title: 'Saved Jobs', headerStyle: { backgroundColor: '#007BFF' }, headerTintColor: '#fff' }}
        />
        <Stack.Screen
          name="ApplicationForm"
          component={ApplicationForm}
          options={{ title: 'Apply Now', headerStyle: { backgroundColor: '#007BFF' }, headerTintColor: '#fff' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


