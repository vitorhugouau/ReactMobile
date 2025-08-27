import { StyleSheet, View } from "react-native";

const StyleAndLayout = () => {
  return (
    <View style={styles.container}>
        <View style={styles.red}></View>
        <View style={styles.blue}></View>
        <View style={styles.yellow}></View>
    </View>
  )
};

export default StyleAndLayout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    red: {
        flex: 1,
        backgroundColor: 'red',
        width: '100%',
    },
    blue: {
        flex: 1,
        backgroundColor: 'blue',
        width: '100%',
    },
    yellow: {
        flex: 1,
        backgroundColor: 'yellow',
        width: '100%',
    },
})