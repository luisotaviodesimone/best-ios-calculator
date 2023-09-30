import { ISelection } from './formatting';
import {
  addNumber,
  handlePosNeg,
  handleEqual,
  removeCharacter,
  addOperator,
  addParenthesis,
} from './handlers';

export interface ICalculatorState {
  currentValue: string;
  previousValue: string | null;
  pointerSelection: ISelection;
}

export const initialState: ICalculatorState = {
  currentValue: '0',
  previousValue: '',
  pointerSelection: {
    start: 0,
    end: 0,
  },
};

export type CalculatorAction =
  | 'number'
  | 'operator'
  | 'equal'
  | 'clear'
  | 'posneg'
  | 'parenthesis'
  | 'selection'
  | 'delete';

const calculatorLogic = (
  type: CalculatorAction,
  value: number | string | undefined | ISelection,
  state: ICalculatorState
) => {
  const { currentValue, previousValue, pointerSelection } = state;
  let result: ICalculatorState;

  switch (type) {
    case 'selection':
      result = {
        ...state,
        pointerSelection: value as ISelection,
      };
      break;

    case 'number':
      result = {
        ...state,
        currentValue: addNumber(value as number | string, state),
        pointerSelection: {
          start: pointerSelection.start + 1,
          end: pointerSelection.end + 1,
        },
      };
      break;

    case 'clear':
      result = initialState;
      break;

    case 'posneg':
      result = {
        ...state,
        currentValue: handlePosNeg(state).toString(),
        previousValue: state.currentValue,
      };
      break;

    case 'parenthesis':
      result = {
        ...state,
        ...addParenthesis(state),
      };
      break;

    case 'delete':
      result = {
        ...state,
        previousValue: state.currentValue,
        currentValue: removeCharacter(state),
        pointerSelection: {
          start: pointerSelection.start - 1,
          end: pointerSelection.end - 1,
        },
      };
      break;

    case 'operator':
      result = {
        ...state,
        // currentValue: addNumber(value as number | string, state),
        ...addOperator(value as number | string, state),
      };
      break;

    case 'equal':
      result = {
        ...handleEqual(state),
      };

      break;

    default:
      result = { ...state };
      break;
  }

  console.log(
    `\n🚀Calculator State Ending🚀:\n${JSON.stringify(result, null, 2)}\n`
  );

  return result;
};

export default calculatorLogic;
