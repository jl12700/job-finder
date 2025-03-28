import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Switch, ActivityIndicator, StyleSheet } from 'react-native';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';

type Job = {
  id: string;
  title: string;
  companyName: string;
  minSalary: string;
  maxSalary: string;
  locations: string[];
};

const JobFinderScreen = () => {
  const navigation = useNavigation();
  const [jobs, setJobs] = useState<Job[]>([]); 
  const [savedJobs, setSavedJobs] = useState<Job[]>([]); 
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://empllo.com/api/v1')
      .then(response => response.json())
      .then(data => {
        console.log('API Response:', data);
        const jobArray = Array.isArray(data) ? data : data.jobs || data.results || [];
        if (Array.isArray(jobArray)) {
          setJobs(jobArray.map(job => ({
            ...job,
            id: job.id || uuid.v4(),
            companyName: job.companyName || 'Unknown Company', 
            minSalary: job.minSalary || 'Unavailable',
            maxSalary: job.maxSalary || 'Unavailable',
            locations: job.locations || ['Location not specified'],
          })));
        } else {
          console.error('API did not return a valid jobs array:', data);
          setJobs([]);
        }
      })
      .catch(error => console.error('Error fetching jobs:', error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('SavedJobs', { savedJobs, setSavedJobs })}
            style={[styles.savedButton, { marginRight: 15 }]}
          >
            <Text style={styles.savedButtonText}>Saved ({savedJobs.length})</Text>
          </TouchableOpacity>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
          />
        </View>
      ),
      title: 'Job Finder',
      headerStyle: { backgroundColor: darkMode ? '#121212' : '#f5f5f5' },
      headerTintColor: darkMode ? '#fff' : '#000',
    });
  }, [darkMode, navigation, savedJobs]);
  
  

  const handleSaveJob = (job: Job) => {
    if (!savedJobs.some(savedJob => savedJob.id === job.id)) {
      setSavedJobs([...savedJobs, job]);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? '#121212' : '#f5f5f5' }]}>
      <TextInput
        placeholder="Search Jobs"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={[styles.input, { backgroundColor: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#000' }]}
        placeholderTextColor={darkMode ? '#bbb' : '#666'}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <FlatList
          data={jobs.filter(job => job.title?.toLowerCase().includes(searchQuery.toLowerCase()))}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={[styles.jobCard, { backgroundColor: darkMode ? '#222' : '#fff' }]}>
              <Text style={[styles.jobTitle, { color: darkMode ? '#fff' : '#333' }]}>{item.title}</Text>
              <Text style={[styles.jobCompany, { color: darkMode ? '#ddd' : '#555' }]}>
                Company: {item.companyName}
              </Text>
              <Text style={[styles.jobLocation, { color: darkMode ? '#ddd' : '#555' }]}>
                Locations: {item.locations.join(', ')}
              </Text>
              <Text style={[styles.jobSalary, { color: '#007BFF' }]}>
                Salary: {item.minSalary} - {item.maxSalary}
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={styles.saveButton} 
                  onPress={() => handleSaveJob(item)}
                  disabled={savedJobs.some(savedJob => savedJob.id === item.id)}
                >
                  <Text style={styles.buttonText}>
                    {savedJobs.some(savedJob => savedJob.id === item.id) ? 'Saved' : 'Save Job'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.applyButton}
                  onPress={() => navigation.navigate('ApplicationForm', { job: item })}
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
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  jobCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  jobCompany: {
    fontSize: 16,
  },
  jobSalary: {
    fontSize: 14,
    marginBottom: 8,
  },
  jobLocation: {
    fontSize: 14,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#FF9800',
    padding: 10,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  applyButton: {
    backgroundColor: '#28A745',
    padding: 10,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  savedButton: {
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 6,
    marginRight: 10,
  },
  savedButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default JobFinderScreen;