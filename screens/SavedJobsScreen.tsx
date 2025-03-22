import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import JobCard from '../components/JobCard';

const SavedJobsScreen = ({ route, navigation }) => {
  const [savedJobs, setSavedJobs] = useState(route.params?.savedJobs || []);

  const removeJob = (jobId: string) => {
    setSavedJobs(savedJobs.filter((job) => job.id !== jobId));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={savedJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <JobCard
            job={item}
            onSave={() => removeJob(item.id)}
            onApply={() => navigation.navigate('ApplicationForm', { job: item })}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});

export default SavedJobsScreen;