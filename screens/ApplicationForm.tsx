import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  resume: Yup.string().required('Resume URL is required'),
});

const ApplicationForm = ({ route }: any) => {
  const { job } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Apply for {job.title}</Text>
      <Formik
        initialValues={{ name: '', email: '', resume: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log('Application submitted:', values);
          alert('Application submitted successfully!');
          resetForm();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Resume URL"
              onChangeText={handleChange('resume')}
              onBlur={handleBlur('resume')}
              value={values.resume}
            />
            {touched.resume && errors.resume && <Text style={styles.error}>{errors.resume}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit Application</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default ApplicationForm;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 8, borderRadius: 5 },
  button: { backgroundColor: '#28A745', padding: 10, borderRadius: 5 },
  buttonText: { color: '#fff', textAlign: 'center' },
  error: { color: 'red', marginBottom: 5 },
});
