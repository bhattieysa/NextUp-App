import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Layout,
  CommonStyles,
  Container,
  Colors,
  Fonts,
} from '../../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import i18n from 'i18n';

let wide = Layout.width;

const SearchInput = ({ filter, style, onChange }) => (
  <Container style={[styles.search, { ...style }]}>
    <TextInput
      style={[
        styles.input,
        !filter && { backgroundColor: Colors.light, ...CommonStyles.shadow },
      ]}
      autoCorrect={false}
      onChangeText={onChange}
      placeholderTextColor={Colors.shade}
      placeholder={i18n.t('Search')}
    />
    {filter && (
      <Icon
        style={styles.searchIcon}
        name={'search'}
        size={16}
        color={Colors.shade}
      />
    )}
  </Container>
);

const SearchBar = ({ filter, onChange }) => (
  <View style={styles.container}>
    <SearchInput filter onChange={onChange} style={{ flex: 1 }} />
    <TouchableOpacity
      activeOpacity={1}
      onPress={filter}
      style={[CommonStyles.container, CommonStyles.center, { flex: 0.15, paddingHorizontal: 0, marginLeft: 10 }]}>
      <View style={[styles.filter, CommonStyles.center]}>
        <Icon name={'filter'} color={Colors.light} size={20} />
      </View>
      <Text numberOfLines={1} style={styles.filterlabel}>
        {i18n.t('Filter')}
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: wide * 0.2,
    flexDirection: 'row',
  },
  search: {
    paddingHorizontal: 0,
    position: 'relative',
    justifyContent: 'center',
    flex: 0,
  },
  input: {
    width: '100%',
    backgroundColor: Colors.lightshade,
    height: wide * 0.12,
    borderRadius: (wide * 0.1) / 2,
    paddingHorizontal: wide * 0.1,
    color: Colors.dark,
    fontFamily: Fonts.Regular,
    textAlignVertical: 'center',
  },
  searchIcon: {
    position: 'absolute',
    top: wide * 0.08,
    left: wide * 0.04,
  },
  filter: {
    height: wide * 0.1,
    width: wide * 0.1,
    backgroundColor: Colors.base,
    borderRadius: (wide * 0.1) / 2,
  },
  filterlabel: {
    fontSize: 12,
    color: Colors.darkshade,
    fontFamily: Fonts.Regular,
  },
});

export { SearchBar, SearchInput };
