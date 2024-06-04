import {StyleSheet} from 'react-native';

export const useStyles = (colors: any) =>
  StyleSheet.create({
    cardItem: {
      backgroundColor: colors.card,
      elevation: 2,
      borderRadius: 6,
      marginBottom: 12,
      borderWidth: 1,
      width: 190,
    },
    imgThumbnail: {
      height: 130,
      width: '100%',
      resizeMode: 'stretch',
      marginRight: 10,
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6,
    },
    shortDesc: {
      paddingHorizontal: 16,
      marginTop: 10,
      paddingBottom: 20,
    },
    itemName: {
      fontSize: 16,
      color: colors.text,
      fontWeight: '400',
      lineHeight: 18.6,
      letterSpacing: 0.4,
    },
    percentage: {
      position: 'absolute',
      top: 5,
      left: -9.5,
      backgroundColor: colors.red,
      borderRadius: 6,
      padding: 5,
    },
    textDisc: {
      color: colors.white,
      fontSize: 11,
      lineHeight: 13,
      letterSpacing: 0.5,
    },
    textDetail: {
      color: colors.grey,
      fontSize: 14,
      lineHeight: 15.6,
      letterSpacing: 0.5,
      marginLeft: 4,
    },
    textPrice: {
      color: colors.text,
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 21.4,
      letterSpacing: 0.5,
    },
    textPriceDisc: {
      color: colors.grey,
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 13.6,
      letterSpacing: 0.5,
      textDecorationLine: 'line-through',
      marginLeft: 4,
    },
    priceWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
  });
