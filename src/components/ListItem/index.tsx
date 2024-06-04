/* eslint-disable react-native/no-inline-styles */
import React, {memo} from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {formatCurrency} from '../../utils/format-text';
import IcStar from '../../assets/icons/ic-star-new.svg';
import {useStyles} from './styles';

function ListItem({item, index, nav}: any) {
  const {colors} = useTheme();
  const styles = useStyles(colors);
  const discountDecimal = Number(item?.discountPercentage) / 100;
  const discountAmount = Number(item?.price) * discountDecimal;
  const discountedPrice = Number(item?.price) - discountAmount;

  console.log('ITEM -> ', item.id);

  return (
    <TouchableOpacity
      key={item.id}
      onPress={() => nav.navigate('detail', {item: item})}>
      <View style={[styles.cardItem, {marginLeft: index % 2 !== 0 ? 23 : 8}]}>
        <Image source={{uri: item.thumbnail}} style={styles.imgThumbnail} />
        <View style={styles.percentage}>
          <Text style={styles.textDisc}>{item.discountPercentage}%</Text>
        </View>
        <View style={styles.shortDesc}>
          <Text style={styles.itemName}>{item.title}</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.textPrice}>
              {formatCurrency(Number(discountedPrice))}
            </Text>
            <Text style={styles.textPriceDisc}>
              {formatCurrency(Number(item?.price))}
            </Text>
          </View>
          <View style={styles.priceWrapper}>
            <IcStar width={20} height={20} />
            <Text style={styles.textDetail}>{item?.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default memo(ListItem);
