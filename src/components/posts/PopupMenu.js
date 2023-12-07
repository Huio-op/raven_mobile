import {
  Modal,
  TouchableOpacity,
  View,
  SafeAreaView,
  StyleSheet,
  Touchable,
  Text,
  UIManager,
  findNodeHandle,
  Animated,
  Easing,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function PopupMenu({
  options = [],
  icon = 'more-vertical',
  customStyles = {},
  iconSize = 26,
}) {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const translatePopup = (to) => {
    to === 1 && setModalVisible(true);
    Animated.timing(animation, {
      toValue: to === 1 ? 0 : 50,
      useNativeDriver: true,
      duration: 100,
      easing: Easing.linear,
    }).start(() => to === 0 && setModalVisible(false));
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          if (!modalVisible) {
            translatePopup(1);
          }
        }}
        style={customStyles}
      >
        <Feather name={icon} size={iconSize} color={COLORS.black} />
      </TouchableOpacity>
      <Modal transparent={true} visible={modalVisible} style={{ height: 10, width: 20 }}>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, .25)' }}
          onTouchStart={(e) => {
            translatePopup(0);
          }}
        >
          <Animated.View
            style={[
              styles.popup,
              {
                transform: [
                  {
                    translateY: animation,
                  },
                ],
              },
            ]}
          >
            {options.map((opt, idx) => {
              return (
                <TouchableOpacity
                  key={idx}
                  onPress={opt.action}
                  style={[
                    styles.popupButton,
                    { borderBottomWidth: idx === options.length - 1 ? 0 : 1 },
                  ]}
                >
                  <Feather name={opt.icon} size={26} />
                  <Text style={styles.popupText}>{t(opt.title)}</Text>
                </TouchableOpacity>
              );
            })}
          </Animated.View>
        </SafeAreaView>
      </Modal>
    </>
  );
}

const styles = new StyleSheet.create({
  popup: {
    borderRadius: 8,
    borderColor: COLORS['light-grey'],
    borderWidth: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  popupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 50,
    borderColor: COLORS['light-grey'],
    paddingHorizontal: 20,
  },
  popupText: {
    fontWeight: 'bold',
  },
});
