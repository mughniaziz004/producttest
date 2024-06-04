import React, {useCallback} from 'react';
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import {useStyles} from './styles';

function ModalFilter({visible, setVisible, category, onPress}: any) {
  const {colors} = useTheme();
  const styles = useStyles(colors);
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('#0000004D');
      return () => {
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor('white');
      };
    }, []),
  );
  return (
    <Modal visible={visible} onRequestClose={setVisible} transparent>
      <View style={styles.bgModal}>
        <View style={styles.container}>
          <Text style={styles.title}>Kategori</Text>
          <View style={styles.listCategory}>
            <ScrollView>
              {category?.map((item: any) => (
                <TouchableOpacity
                  key={item}
                  style={styles.btnCategory}
                  onPress={() => onPress(item)}>
                  <Text style={styles.textCategory}>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default ModalFilter;
