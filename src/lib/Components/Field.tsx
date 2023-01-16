import { FormikProps } from 'formik';

export default interface Field<T> {
  testId?: string;
  id?: string;
  name: string;
  label?: string;
  value?: string;
  type?:
    | 'date'
    | 'switch'
    | 'password'
    | 'email'
    | 'textarea'
    | 'checkbox'
    | 'radio';
  formik?: FormikProps<T>;
  size?: 'sm' | 'lg';
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  showErrorsDespiteTouching?: boolean;
  hideValidation?: boolean;
}
