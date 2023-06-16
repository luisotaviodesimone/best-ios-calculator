import { handleNumber, handlePosNeg, handleEqual } from './handlers';

export interface ICalculatorState {
  currentValue: string;
  previousValue?: string | null;
  operator?: string | null;
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
  | 'percentage';

const calculatorLogic = (
  type: CalculatorAction,
  value: number | string | undefined,
  state: ICalculatorState
) => {
  // const result: ICalculatorState = { ...state };

  switch (type) {
    case 'number':
      return handleNumber(value, state);

    case 'clear':
      return initialState;

    case 'posneg':
      return {
        currentValue: handlePosNeg(state).toString(),
      };

    case 'percentage':
      return {
        currentValue: 'Not implemented yet',
      };

    case 'operator':
      return {
        operator: value,
        previousValue: state.currentValue,
        currentValue: '0',
      };

    case 'equal':
      return handleEqual(state);

    default:
      return state;
  }
};

export default calculatorLogic;
