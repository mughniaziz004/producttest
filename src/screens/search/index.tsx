import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {searchProductAction, resetDefault} from '../../redux/search/actions';
import IcBack from '../../assets/icons/ic-back.svg';
import IcBackWhite from '../../assets/icons/ic-back-white.svg';
import IcSearch from '../../assets/icons/ic-search.svg';
import {useStyles} from './styles';
import ListItem from '../../components/ListItem';

function SearchPage({navigation}: any) {
  const schema = useColorScheme();
  const {colors} = useTheme();
  const styles = useStyles(colors);
  const dispatch = useDispatch();
  const {loading, listSearch, total, skip} = useSelector(
    (state: any) => state.search,
  );
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (keyword.length >= 1) {
      dispatch(
        searchProductAction({
          q: keyword,
          limit: 10,
          prevData: [],
        }),
      );
    } else if (keyword.length === 0) {
      dispatch(resetDefault());
    }
  }, [dispatch, keyword]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {schema === 'dark' ? (
            <IcBackWhite width={32} height={32} />
          ) : (
            <IcBack width={32} height={32} />
          )}
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <IcSearch />
          <TextInput
            placeholder="Cari Produk"
            style={styles.inputSeach}
            placeholderTextColor={colors.grey}
            value={keyword}
            onChangeText={setKeyword}
          />
        </View>
      </View>
      <FlatList
        contentContainerStyle={styles.listItem}
        data={listSearch ?? []}
        renderItem={({item, index}) => (
          <ListItem item={item} index={index} nav={navigation} />
        )}
        ListEmptyComponent={
          loading ? (
            <View style={styles.emptyWrapper}>
              <ActivityIndicator />
              <Text style={styles.textEmpty}>Memuat Produk</Text>
            </View>
          ) : (
            <View style={styles.emptyWrapper}>
              <Text style={styles.textEmpty}>Produk tidak ditemukan</Text>
            </View>
          )
        }
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (listSearch?.length < total) {
            dispatch(
              searchProductAction({
                skip,
                limit: 10,
                prevData: listSearch,
                q: keyword,
              }),
            );
          }
        }}
        keyExtractor={(item: any) => item.id.toString()}
        numColumns={2}
        initialNumToRender={10}
        windowSize={5}
      />
    </View>
  );
}

export default SearchPage;
