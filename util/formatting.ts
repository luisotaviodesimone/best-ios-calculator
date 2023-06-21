export interface ISelection {
  start: number;
  end: number;
}

export const replaceCharacters = (
  expression: string,
  { start, end }: ISelection,
  replacement: string
) => {
  const startExpression = expression.slice(0, start);

  const endExpression = expression.slice(end);

  return `${startExpression}${replacement}${endExpression}`;
};
