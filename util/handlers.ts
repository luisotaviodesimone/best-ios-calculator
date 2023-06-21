import { letterCharactersRegex } from '../constants/characters';
import { ICalculatorState } from './calculator';

export const addCharacter = (
  value: string | number | undefined,
  state: ICalculatorState
): string => {
  const { currentValue } = state;

  if (!value) return currentValue;

  if (letterCharactersRegex.test(currentValue) || currentValue === '0') {
    return value.toString();
  }

  return `${state.currentValue}${value}`
};

export const removeCharacter = (state: ICalculatorState): string => {
  const {
    currentValue: mathExpression,
    pointerSelection: { start, end },
  } = state;

  if (mathExpression.length === 1) {
    return '0';
  }

  return `${mathExpression.slice(0, start - 1)}${mathExpression.slice(end)}`;
};

export const handleEqual = (state: ICalculatorState): ICalculatorState => {
  const { currentValue, previousValue } = state;

  const solvedMathExpression = eval(currentValue);

  return {
    ...state,
    currentValue: `${solvedMathExpression}`,
  };
};

export const handlePosNeg = (state: ICalculatorState): number => {
  const getPointerNumber = handleEqual(state); // TODO: get the closer number to the pointer

  const { currentValue: handleEqualResult } = getPointerNumber;

  return parseFloat(handleEqualResult) * -1;
};
