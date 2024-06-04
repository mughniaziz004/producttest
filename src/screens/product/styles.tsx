import {StyleSheet} from 'react-native';

export const useStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      color: colors.text,
      fontSize: 24,
      lineHeight: 32.3,
      fontWeight: '600',
    },
    listItem: {
      marginTop: 20,
      marginBottom: 16,
      paddingBottom: 30,
      gap: 8,
    },
    emptyWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    textEmpty: {
      fontSize: 18,
      fontWeight: '600',
      marginTop: 20,
      color: colors.grey,
      letterSpacing: 1.5,
    },
    rowAction: {
      width: 70,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });
