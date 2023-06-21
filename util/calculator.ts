import { addCharacter, handlePosNeg, handleEqual } from './handlers';

export interface ICalculatorState {
  currentValue: string;
  previousValue: string | null;
  operator?: number | string | null;
}

export const initialState: ICalculatorState = {
  currentValue: '0',
  previousValue: '',
  operator: '',
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
  value: number | string | undefined,
  state: ICalculatorState
) => {
  let result: ICalculatorState;

  switch (type) {
    case 'number':
      result = { ...state, currentValue: addCharacter(value, state) };
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
        operator: value,
        previousValue: state.currentValue,
        currentValue: '0',
      };
      break;

    case 'equal':
      result = handleEqual(state);
      break;

    default:
      result = {...state};
      break;
  }

  return result;
};

export default calculatorLogic;
