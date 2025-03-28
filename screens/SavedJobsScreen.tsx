import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const SavedJobsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Get both savedJobs and setSavedJobs from params
  const { savedJobs: initialSavedJobs = [], setSavedJobs } = route.params || {};
  const [savedJobs, setLocalSavedJobs] = useState(initialSavedJobs);

  // Sync with parent when savedJobs change
  useEffect(() => {
    if (setSavedJobs) {
      setSavedJobs(savedJobs);
    }
  }, [savedJobs]);

  const removeJob = (jobId: string) => {
    setLocalSavedJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
  };

  const applyForJob = (job) => {
    navigation.navigate('ApplicationForm', { job });
  };

  return (
    <View style={styles.container}>
      {savedJobs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No saved jobs yet</Text>
          <Text style={styles.emptySubText}>Save jobs to view them here</Text>
        </View>
      ) : (
        <FlatList
          data={savedJobs}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.jobCard}>
              <Text style={styles.jobTitle}>{item.title}</Text>
              <Text style={styles.jobCompany}>Company: {item.companyName}</Text>
              <Text style={styles.jobLocation}>Locations: {item.locations.join(', ')}</Text>
              <Text style={styles.jobSalary}>Salary: {item.minSalary} - {item.maxSalary}</Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.removeButton]}
                  onPress={() => removeJob(item.id)}
                >
                  <Text style={styles.buttonText}>Remove</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.applyButton]}
                  onPress={() => applyForJob(item)}
                >
                  <Text style={styles.buttonText}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
  },
  jobCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  jobCompany: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  jobLocation: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  jobSalary: {
    fontSize: 14,
    color: '#007BFF',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
    width: '48%',
  },
  removeButton: {
    backgroundColor: '#dc3545',
  },
  applyButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SavedJobsScreen;