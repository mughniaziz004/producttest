import {StyleSheet} from 'react-native';

export const useStyles = (colors: any) =>
  StyleSheet.create({
    bgModal: {
      flex: 1,
      backgroundColor: colors.modal,
      justifyContent: 'flex-end',
    },
    container: {
      backgroundColor: colors.background,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 16,
      height: 350,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 19.6,
      letterSpacing: 0.5,
    },
    listCategory: {
      marginTop: 12,
    },
    btnCategory: {
      height: 40,
      borderBottomWidth: 1,
      paddingBottom: 8,
      marginBottom: 10,
      borderBottomColor: colors.border,
    },
    textCategory: {
      fontSize: 16,
      fontWeight: '500',
      textTransform: 'capitalize',
      lineHeight: 18.6,
    },
  });
