import { FormikProps } from 'formik';
import _ from 'lodash';
import React, { ReactElement } from 'react';
import ReactDatePicker from 'react-datepicker';

export interface FormikDatePickerProps<T> {
  id?: string;
  minDate?: Date;
  maxDate?: Date;
  locale?: string;
  testId?: string;
  name: string;
  label?: string;
  formik: FormikProps<T>;
  size?: 'sm' | 'lg';
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

function FormikDatePicker<T>({
  formik,
  locale,
  name,
  testId,
  minDate,
  maxDate,
  id,
  size,
}: FormikDatePickerProps<T>): ReactElement {
  return (
    <>
      <ReactDatePicker
        minDate={minDate}
        maxDate={maxDate}
        data-testid={testId ?? id ?? name}
        id={id ?? name}
        name={name}
        selected={_.get(formik.values, name)}
        className={`${size === 'sm' ? 'form-control-sm' : ''} form-control ${
          _.get(formik.errors, name) && _.get(formik.touched, name)
            ? 'is-invalid'
            : ''
        } ${
          !_.get(formik.errors, name) && _.get(formik.touched, name)
            ? 'is-valid'
            : ''
        }`}
        onChange={(evt) => {
          if (evt) {
            formik.setFieldValue(name, evt);
            return;
          }
          formik.setFieldValue(name, undefined);
        }}
        onBlur={(evt) => {
          formik.handleBlur(evt);
        }}
        locale={locale}
        dateFormat="P"
      />
    </>
  );
}

export default FormikDatePicker;
