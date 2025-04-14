import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const buttons = [
  ['C', 'x^y', '<', '/'],
  ['7', '8', '9', 'x'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['=', '0', ',', '>']
];

export default function Calculator() {
  const [display, setDisplay] = useState('');
  const [result, setResult] = useState('');

  const handlePress = (button) => {
    if (button === 'C') {
      setDisplay('');
      setResult('');
    } else if (button === '=') {
      try {
        const expression = display.replace('x', '*').replace(',', '.');
        setResult(eval(expression).toString());
      } catch {
        setResult('Erro');
      }
    } else if (button === '<') {
      setDisplay(display.slice(0, -1));
    } else if (button === 'x^y') {
      setDisplay(display + '**');
    } else {
      setDisplay(display + button);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.displayText}>{result || display || '0'}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {buttons.map((row, i) => (
          <View key={i} style={styles.row}>
            {row.map((btn) => (
              <TouchableOpacity
                key={btn}
                style={styles.button}
                onPress={() => handlePress(btn)}
              >
                <Text style={styles.buttonText}>{btn}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  display: {
    height: 100,
    backgroundColor: '#aaa',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 10,
    marginBottom: 20,
  },
  displayText: {
    fontSize: 32,
    color: '#000',
  },
  buttonContainer: {
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#ddd',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: '#000',
  },
});
