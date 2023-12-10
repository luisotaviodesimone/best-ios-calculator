import { isDivisionOrMultiplicationRegex, isLetterCharacterRegex, isOperatorRegex } from '../constants/regexs';
import { ICalculatorState } from './calculator';
import { insertCharacter, insertParenthesis } from './formatting';

export const addOperator = (
  value: string | number,
  state: ICalculatorState
): Partial<ICalculatorState> | undefined => {
  const { currentValue: mathExpression, pointerSelection } = state;
  const letterBefore = mathExpression[pointerSelection.start - 1];
  const letterAfter = mathExpression[pointerSelection.end];

  const shouldNotAddOperator =
    !!letterBefore?.match(isOperatorRegex) ||
    !!letterAfter?.match(isOperatorRegex) ||
    mathExpression === '0' ||
    isLetterCharacterRegex.test(mathExpression);

  if (shouldNotAddOperator) {
    return;
  }

  return {
    previousValue: mathExpression,
    currentValue: insertCharacter(
      mathExpression,
      pointerSelection,
      value.toString()
    ),
    pointerSelection: {
      start: pointerSelection.start + 1,
      end: pointerSelection.end + 1,
    },
  };
};

export const addParenthesis = (
  state: ICalculatorState
): Partial<ICalculatorState> | undefined => {
  const { currentValue: mathExpression, pointerSelection } = state;

  const [currentValue, offset] = insertParenthesis(mathExpression, pointerSelection);

  return {
    previousValue: mathExpression,
    currentValue,
    pointerSelection: {
      start: pointerSelection.start + offset,
      end: pointerSelection.end + offset,
    },
  };
};

export const addNumber = (
  value: string | number,
  state: ICalculatorState
): string => {
  const { currentValue: mathExpression, pointerSelection } = state;

  const shouldSubstituteAllExpression =
    isLetterCharacterRegex.test(mathExpression) || mathExpression === '0';

  if (shouldSubstituteAllExpression) {
    return value.toString();
  }

  const updatedMathExpression = insertCharacter(
    mathExpression,
    pointerSelection,
    value.toString()
  );

  return updatedMathExpression;
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
