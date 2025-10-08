import {useState} from 'react'
import { View, Text, Button,StyleSheet } from 'react-native'

const Marvel = () => {

    const [contador, setContador] = useState(0)

    const Soma = () => {
        setContador(contador + 1)
    }

    const Sub = () => {
        if (contador > 0){
            setContador(contador - 1)
        }
    }
       
    return (
        <View style={styles.container}>
            <Text>O número é: {contador}</Text>
            <Button onPress={Soma} style={styles.button}>clica ai p somar</Button>
            <Button onPress={Sub}>clica ai p subtrair</Button>
        </View>
    )
}

export default Marvel;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#00dd0bff"
    },
    button: {
        backgroundColor: "#00dd0bff"
    }
});