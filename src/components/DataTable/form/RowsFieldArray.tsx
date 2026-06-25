import { ComponentType, ReactElement } from 'react';
import { FieldArray as FinalFormFieldArray } from 'react-final-form-arrays';

interface IProps {
  children: () => ReactElement;
}

const FieldArrayComponent = FinalFormFieldArray as ComponentType<{
  name: string;
  children: () => ReactElement;
}>;

export function RowsFieldArray({ children }: IProps) {
  return <FieldArrayComponent name="rows">{children}</FieldArrayComponent>;
}
