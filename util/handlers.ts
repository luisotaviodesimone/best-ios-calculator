import { letterCharacters } from '../constants/characters';
import { ICalculatorState } from './calculator';

export const addCharacter = (
  value: string | number | undefined,
  state: ICalculatorState
): string => {
  const { currentValue } = state;

  if (!value) return currentValue;

  if (letterCharacters.test(currentValue) || currentValue === '0') {
    return value.toString();
  }

  return `${state.currentValue}${value}`
};

export const newHandleEqual = (state: ICalculatorState): ICalculatorState => {
  const { currentValue, previousValue } = state;

  const current = eval(currentValue);
  const previous = parseFloat(previousValue || '');
  const resetState = { operator: null, previousValue: null };

  // switch (operator) {
  //   case '+':
  //     return {
  //       currentValue: `${previous + current}`,
  //       ...resetState,
  //     };
  //   case '-':
  //     return {
  //       currentValue: `${previous - current}`,
  //       ...resetState,
  //     };
  //   case '*':
  //     return {
  //       currentValue: `${previous * current}`,
  //       ...resetState,
  //     };
  //   case '/':
  //     return {
  //       currentValue: `${previous / current}`,
  //       ...resetState,
  //     };

  //   default:
  //     return state;
  // }

  return {
    ...state,
    currentValue: `${current}`,
  };
};

export const handleEqual = (state: ICalculatorState): ICalculatorState => {
  const { currentValue, previousValue, operator } = state;

  const current = parseFloat(currentValue);
  const previous = parseFloat(previousValue || '');
  const resetState = { operator: null, previousValue: null };

  switch (operator) {
    case '+':
      return {
        currentValue: `${previous + current}`,
        ...resetState,
      };
    case '-':
      return {
        currentValue: `${previous - current}`,
        ...resetState,
      };
    case '*':
      return {
        currentValue: `${previous * current}`,
        ...resetState,
      };
    case '/':
      return {
        currentValue: `${previous / current}`,
        ...resetState,
      };

    default:
      return state;
  }
};

export const handlePosNeg = (state: ICalculatorState): number => {
  const getPointerNumber = handleEqual(state); // TODO: get the closer number to the pointer

  const { currentValue: handleEqualResult } = getPointerNumber;

  return parseFloat(handleEqualResult) * -1;
};
