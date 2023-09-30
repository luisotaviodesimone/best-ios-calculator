import { isNumberRegex } from '../constants/regexs';

export interface ISelection {
  start: number;
  end: number;
}

export const insertCharacter = (
  expression: string,
  { start, end }: ISelection,
  replacement: string
) => {
  const startExpression = expression.slice(0, start);

  const endExpression = expression.slice(end);

  return `${startExpression}${replacement}${endExpression}`;
};

export const insertParenthesis = (
  expression: string,
  { start, end }: ISelection
): [string, number] => {

  let rightParenthesisCount = 0;

  for (let index = start; index > 0; index--) {
    if (expression[index] === ')') {
      rightParenthesisCount++;
    } else if (expression[index] === '(') {
      rightParenthesisCount--;
    }
    
    if (rightParenthesisCount < 0) {
      if (expression[end]?.match(isNumberRegex)) {
        return [insertCharacter(expression, { start, end }, ')*'), 2];
      } else {
        return [insertCharacter(expression, { start, end }, ')'), 1];
      }
    }
  }

  if (expression[start - 1]?.match(isNumberRegex)) {
    return [insertCharacter(expression, { start, end }, '*('), 2];
  }
  return [insertCharacter(expression, { start, end }, '('), 1];
};
