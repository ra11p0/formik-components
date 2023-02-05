/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormikProps } from 'formik';
import _ from 'lodash';
import React, { ReactElement } from 'react';
import { InputGroup } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import style from './common.module.css';

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
      <InputGroup className="flex-nowrap">
        <span className="input-group-text">
          <FontAwesomeIcon icon={faCalendarDays} />
        </span>
        <ReactDatePicker
          minDate={minDate}
          maxDate={maxDate}
          data-testid={testId ?? id ?? name}
          id={id ?? name}
          name={name}
          selected={_.get(formik.values, name)}
          className={`${
            size === 'sm' ? 'form-control-sm' : ''
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          } form-control ${style['border-left-no-radius']}  ${
            _.get(formik.errors, name) && _.get(formik.touched, name)
              ? 'is-invalid'
              : ''
          } ${
            !_.get(formik.errors, name) && _.get(formik.touched, name)
              ? 'is-valid'
              : ''
          }`}
          onSelect={(val) => {
            formik.setFieldValue(name, val);
          }}
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
      </InputGroup>
    </>
  );
}

export default FormikDatePicker;
