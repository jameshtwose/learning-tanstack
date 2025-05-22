import { useUser } from '@/hooks/useUser';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function UserProfileScreen() {
  const { data, status, error } = useUser();

  if (status === 'pending') {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text>Loading user...</Text>
      </View>
    );
  }

  if (status === 'error') {
    return (
      <View style={styles.center}>
        <Text>Error: {error?.message}</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.center}>
        <Text>No user data found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>User ID:</Text>
      <Text style={styles.value}>{data.id}</Text>
      <Text style={styles.label}>Username:</Text>
      <Text style={styles.value}>{data.username}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{data.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    marginBottom: 8,
  },
});