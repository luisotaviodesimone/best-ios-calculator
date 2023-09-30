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

export default class App extends Component {
  state: ICalculatorState = initialState;

  HandleTap = (
    type: CalculatorAction,
    value?: string | number | ISelection
  ) => {
    this.setState((state: ICalculatorState) => {
      console.log(
        `\n🚀Calculator State Beginning🚀:\n${JSON.stringify(state, null, 2)}\n`
      );

      return calculatorLogic(type, value, state);
    });
  };

  render() {
    const { currentValue } = this.state;

    return (
      <View style={styles.container}>
        <SafeAreaView>
          <TextInput
            showSoftInputOnFocus={false}
            contextMenuHidden={true}
            selectionColor={'#d400ff'}
            onSelectionChange={(event) => {
              this.HandleTap('selection', event.nativeEvent.selection);
            }}
            style={styles.valueText}
          >
            {currentValue}
          </TextInput>

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
              onPress={() => this.HandleTap('parenthesis')}
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
