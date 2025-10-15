import { useState } from 'react';
import { CiCalculator1 } from "react-icons/ci";
import { SlCalculator } from "react-icons/sl";
import { TbMathIntegralX, TbMathXFloorDivideY } from "react-icons/tb";
import {
    SafeAreaView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { Card } from 'react-native-paper';

const colors = {
  orange: '#FF9500',
  lightGray: '#D4D4D2',
  black: '#1C1C1C',
  darkGray: '#505050',
  white: '#FFFFFF'
};

export default function Calculator() {
  const [value, setValue] = useState('0');
  const [cardCalc, setCardCalc] = useState(false);
  const [overlay, setOverlay] = useState(false);

  const handlePress = (button) => {
    if (typeof button !== 'string') {
      setCardCalc(!cardCalc);
      setOverlay(!overlay);
      return;
    }
    if (button === 'AC') {
      setValue('0');
    } else if (button === '+/-') {
      if (value.startsWith('-')) {
        setValue(value.slice(1));
      } else if (value !== '0') {
        setValue('-' + value);
      }
    } else if (button === '%') {
      const num = parseFloat(value);
      if (!isNaN(num)) {
        setValue((num / 100).toString());
      }
    } else if (button === '=') {
      try {
        let expression = value.replace(/÷/g, '/')
          .replace(/×/g, '*')
          .replace(/−/g, '-')
          .replace(/ /g, '');

        let result = eval(expression);

        setValue(result.toString());
      } catch (e) {
        console.log('Erro: ', e);
        setValue('3RR0');
      }
    } else if (['÷', '×', '−', '+'].includes(button)) {
      const lastChar = value[value.length - 1];
      if (['÷', '×', '−', '+'].includes(lastChar)) {
        setValue(value.slice(0, -1) + button);
      } else {
        setValue(value + button);
      }
    } else {
      if (value === '0') {
        setValue(button);
      } else {
        setValue(value + button);
      }
    }
  };

  const buttons = [
    { label: 'AC', color: colors.lightGray, textColor: colors.black },
    { label: '+/-', color: colors.lightGray, textColor: colors.black },
    { label: '%', color: colors.lightGray, textColor: colors.black },
    { label: '÷', color: colors.orange, textColor: colors.white },

    { label: '7', color: colors.darkGray, textColor: colors.white },
    { label: '8', color: colors.darkGray, textColor: colors.white },
    { label: '9', color: colors.darkGray, textColor: colors.white },
    { label: '×', color: colors.orange, textColor: colors.white },

    { label: '4', color: colors.darkGray, textColor: colors.white },
    { label: '5', color: colors.darkGray, textColor: colors.white },
    { label: '6', color: colors.darkGray, textColor: colors.white },
    { label: '−', color: colors.orange, textColor: colors.white },

    { label: '1', color: colors.darkGray, textColor: colors.white },
    { label: '2', color: colors.darkGray, textColor: colors.white },
    { label: '3', color: colors.darkGray, textColor: colors.white },
    { label: '+', color: colors.orange, textColor: colors.white },
    { label: <CiCalculator1 />, color: colors.darkGray, textColor: colors.white, type: 'icon' },
    { label: '0', color: colors.darkGray, textColor: colors.white, wide: true },
    { label: '.', color: colors.darkGray, textColor: colors.white },
    { label: '=', color: colors.orange, textColor: colors.white },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <>
        <View style={styles.divContador}>
          <TextInput
            style={styles.contador}
            value={value}
            editable={false}
            multiline
          />
        </View>

        <View style={styles.buttonsContainer}>
          {buttons.map((button, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                { backgroundColor: button.color },
              ]}
              onPress={() => handlePress(button.label)}
            >
              <Text style={[styles.buttonText, { color: button.textColor }]}>
                {button.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </>
      {overlay && (
        <TouchableWithoutFeedback
          onPress={() => {
            setOverlay(false);
            setCardCalc(false);
          }}
        >
          <View style={styles.overlay}>
            <TouchableWithoutFeedback onPress={() => { }}>
              <Card style={styles.cardCalc}>
                <View style={styles.cardItem}>
                  <SlCalculator style={styles.cardItemText} />
                  <Text style={styles.cardItemText}>Básica</Text>
                </View>
                <View style={styles.cardItem}>
                  <TbMathIntegralX style={styles.cardItemText} />
                  <Text style={styles.cardItemText}>Cientìfica</Text>
                </View>
                <View style={styles.cardItem}>
                  <TbMathXFloorDivideY style={styles.cardItemText} />
                  <Text style={styles.cardItemText}>Notas de Cálculo</Text>
                </View>
                <View style={{
                  marginTop: 10,
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                >
                  <Text style={{ color: '#fff', fontSize: 16 }}>
                    Conversão
                  </Text>
                  <Switch />
                </View>
              </Card>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: 'flex-end',
    padding: 16,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 999,
  },
  divContador: {
    paddingHorizontal: 20,
    marginBottom: 10,
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  contador: {
    fontSize: 60,
    color: colors.white,
    textAlign: 'right',
    fontWeight: '200',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: '22%',
    aspectRatio: 1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 32,
    fontWeight: '400',
  },
  cardCalc: {
    position: 'absolute',
    bottom: 70,
    left: 16,
    width: 220,
    backgroundColor: '#1c1c1e',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 1000,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#2c2c2e',
    borderBottomWidth: 1,
    cursor: 'pointer'
  },
  cardItemText: {
    color: '#fff',
    fontSize: 17,
    marginLeft: 12,
  },
});
