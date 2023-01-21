import { FormikProps } from 'formik';

type FieldType =
  | 'date'
  | 'switch'
  | 'password'
  | 'email'
  | 'textarea'
  | 'checkbox'
  | 'radio';

export default interface Field<T> extends DateFieldType {
  testId?: string;
  id?: string;
  name: string;
  label?: string;
  value?: string;
  type?: FieldType;
  formik?: FormikProps<T>;
  size?: 'sm' | 'lg';
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  showErrorsDespiteTouching?: boolean;
  hideValidation?: boolean;
}

export interface DateFieldType {
  minDate?: Date;
  maxDate?: Date;
}
