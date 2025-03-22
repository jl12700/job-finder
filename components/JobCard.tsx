import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const JobCard = ({ job, onSave, onApply }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{job.title}</Text>
    <Text style={styles.company}>{job.company}</Text>
    <Text style={styles.salary}>{job.salary}</Text>
    <TouchableOpacity onPress={onSave} style={styles.button}>
      <Text>Save Job</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onApply} style={styles.button}>
      <Text>Apply</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: { padding: 16, margin: 8, backgroundColor: '#fff', borderRadius: 8 },
  title: { fontSize: 18, fontWeight: 'bold' },
  company: { fontSize: 16, color: '#555' },
  salary: { fontSize: 14, color: '#777' },
  button: { marginTop: 8, padding: 8, backgroundColor: '#ddd', borderRadius: 4 },
});

export default JobCard;