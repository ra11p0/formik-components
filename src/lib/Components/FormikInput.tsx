import { FormikProps, useFormikContext } from 'formik';
import _ from 'lodash';
import React, { ReactElement } from 'react';
import { Form } from 'react-bootstrap';
import FormikDatePicker, { FormikDatePickerProps } from './FormikDatePicker';
import FormikValidationLabel from './FormikValidationLabel';

interface Props<T> {
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
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  showErrorsDespiteTouching?: boolean;
  hideValidation?: boolean;
}

function FormikInput<T>(
  props: Props<T> & ({} | FormikDatePickerProps)
): ReactElement {
  const formikContext = useFormikContext<T>();
  const formik = (): FormikProps<T> => props.formik ?? formikContext;
  return (
    <Form.Group className="m-1 p-1">
      {(() => {
        switch (props.type) {
          case 'radio':
            return (
              <>
                <Form.Check
                  data-testid={props.testId ?? props.id ?? props.name}
                  type="radio"
                  id={`${props.id ?? props.name}.val.${props.value!}`}
                  name={props.name}
                  label={props.label ?? props.name}
                  checked={
                    _.get(formik().values, props.name).toString() ===
                    props.value?.toString()
                  }
                  value={props.value}
                  onChange={(evt) => {
                    formik().handleChange(evt);
                    if (props.onChange) props.onChange(evt);
                  }}
                  onBlur={formik().handleBlur}
                  isInvalid={
                    _.get(formik().errors, props.name) &&
                    _.get(formik().touched, props.name)
                  }
                  isValid={
                    !_.get(formik().errors, props.name) &&
                    _.get(formik().touched, props.name)
                  }
                />
              </>
            );
          case 'switch':
            return (
              <>
                <Form.Check
                  data-testid={props.testId ?? props.id ?? props.name}
                  type="switch"
                  id={props.id ?? props.name}
                  name={props.name}
                  label={props.label ?? props.name}
                  checked={_.get(formik().values, props.name)}
                  onChange={(evt) => {
                    formik().handleChange(evt);
                    if (props.onChange) props.onChange(evt);
                  }}
                  onBlur={formik().handleBlur}
                  isInvalid={
                    _.get(formik().errors, props.name) &&
                    _.get(formik().touched, props.name)
                  }
                  isValid={
                    !_.get(formik().errors, props.name) &&
                    _.get(formik().touched, props.name)
                  }
                />
              </>
            );
          case 'checkbox':
            return (
              <>
                <Form.Check
                  data-testid={props.testId ?? props.id ?? props.name}
                  type="checkbox"
                  id={props.id ?? props.name}
                  name={props.name}
                  label={props.label ?? props.name}
                  checked={_.get(formik().values, props.name)}
                  onChange={(evt) => {
                    formik().handleChange(evt);
                    if (props.onChange) props.onChange(evt);
                  }}
                  onBlur={formik().handleBlur}
                  isInvalid={
                    _.get(formik().errors, props.name) &&
                    _.get(formik().touched, props.name)
                  }
                  isValid={
                    !_.get(formik().errors, props.name) &&
                    _.get(formik().touched, props.name)
                  }
                />
              </>
            );
          case 'date':
            return (
              <>
                <Form.Label htmlFor={props.name}>
                  {props.label ?? props.name}
                </Form.Label>
                <FormikDatePicker {...props} formik={formik()} />
              </>
            );
          case 'textarea':
            return (
              <>
                {props.label !== '' && (
                  <Form.Label htmlFor={props.name}>
                    {props.label ?? props.name}
                  </Form.Label>
                )}

                <textarea
                  data-testid={props.testId ?? props.id ?? props.name}
                  className="form-control"
                  id={props.id ?? props.name}
                  name={props.name}
                  onChange={(evt: any) => {
                    formik().handleChange(evt);
                    if (props.onChange) props.onChange(evt);
                  }}
                  onBlur={formik().handleBlur}
                  value={_.get(formik().values, props.name) ?? ''}
                />
              </>
            );
          default:
            return (
              <>
                <Form.Label htmlFor={props.name}>
                  {props.label ?? props.name}
                </Form.Label>
                <Form.Control
                  data-testid={props.testId ?? props.id ?? props.name}
                  className="form-control"
                  id={props.id ?? props.name}
                  name={props.name}
                  type={props.type ?? 'text'}
                  onChange={(evt: any) => {
                    formik().handleChange(evt);
                    if (props.onChange) props.onChange(evt);
                  }}
                  isInvalid={
                    _.get(formik().errors, props.name) &&
                    _.get(formik().touched, props.name)
                  }
                  isValid={
                    !_.get(formik().errors, props.name) &&
                    _.get(formik().touched, props.name)
                  }
                  onBlur={formik().handleBlur}
                  value={_.get(formik().values, props.name) ?? ''}
                />
              </>
            );
        }
      })()}
      {!props.hideValidation && (
        <FormikValidationLabel
          {...props}
          showDespiteTouching={props.showErrorsDespiteTouching}
          formik={formik()}
        />
      )}
    </Form.Group>
  );
}

export default FormikInput;
