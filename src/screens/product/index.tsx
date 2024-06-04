import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getProductAction,
  getCategoryAction,
  getProductCategoryAction,
} from '../../redux/product/action';
import IcSearch from '../../assets/icons/ic-search.svg';
import IcSearchWhite from '../../assets/icons/ic-search-white.svg';
import IcFilter from '../../assets/icons/ic-filter.svg';
import IcFilterWhite from '../../assets/icons/ic-filter-white.svg';
import {useStyles} from './styles';
import ListItem from '../../components/ListItem';
import ModalFilter from '../../components/ModalFilter';

function ProductPage({navigation}: any) {
  const {colors} = useTheme();
  const styles = useStyles(colors);
  const dispatch = useDispatch();
  const schema = useColorScheme();
  const {loading, data, total, skip, category} = useSelector(
    (state: any) => state.product,
  );
  const [filterOpen, setFilterOpen] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      dispatch(
        getProductAction({
          skip: 0,
          limit: 10,
          prevData: [],
        }),
      );
      dispatch(getCategoryAction());
    });
    return () => {
      navigation.removeListener(subscribe);
    };
  }, [dispatch, navigation]);

  console.log('PRODUCT.RENDER');

  const renderItem = useCallback(
    ({item, index}: any) => (
      <ListItem item={item} index={index} nav={navigation} />
    ),
    [navigation],
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Produk {counter}</Text>
        <View style={styles.rowAction}>
          <TouchableOpacity onPress={() => navigation.navigate('search')}>
            {schema === 'dark' ? (
              <IcSearchWhite width={32} height={32} />
            ) : (
              <IcSearch width={32} height={32} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilterOpen(!filterOpen)}>
            {schema === 'dark' ? (
              <IcFilterWhite width={32} height={32} />
            ) : (
              <IcFilter width={32} height={32} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => setCounter(counter + 1)}>
        <Text>UPDATE</Text>
      </TouchableOpacity>
      <FlatList
        contentContainerStyle={styles.listItem}
        showsVerticalScrollIndicator={true}
        keyExtractor={(item: any) => item.id.toString()}
        numColumns={2}
        initialNumToRender={10}
        windowSize={5}
        onEndReachedThreshold={0.3}
        onRefresh={() =>
          dispatch(
            getProductAction({
              skip: 0,
              limit: 10,
              prevData: [],
            }),
          )
        }
        refreshing={false}
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
        ListFooterComponent={
          data?.length > 9 && loading && <ActivityIndicator />
        }
        onEndReached={() => {
          if (data?.length < total) {
            dispatch(
              getProductAction({
                limit: 10,
                skip,
                prevData: data,
              }),
            );
          }
        }}
        data={data || []}
        renderItem={renderItem}
      />

      <ModalFilter
        visible={filterOpen}
        setVisible={() => setFilterOpen(!filterOpen)}
        category={category || []}
        onPress={(type: any) => {
          if (type === 'all') {
            dispatch(
              getProductAction({
                skip: 0,
                limit: 10,
                prevData: [],
              }),
            );
          } else {
            dispatch(
              getProductCategoryAction({
                id: null,
                type,
              }),
            );
          }
          setFilterOpen(false);
        }}
      />
    </View>
  );
}

export default ProductPage;
