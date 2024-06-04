import {StyleSheet} from 'react-native';

export const useStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
    },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.white,
      borderRadius: 12,
      flex: 1,
      paddingHorizontal: 14,
      marginLeft: 10,
    },
    inputSeach: {
      flex: 1,
      color: colors.black,
      fontSize: 14,
      letterSpacing: 0.8,
      lineHeight: 15.6,
    },
    listItem: {
      marginTop: 20,
      marginBottom: 16,
      paddingBottom: 30,
      gap: 8,
      paddingHorizontal: 16,
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
