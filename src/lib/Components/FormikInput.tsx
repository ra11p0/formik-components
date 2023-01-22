import 'bootstrap/dist/css/bootstrap.css';
import 'react-datepicker/dist/react-datepicker.css';
import { FormikProps, useFormikContext } from 'formik';
import _ from 'lodash';
import { ReactElement } from 'react';
import { Form } from 'react-bootstrap';
import Field from './Field';
import FormikDatePicker, { FormikDatePickerProps } from './FormikDatePicker';
import FormikValidationLabel from './FormikValidationLabel';
import Label from './Label';

function FormikInput<T>(
  props: Field<T> & ({} | FormikDatePickerProps<T>)
): ReactElement {
  const formikContext = props.formik ? undefined : useFormikContext<T>();

  const formik = (p: Field<T>): FormikProps<T> => p.formik ?? formikContext!;

  const isFieldValid = (p: Field<T>): boolean =>
    !_.get(formik(p).errors, p.name) && _.get(formik(p).touched, p.name);

  const isFieldInvalid = (p: Field<T>): boolean =>
    _.get(formik(p).errors, p.name) && _.get(formik(p).touched, p.name);

  return (
    <Form.Group>
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
                    _.get(formik(props).values, props.name).toString() ===
                    props.value?.toString()
                  }
                  value={props.value}
                  onChange={(evt) => {
                    formik(props).handleChange(evt);
                    if (props.onChange) props.onChange(evt);
                  }}
                  onBlur={formik(props).handleBlur}
                  isInvalid={isFieldInvalid(props)}
                  isValid={isFieldValid(props)}
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
                  checked={_.get(formik(props).values, props.name)}
                  onChange={(evt) => {
                    formik(props).handleChange(evt);
                    if (props.onChange) props.onChange(evt);
                  }}
                  value={props.value}
                  onBlur={formik(props).handleBlur}
                  isInvalid={isFieldInvalid(props)}
                  isValid={isFieldValid(props)}
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
                  checked={_.get(formik(props).values, props.name)}
                  onChange={(evt) => {
                    formik(props).handleChange(evt);
                    if (props.onChange) props.onChange(evt);
                  }}
                  value={props.value}
                  onBlur={formik(props).handleBlur}
                  isInvalid={isFieldInvalid(props)}
                  isValid={isFieldValid(props)}
                />
              </>
            );
          case 'date':
            return (
              <>
                <Label
                  label={props.label ?? props.name}
                  for={props.name}
                  size={props.size}
                />
                <FormikDatePicker {...props} formik={formik(props)} />
              </>
            );
          case 'textarea':
            return (
              <>
                <Label
                  label={props.label ?? props.name}
                  for={props.name}
                  size={props.size}
                />
                <textarea
                  data-testid={props.testId ?? props.id ?? props.name}
                  className="form-control"
                  id={props.id ?? props.name}
                  name={props.name}
                  onChange={(evt: any) => {
                    formik(props).handleChange(evt);
                    if (props.onChange) props.onChange(evt);
                  }}
                  onBlur={formik(props).handleBlur}
                  value={
                    _.get(formik(props).values, props.name) ?? props.value ?? ''
                  }
                />
              </>
            );
          default:
            return (
              <>
                <Label
                  label={props.label ?? props.name}
                  for={props.name}
                  size={props.size}
                />
                <Form.Control
                  size={props.size}
                  data-testid={props.testId ?? props.id ?? props.name}
                  id={props.id ?? props.name}
                  name={props.name}
                  type={props.type ?? 'text'}
                  onChange={(evt: any) => {
                    formik(props).handleChange(evt);
                    if (props.onChange) props.onChange(evt);
                  }}
                  isInvalid={isFieldInvalid(props)}
                  isValid={isFieldValid(props)}
                  onBlur={formik(props).handleBlur}
                  value={
                    _.get(formik(props).values, props.name) ?? props.value ?? ''
                  }
                />
              </>
            );
        }
      })()}
      {!props.hideValidation && (
        <FormikValidationLabel
          {...props}
          showDespiteTouching={props.showErrorsDespiteTouching}
          formik={formik(props)}
        />
      )}
    </Form.Group>
  );
}

export default FormikInput;
