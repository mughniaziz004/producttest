import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getProductCategoryAction} from '../../redux/product/action';
import IcBack from '../../assets/icons/ic-back.svg';
import IcBackBg from '../../assets/icons/ic-back-bg.svg';
import IcStar from '../../assets/icons/ic-star-new.svg';
import {useStyles} from './styles';
import {formatCurrency} from '../../utils/format-text';

function ProductDetail({navigation, route}: any) {
  const {item} = route.params;
  const {colors} = useTheme();
  const styles = useStyles(colors);
  const dispatch = useDispatch();
  const {similar} = useSelector((state: any) => state.product);
  const [scrollY] = useState(new Animated.Value(0));
  const [productNameVisible, setProductNameVisible] = useState(false);
  const [imgSelected, setImgSelected] = useState<any>(item?.thumbnail);

  const HEADER_MAX_HEIGHT = 300;
  const HEADER_MIN_HEIGHT = 60;
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const imageTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    const listenerId = imageOpacity.addListener(({value}) => {
      if (value === 0) {
        setProductNameVisible(true);
      } else {
        setProductNameVisible(false);
      }
    });

    return () => {
      imageOpacity.removeListener(listenerId);
    };
  }, [imageOpacity]);

  const pressImg = (sel: any) => {
    if (sel !== imgSelected) {
      setImgSelected(sel);
    } else {
      setImgSelected(item?.thumbnail);
    }
  };

  useEffect(() => {
    dispatch(
      getProductCategoryAction({
        id: item?.id,
        type: item.category,
      }),
    );
  }, [dispatch, item]);

  const discountDecimal = Number(item?.discountPercentage) / 100;
  const discountAmount = Number(item?.price) * discountDecimal;
  const discountedPrice = Number(item?.price) - discountAmount;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: false,
          },
        )}>
        <View style={styles.contentContainer}>
          <View style={styles.mapImgThumbnail}>
            {item?.images
              ?.filter((it: any) => it !== item.thumbnail)
              .map((itm: any) => (
                <TouchableOpacity key={itm} onPress={() => pressImg(itm)}>
                  <Image
                    source={{uri: itm}}
                    style={
                      itm === imgSelected
                        ? styles.imgThumbnailSel
                        : styles.imgThumbnail
                    }
                  />
                </TouchableOpacity>
              ))}
          </View>
          <Text style={styles.textTitle}>{item?.title}</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.textPrice}>
              {formatCurrency(discountedPrice)}
            </Text>
            <Text style={styles.textPriceDisc}>
              {formatCurrency(item?.price)}
            </Text>
            <Text style={styles.textDisc}>{item?.discountPercentage}%</Text>
          </View>
          <View style={styles.ratingWrapper}>
            <IcStar width={22} height={22} />
            <Text style={styles.textRating}>{item.rating}</Text>
          </View>
        </View>
        <View style={styles.spacer} />
        <View style={styles.detailWrapper}>
          <Text style={styles.label}>Detail Produk</Text>
          <View style={styles.cardDetail}>
            <View style={styles.detailInfo}>
              <Text style={styles.textDetailInfoLabel}>Merek</Text>
              <Text style={styles.textDetailInfoValue}>{item?.brand}</Text>
            </View>
            <View style={styles.detailInfo}>
              <Text style={styles.textDetailInfoLabel}>Stok</Text>
              <Text style={styles.textDetailInfoValue}>{item?.stock}</Text>
            </View>
            <View style={styles.detailInfo}>
              <Text style={styles.textDetailInfoLabel}>Kategori</Text>
              <Text style={styles.textDetailInfoValue}>
                {item?.category.charAt(0).toUpperCase() +
                  item.category.slice(1).toLowerCase()}
              </Text>
            </View>
          </View>
          <Text style={[styles.label, styles.marTop10]}>Deskripsi Produk</Text>
          <Text style={styles.textDescription}>{item?.description}</Text>
        </View>
        <View style={styles.spacer} />
        <View style={styles.detailWrapper}>
          <Text style={[styles.label, styles.marTop10]}>Produk Serupa</Text>
          <View style={styles.marTop10}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {similar !== null &&
                similar?.map((element: any) => {
                  const discountDecimalSimilar =
                    Number(element?.discountPercentage) / 100;
                  const discountAmountSimilar =
                    Number(element?.price) * discountDecimalSimilar;
                  const discountedPriceSimilar =
                    Number(element?.price) - discountAmountSimilar;
                  return (
                    <TouchableOpacity
                      key={element.id}
                      onPress={() => {
                        navigation.navigate('detail', {item: element});
                        setImgSelected(element.thumbnail);
                      }}>
                      <View style={styles.cardSimilar}>
                        <Image
                          source={{uri: element.thumbnail}}
                          style={styles.similarImg}
                        />
                        <View style={styles.discWrapper}>
                          <Text style={styles.discText}>
                            {element.discountPercentage} %
                          </Text>
                        </View>
                        <View style={styles.contentSimilar}>
                          <Text
                            style={styles.textTitleSimilar}
                            numberOfLines={1}>
                            {element.title}
                          </Text>
                          <View style={styles.ratingWrapper}>
                            <IcStar width={18} height={18} />
                            <Text style={styles.textRatingSimilar}>
                              {element.rating}
                            </Text>
                          </View>
                          <View style={styles.priceWrapperSimilar}>
                            <Text
                              style={styles.textPriceSimilar}
                              numberOfLines={1}>
                              {formatCurrency(discountedPriceSimilar)}
                              <Text style={styles.textPriceDisc}>
                                {formatCurrency(element?.price)}
                              </Text>
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <Animated.View style={[styles.header, {height: headerHeight}]}>
        <Animated.Image
          source={{uri: imgSelected}}
          style={[
            styles.backgroundImage,
            {opacity: imageOpacity, transform: [{translateY: imageTranslate}]},
          ]}
        />
        <View style={styles.headerContent}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            {productNameVisible ? (
              <IcBack />
            ) : (
              <IcBackBg width={28} height={28} />
            )}
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

export default ProductDetail;
