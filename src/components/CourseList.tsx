import React from 'react';
import { View, StyleSheet, useWindowDimensions, Linking } from 'react-native';
import { useCourseFilter } from '@/store';
import { DataTable, Divider, List, Text, useTheme } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { Course } from '@/schema/courseFilterState';
const weekReference = {
  sun: '週日',
  mons: '週一',
  tues: '週二',
  wed: '週三',
  thu: '週四',
  fri: '週五',
  sat: '週六',
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
      resultString += weekReference[key] + ' ';
      const sourceTimeString = obj[key].split(' ');
      for (const timeSlot of sourceTimeString) {
        resultString += hourReference[timeSlot] + ', ';
      }
    }
  }

  if (resultString.endsWith(', ')) {
    resultString = resultString.slice(0, -2);
  }

  return resultString;
};
const comparison: Record<string, string> = {
  '○': '部訂共同必修',
  '△': '校訂共同必修',
  '☆': '共同選修',
  '●': '部訂專業必修',
  '▲': '校訂專業必修',
  '★': '專業選修',
};
export function CourseList() {
  const { width } = useWindowDimensions();

  // "sm" breakpoint equivalent (e.g., screen width >= 600px)
  const isSm = width >= 600;

  const courses = useCourseFilter((state) => state.courseData);
  const theme = useTheme();
  return (
    <ScrollView
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: theme.colors.background,
      }}
    >
      {courses.map((course: Course) => {
        const timeRef = generateReference(course);
        const typeStr = comparison[course.course_type]
          ? ` • ${comparison[course.course_type]}`
          : '';
        const baseDescription = `${course.code ? course.code + ' • ' : ''}${course.credits ?? '0'} 學分${typeStr}`;

        if (isSm) {
          return (
            <View
              key={course.code}
              style={{
                paddingVertical: 14,
                paddingHorizontal: 20,
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: theme.colors.outlineVariant,
                backgroundColor: theme.colors.background,
              }}
            >
              {/* Header row: Course Name + Syllabus Link */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: 6,
                }}
              >
                <Text variant="titleMedium" style={{ fontWeight: '700' }}>
                  {course.name ?? 'Unnamed Course'}
                </Text>
                {course.link && (
                  <Text
                    variant="bodyMedium"
                    style={{
                      textDecorationLine: 'underline',
                      color: theme.colors.primary,
                    }}
                    onPress={() => Linking.openURL(course.link!)}
                  >
                    教學大綱與進度
                  </Text>
                )}
              </View>

              {/* Main metadata details row */}
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  rowGap: 4,
                  columnGap: 8,
                  marginBottom: 6,
                }}
              >
                <Text
                  variant="bodyMedium"
                  style={{ color: theme.colors.onSurfaceVariant }}
                >
                  {baseDescription}
                </Text>
                {course.instructor && (
                  <Text variant="bodyMedium">• 教師: {course.instructor}</Text>
                )}
                {course.classroom && (
                  <Text
                    variant="bodyMedium"
                    style={{ whiteSpace: 'nowrap', flexShrink: 0 } as any}
                  >
                    • 教室: {course.classroom.replace(/[\r\n]+/g, ' ')}
                  </Text>
                )}
                {timeRef !== '' && (
                  <Text variant="bodyMedium">• 時間: {timeRef}</Text>
                )}
                {course.cross_discipline && (
                  <Text variant="bodyMedium">
                    • 跨領域: {course.cross_discipline}
                  </Text>
                )}
                {course.experiment && (
                  <Text variant="bodyMedium">
                    • 實驗實習: {course.experiment}
                  </Text>
                )}
                {course.language && (
                  <Text variant="bodyMedium">
                    • 授課語言: {course.language}
                  </Text>
                )}
                {course.with_class && (
                  <Text variant="bodyMedium">
                    • 隨班附讀: {course.with_class}
                  </Text>
                )}
              </View>

              {/* Footer info: Enrollment + Notes */}
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <Text
                  variant="bodySmall"
                  style={{ color: theme.colors.onSurfaceVariant }}
                >
                  已選: {course.students_enrolled ?? '0'} | 退選:{' '}
                  {course.students_dropped ?? '0'}
                </Text>
                {course.notes ? (
                  <Text variant="bodySmall">備註: {course.notes}</Text>
                ) : null}
              </View>
            </View>
          );
        }

        return (
          <>
            <List.Accordion
              key={course.code}
              title={course.name ?? 'Unnamed Course'}
              description={baseDescription}
              style={{
                backgroundColor: theme.colors.background,
              }}
            >
              <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
                {course.link && (
                  <Text
                    style={{
                      textDecorationLine: 'underline',
                      color: theme.colors.primary,
                      marginBottom: 12,
                    }}
                    onPress={() => Linking.openURL(course.link!)}
                  >
                    教學大綱與進度
                  </Text>
                )}

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 6,
                  }}
                >
                  {course.instructor && (
                    <Text variant="bodyMedium">教師: {course.instructor}</Text>
                  )}
                  {course.classroom && (
                    <Text variant="bodyMedium">
                      教室: {course.classroom.replace(/[\r\n]+/g, ' ')}
                    </Text>
                  )}
                </View>

                {course.classroom && course.instructor && (
                  <Divider
                    style={{
                      marginVertical: 8,
                      backgroundColor: theme.colors.outlineVariant,
                    }}
                  />
                )}

                {timeRef !== '' && (
                  <Text variant={'bodyMedium'} style={{ marginBottom: 4 }}>
                    時間: {timeRef}
                  </Text>
                )}

                {course.cross_discipline && (
                  <Text variant="bodyMedium" style={{ marginBottom: 4 }}>
                    跨領域: {course.cross_discipline}
                  </Text>
                )}
                {course.experiment && (
                  <Text variant="bodyMedium" style={{ marginBottom: 4 }}>
                    實驗實習: {course.experiment}
                  </Text>
                )}
                {course.language && (
                  <Text variant="bodyMedium" style={{ marginBottom: 4 }}>
                    授課語言: {course.language}
                  </Text>
                )}
                {course.with_class && (
                  <Text variant="bodyMedium">
                    隨班附讀: {course.with_class}
                  </Text>
                )}

                {timeRef !== '' &&
                  course.cross_discipline &&
                  course.experiment &&
                  course.language &&
                  course.with_class && (
                    <Divider
                      style={{
                        marginVertical: 8,
                        backgroundColor: theme.colors.outlineVariant,
                      }}
                    />
                  )}

                <Text
                  variant="bodySmall"
                  style={{ color: theme.colors.onSurfaceVariant }}
                >
                  已選: {course.students_enrolled ?? '0'} | 退選:{' '}
                  {course.students_dropped ?? '0'}
                </Text>

                {course.notes ? (
                  <Text variant="bodySmall" style={{ marginTop: 8 }}>
                    備註: {course.notes}
                  </Text>
                ) : null}
              </View>
            </List.Accordion>
            <Divider
              style={{
                backgroundColor: theme.colors.outlineVariant,
                height: 2,
                marginVertical: 8,
              }}
            />
          </>
        );
      })}
    </ScrollView>
  );
}
