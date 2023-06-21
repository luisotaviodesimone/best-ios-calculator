import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import Button from './components/Button';
import Row from './components/Row';
import calculatorLogic, {
  CalculatorAction,
  ICalculatorState,
  initialState,
} from './util/calculator';
import { ISelection } from './util/formatting';

// create class component of App
export default class App extends Component {
  state: ICalculatorState = initialState;

  HandleTap = (
    type: CalculatorAction,
    value?: string | number | ISelection
  ) => {
    this.setState((state: ICalculatorState) => {
      console.log(
        `\n🚀 \n file: App.tsx:15 \n App \n this.setState \n state:`,
        JSON.stringify(state, null, 2)
      );

      return calculatorLogic(type, value, state);
    });
  };

  // render method
  render() {
    const { currentValue } = this.state;

    return (
      <View style={styles.container}>
        <SafeAreaView>
          <Text style={styles.valueText}>{currentValue}</Text>

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
              text="( )"
              theme="secondary"
              onPress={() => this.HandleTap('percentage')}
            />

            <Button
              text="÷"
              theme="accent"
              onPress={() => this.HandleTap('operator', '/')}
            />
          </Row>

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
            <Button text="DEL" onPress={() => this.HandleTap('delete')} />
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
  valueText: {
    color: '#fff',
    fontSize: 42,
    textAlign: 'right',
    marginRight: 20,
    marginBottom: 10,
  },
});
