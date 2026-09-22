import { useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import {
  Button,
  Divider,
  IconButton,
  Modal,
  Portal,
  Text,
  useTheme,
} from 'react-native-paper';
import { FilterBase } from '@/components/filter/FilterBase';

const start = new Date();

export default function FilterResponsive() {
  const [visible, setVisible] = useState(false);

  const theme = useTheme();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <>
      {isDesktop ? (
        <FilterBase />
      ) : (
        <>
          <Button
            mode="contained-tonal"
            icon="filter-variant"
            compact
            style={styles.headerButton}
            onPress={showModal}
          >
            篩選
          </Button>

          {/* Cross-Platform Paper Modal / Sheet */}
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={[
                styles.modalBase,
                styles.bottomSheetModal,
                { backgroundColor: theme.colors.elevation.level2 },
              ]}
            >
              {/* Mobile Handle Indicator */}

              <View style={styles.handleContainer}>
                <View
                  style={[
                    styles.handleBar,
                    { backgroundColor: theme.colors.outlineVariant },
                  ]}
                />
              </View>

              {/* Header */}
              <View style={styles.modalHeader}>
                <View style={styles.headerTitleContainer}>
                  <Text variant="headlineSmall" style={styles.heading}>
                    篩選條件
                  </Text>
                </View>
                <IconButton icon="close" size={22} onPress={hideModal} />
              </View>

              <Divider style={styles.headerDivider} />

              {/* Form Content */}
              <FilterBase />

              {/* Action Buttons */}
              <View style={styles.actionsContainer}>
                <Button
                  mode="text"
                  onPress={() => {
                    console.log('Reset press');
                  }}
                >
                  重設
                </Button>
                <Button
                  mode="contained"
                  icon="check"
                  style={styles.saveButton}
                  onPress={hideModal}
                >
                  確認送出
                </Button>
              </View>
            </Modal>
          </Portal>
        </>
      )}
    </>
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
