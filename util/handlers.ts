import { letterCharactersRegex } from '../constants/characters';
import { ICalculatorState } from './calculator';
import { replaceCharacters } from './formatting';

export const addCharacter = (
  value: string | number,
  state: ICalculatorState
): string => {
  const { currentValue: mathExpression, pointerSelection } = state;

  if (letterCharactersRegex.test(mathExpression) || mathExpression === '0') {
    return value.toString();
  }

  return replaceCharacters(mathExpression, pointerSelection, value.toString());
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
