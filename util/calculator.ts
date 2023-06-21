import { ISelection } from './formatting';
import {
  addCharacter,
  handlePosNeg,
  handleEqual,
  removeCharacter,
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
    start: 1,
    end: 1,
  },
};

export type CalculatorAction =
  | 'number'
  | 'operator'
  | 'equal'
  | 'clear'
  | 'posneg'
  | 'percentage'
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
        currentValue: addCharacter(value as number | string, state),
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

    case 'percentage':
      result = {
        ...state,
        previousValue: state.currentValue,
        currentValue: 'Not implemented yet'
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
        previousValue: state.currentValue,
        currentValue: addCharacter(value as number | string, state),
        pointerSelection: {
          start: pointerSelection.start + 1,
          end: pointerSelection.end + 1,
        },
      };
      break;

    case 'equal':
      result = handleEqual(state);
      break;

    default:
      result = { ...state };
      break;
  }

  return result;
};

export default calculatorLogic;
