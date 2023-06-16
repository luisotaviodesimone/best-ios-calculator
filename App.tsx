import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Button from './components/Button';
import Row from './components/Row';
import calculator, { ICalculatorState, initialState } from './util/calculator';

// create class component of App
export default class App extends Component {
  state = initialState;

  // handle tap method
  HandleTap = (type: string, value?: string | number | undefined) => {
    this.setState((state: ICalculatorState) => {
      console.log(
        `\n🚀 \n file: App.tsx:15 \n App \n this.setState \n state:`,
        JSON.stringify(state, null, 2)
      );

      return calculator(type, value, state);
    });
  };

  // render method
  render() {
    return (
      <View style={styles.container}>
        {/* Status bae here */}
        <SafeAreaView>
          <Text style={styles.value}>
            {parseFloat(this.state.currentValue).toLocaleString()}
          </Text>

          {/* Do create componentRow */}
          <Row>
            <Button
              text="C"
              theme="secondary"
              onPress={() => this.HandleTap('clear')}
            />

            <Button
              text="+/-"
              theme="secondary"
              onPress={() => this.HandleTap('posneg')}
            />

            <Button
              text="%"
              theme="secondary"
              onPress={() => this.HandleTap('percentage')}
            />

            <Button
              text="÷"
              theme="accent"
              onPress={() => this.HandleTap('operator', '/')}
            />
          </Row>

          {/* Number */}
          <Row>
            {[7, 8, 9].map((number) => (
              <Button
                key={number}
                text={number.toString()}
                onPress={() => this.HandleTap('number', number)}
              />
            ))}
            <Button
              text="×"
              theme="accent"
              onPress={() => this.HandleTap('operator', '*')}
            />
          </Row>

          <Row>
            {[4, 5, 6].map((number) => (
              <Button
                key={number}
                text={number.toString()}
                onPress={() => this.HandleTap('number', number)}
              />
            ))}
            <Button
              text="-"
              theme="accent"
              onPress={() => this.HandleTap('operator', '-')}
            />
          </Row>

          <Row>
            {[1, 2, 3].map((number) => (
              <Button
                key={number}
                text={number.toString()}
                onPress={() => this.HandleTap('number', number)}
              />
            ))}
            <Button
              text="+"
              theme="accent"
              onPress={() => this.HandleTap('operator', '+')}
            />
          </Row>

          <Row>
            <Button text="0" onPress={() => this.HandleTap('number', 0)} />
            <Button text="." onPress={() => this.HandleTap('number', '.')} />
            <Button
              text="="
              theme="primary"
              onPress={() => this.HandleTap('equal', '=')}
            />
          </Row>
        </SafeAreaView>
      </View>
    );
  }
}

// create styles of app
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
    justifyContent: 'flex-end',
  },
  value: {
    color: '#fff',
    fontSize: 42,
    textAlign: 'right',
    marginRight: 20,
    marginBottom: 10,
  },
});
