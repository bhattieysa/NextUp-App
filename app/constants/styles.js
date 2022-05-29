import { StyleSheet, Platform, StatusBar } from 'react-native';
import { Layout } from './dimensions';
import { Colors } from './colors';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Fonts } from './fonts';
let wide = Layout.width;
const STATUSBAR_HEIGHT = getStatusBarHeight();
export default StyleSheet.create({
  container: {
    flex: 1,
    padding: wide * 0.04,
    backgroundColor: Colors.light,
  },
  chatBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  tabBarItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  noInternet: {
    position: 'absolute',
    bottom: 0,
    height: wide * 0.08,
    width: '100%',
    backgroundColor: Colors.base,
  },
  showinfo: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 30,
    backgroundColor: Colors.base,
  },
  horizontalPadding: {
    paddingHorizontal: wide * 0.04,
  },
  horizontalMargin: {
    marginHorizontal: wide * 0.04,
  },
  verticalPadding: {
    paddingVertical: wide * 0.02,
  },
  verticalMargin: {
    marginVertical: wide * 0.02,
  },
  verticalCenter: {
    justifyContent: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  full: {
    height: '100%',
    width: '100%',
  },
  large: {
    height: '80%',
    width: '80%',
  },
  medium: {
    height: '60%',
    width: '60%',
  },
  small: {
    height: '45%',
    width: '45%',
  },
  logo: {
    height: wide * 0.4,
    width: wide * 0.4,
  },
  rounded: {
    borderRadius: wide * 0.02,
  },
  topRounded: {
    borderTopLeftRadius: wide * 0.08,
    borderTopRightRadius: wide * 0.08,
  },
  leftRounded: {
    borderTopLeftRadius: wide * 0.02,
    borderBottomLeftRadius: wide * 0.02,
  },
  rightRounded: {
    borderTopRightRadius: wide * 0.02,
    borderBottomRightRadius: wide * 0.02,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.overlay,
  },
  boldText: {
    fontFamily: Fonts.Bold,
  },
  bordered: {
    borderWidth: 0.5,
    borderColor: Colors.shade,
  },
  btmborder: {
    marginVertical: 0,
    borderBottomWidth: 0.5,
    borderColor: Colors.shade,
  },
  verticalBorder: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: Colors.shade,
  },
  hiddenbtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: wide * 0.2,
    borderWidth: 0.5,
    borderColor: Colors.shade,
    paddingHorizontal: wide * 0.03,
    backgroundColor: Colors.base,
    right: 0,
    marginVertical: wide * 0.02,
  },
  buttons: {
    backgroundColor: Colors.base,
    width: '50%',
    height: wide * 0.13,
    borderRadius: wide * 0.5,
    shadowColor: Colors.dark,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 20,
    shadowOpacity: 0.3,
    marginVertical: wide * 0.05,
  },
  label: {
    color: Colors.light,
    fontSize: 22,
    fontFamily: Fonts.Bold,
  },
  shadow: {
    shadowColor: Colors.dark,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      width: 3,
      height: 2,
    },
    elevation: 2,
    backgroundColor: Colors.light,
  },
  lightshadow: {
    shadowColor: Colors.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    backgroundColor: Colors.light,
    elevation: 3,
  },
  topshadow: {
    shadowColor: Colors.dark,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    backgroundColor: Colors.light,
    elevation: 24,
  },
  info: {
    color: Colors.base,
    fontWeight: '500',
    fontSize: 16,
    fontFamily: Fonts.Regular,
  },
  inputContainer: {
    width: '80%',
    height: wide * 0.12,
    position: 'relative',
    borderColor: 'grey',
    borderRadius: wide * 0.1,
    justifyContent: 'center',
  },
  stickylabel: {
    position: 'absolute',
    top: -wide * 0.038,
    left: wide * 0.06,
    backgroundColor: Colors.light,
    marginVertical: 0,
  },
  input: {
    width: '70%',
    textAlignVertical: 'center',
    color: Colors.dark,
    height: '100%',
    fontFamily: Fonts.Regular,
  },
  listItem: {
    flexDirection: 'row',
    minHeight: wide * 0.15,
    backgroundColor: Colors.light,
    paddingVertical: wide * 0.02,
    marginVertical: wide * 0.02,
  },
  text: {
    fontSize: 16,
    color: Colors.grey,
    lineHeight: wide * 0.05,
    fontFamily: Fonts.Regular,
  },
  title: {
    fontSize: 18,
    color: Colors.darkshade,
    lineHeight: wide * 0.06,
    maxWidth: '80%',
    fontFamily: Fonts.Regular,
  },
  icon: {
    height: wide * 0.25,
    width: wide * 0.25,
    marginHorizontal: 10,
  },
  profilepic: {
    borderRadius: 10,
    alignSelf: 'center',
    height: wide * 0.3,
    width: wide * 0.3,
    marginVertical: wide * 0.05,
    position: 'relative',
  },
  img: {
    borderRadius: 10,
    height: wide * 0.25,
    width: wide * 0.25,
  },
  cameraicon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  headerBottomLine: {
    borderBottomWidth: 0.4,
    borderBottomColor: Colors.newGrayFontColor
  }
});
