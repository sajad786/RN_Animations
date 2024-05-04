import React, { useRef, useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';

const data = [
  { id: 1, title: 'Item 1', imageUrl: 'https://img.freepik.com/free-vector/abstract-website-banner-with-modern-shapes_1361-1738.jpg?w=2000' },
  { id: 2, title: 'Item 2', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZk7Er2yQBRAqHCXrXt7W_UJ1lm-OKClU0M_kfPoEW&s' },
  { id: 3, title: 'Item 3', imageUrl: 'https://www.shutterstock.com/image-vector/dark-wide-abstract-banner-grey-260nw-1804227037.jpg' },
  // Add more items as needed
];


const Carousel = () => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoLoopInterval = 3000; // Auto loop interval in milliseconds

  const handleAutoLoop = () => {
    if (currentIndex < data.length - 1) {
      carouselRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      carouselRef.current.scrollToIndex({ index: 0 });
    }
  };

  useEffect(() => {
    let autoLoopTimer = null;
    if (data.length > 1) {
      autoLoopTimer = setInterval(handleAutoLoop, autoLoopInterval);
    }
    return () => clearInterval(autoLoopTimer);
  }, [currentIndex]);

  const handlePaginationPress = (index) => {
    if (carouselRef.current) {
      carouselRef.current.scrollToIndex({ index });
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.carouselItem}>
       <Image 
       style={{height:'100%', width:'100%'}}
        source={{uri: item?.imageUrl}}
       />
      </View>
    );
  };

  const renderPaginationDots = () => {
    return (
      <View style={styles.paginationDotsContainer}>
        {data.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.paginationDot, index === currentIndex && styles.activeDot]}
            onPress={() => handlePaginationPress(index)}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={carouselRef}
        data={data}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const contentOffset = event.nativeEvent.contentOffset.x;
          const index = Math.round(contentOffset / Dimensions.get('window').width);
          setCurrentIndex(index);
        }}
      />
      {renderPaginationDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carouselItem: {
    width: Dimensions.get('window').width,
    height: 200, // Set the height of your carousel item here
    // Add any other styles for your carousel item here
  },
  paginationDotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#888', // Dot color when inactive
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#333', // Dot color when active
  },
});

export default Carousel;
