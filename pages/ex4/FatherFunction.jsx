import { useState } from "react";
import { StyleSheet, View } from "react-native";
import BotaoContador from './../../components/BotaoContador';

const FatherFunction = () => {
  const [text, setText] = useState(0);
  const [text2, setText2] = useState(0);
  const [text3, setText3] = useState(0);

  const addValue = () => {
    setText(prev => prev + 1);
  };

  const addValue2 = () => {
    setText2(prev => prev + 1);
  };

  const addValue3 = () => {
    setText3(prev => prev + 1);
  };

  return (
    <View style={styles.container}>
      <BotaoContador setText={addValue} text={text} />
      <BotaoContador setText={addValue2} text={text2} />
      <BotaoContador setText={addValue3} text={text3} />
    </View>
  );
};

export default FatherFunction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 20,
  }
});
