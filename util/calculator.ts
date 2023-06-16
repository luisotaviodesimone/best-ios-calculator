export interface ICalculatorState {
  currentValue: string;
  operator: string;
  previousValue: string;
}

export const initialState: ICalculatorState = {
  currentValue: '0',
  operator: '',
  previousValue: '',
};

export const handleNumber = (value: any, state: ICalculatorState) => {
  if (state.currentValue === '0') {
    return { currentValue: `${value}` };
  }

  return {
    currentValue: `${state.currentValue}${value}`,
  };
};

const handleEqual = (state: ICalculatorState) => {
  const { currentValue, previousValue, operator } = state;

  const current = parseFloat(currentValue);
  const previous = parseFloat(previousValue);
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

// calculator function
const calculator = (type: any, value: any, state: ICalculatorState) => {
  switch (type) {
    case 'number':
      return handleNumber(value, state);

    case 'clear':
      return initialState;

    case 'posneg':
      return {
        currentValue: `${parseFloat(state.currentValue) * -1}`,
      };

    case 'percentage':
      return {
        currentValue: `${parseFloat(state.currentValue) * 0.01}`,
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

export default calculator;
