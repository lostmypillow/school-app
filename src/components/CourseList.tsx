import React from 'react';
import { View, StyleSheet, useWindowDimensions, Text } from 'react-native';
import { useCourseFilter } from '@/store';

const weekReference = {
  sun: '日',
  mons: '一',
  tues: '二',
  wed: '三',
  thu: '四',
  fri: '五',
  sat: '六',
};
const hourReference = {
  '1': '08:10 - 09:00',
  '2': '09:10 - 10:00',
  '3': '10:10 - 11:00',
  '4': '11:10 - 12:00',
  N: '12:10 - 13:00',
  '5': '13:10 - 14:00',
  '6': '14:10 - 15:00',
  '7': '15:10 - 16:00',
  '8': '16:10 - 17:00',
  '9': '17:10 - 18:00',
  A: '18:30 - 19:20',
  B: '19:20 - 20:10',
  C: '20:20 - 21:10',
  D: '21:10 - 22:00',
};
const generateReference = (obj) => {
  let resultString = '';

  const targetKeys = ['sun', 'mons', 'tues', 'wed', 'thu', 'fri', 'sat'];

  for (const key of targetKeys) {
    if (Object.hasOwn(obj, key) && obj[key] !== null) {
      console.log('found string', weekReference[key]);
      resultString += weekReference[key] + ' ';
      const sourceTimeString = obj[key].split(' ');
      for (const timeSlot of sourceTimeString) {
        resultString += hourReference[timeSlot] + ', ';
      }
      resultString += '';
    }
  }
  console.log(resultString);

  resultString = resultString.slice(0, -1);
  return resultString;
};
export function CourseList() {
  const { width } = useWindowDimensions();

  // "sm" breakpoint equivalent (e.g., screen width >= 600px)
  const isSm = width >= 600;

  // cols="12" (100% width) vs sm="4" (33.33% width, accounting for spacing)
  // For 3 items per row with 16px gap, subtract gap space from width percentage
  const cardWidth = isSm ? '31.5%' : '100%';
  const courses = useCourseFilter((state) => state.courseData);

  return (
    <View style={styles.row}>
      {courses.map((course) => (
        <View key={course.code} style={[styles.col, { width: cardWidth }]}>
          <View style={styles.card}>
            <Text>{course.name ?? ''}</Text>
            <Text>{course.code ?? ''}</Text>
            <Text>{course.credits ?? ''}</Text>
            <Text>{course.type ?? ''}</Text>
            <Text>{generateReference(course) ?? ''}</Text>
            <Text>{course.classroom ?? ''}</Text>
            <Text>{course.prof ?? ''}</Text>
            {/* Card Content */}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16, // Supported in modern React Native
  },
  col: {
    // Width handled dynamically above
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    // Optional shadow replacement for v-card elevation
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
