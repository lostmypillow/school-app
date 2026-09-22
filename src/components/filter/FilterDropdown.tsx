import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Menu, Text, useTheme } from 'react-native-paper';
import {
  DepartmentItem,
  DepartmentYearItem,
  SemesterItem,
  useCourseFilter,
} from '@/store';

// 2. Combine into Discriminated Unions for props
type FilterDropdownProps =
  | { label: '學期'; data: SemesterItem[] }
  | { label: '系所'; data: DepartmentItem[] }
  | { label: '年級'; data: DepartmentYearItem[] };
export default function FilterDropdown(props: FilterDropdownProps) {
  const theme = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);
  const filteredValue = useCourseFilter((state) => {
    if (props.label === '學期') return state.semesterYear;
    if (props.label === '系所') return state.department;
    return state.departmentYear;
  });
  const setFilteredValue = useCourseFilter((state) => {
    if (props.label === '學期') return state.setSemesterYear;
    if (props.label === '系所') return state.setDepartment;
    return state.setDepartmentYear;
  });
  const getFilteredName = (id: string) => {
    const item = props.data.find((d) => d.id === id);
    if (!item) return `選擇${props.label}`;
    if (item) {
      return props.label === '學期'
        ? `${item.year} 年 | 第 ${item.sem} 學期`
        : item.name;
    }
  };
  return (
    <View style={styles.fieldRow}>
      <Text
        variant="titleMedium"
        style={[
          styles.label,
          {
            marginRight: 8,
          },
        ]}
      >
        {props.label}
        {/*{JSON.stringify(data)}*/}
      </Text>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchorPosition="bottom"
        contentStyle={[
          styles.menuContent,
          { backgroundColor: theme.colors.elevation.level2 },
        ]}
        anchor={
          <Button
            disabled={props.data.length === 0}
            mode="outlined"
            compact
            icon="chevron-down"
            contentStyle={styles.dropdownButtonContent}
            labelStyle={styles.dropdownButtonLabel}
            style={[
              styles.dropdownButton,
              { borderColor: theme.colors.outlineVariant },
            ]}
            onPress={() => setMenuVisible(true)}
          >
            {getFilteredName(filteredValue)}
          </Button>
        }
      >
        <ScrollView style={styles.menuScrollView}>
          {props.data.map((semYear) => (
            <Menu.Item
              key={semYear.id}
              onPress={() => {
                setFilteredValue(semYear.id);
                setMenuVisible(false);
              }}
              title={getFilteredName(semYear.id)}
              trailingIcon={semYear.id === filteredValue ? 'check' : undefined}
            />
          ))}
        </ScrollView>
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    marginRight: 8,
  },
  modalBase: {
    padding: 20,
    overflow: 'hidden',
  },
  bottomSheetModal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    maxHeight: '85%',
  },
  handleContainer: {
    alignItems: 'center',
    paddingBottom: 8,
  },
  handleBar: {
    width: 36,
    height: 4,
    borderRadius: 2,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flex: 1,
  },
  heading: {
    fontWeight: '700',
  },
  headerDivider: {
    marginVertical: 14,
  },
  fieldContainer: {
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    minHeight: 52,
  },
  label: {
    fontWeight: '600',
  },
  dropdownButton: {
    minWidth: 160,
    borderRadius: 8,
  },
  dropdownButtonContent: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  dropdownButtonLabel: {
    fontSize: 14,
  },
  menuContent: {
    maxHeight: 280,
    borderRadius: 12,
  },
  menuScrollView: {
    maxHeight: 250,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 12,
    marginTop: 20,
  },
  saveButton: {
    borderRadius: 10,
  },
});
