import { FormikProps } from 'formik';
import _ from 'lodash';
import { ReactElement } from 'react';
import { Collapse } from 'react-bootstrap';
import Label from './Label';

interface Props<T> {
  name: string;
  size?: 'sm' | 'lg';
  formik: FormikProps<T>;
  showDespiteTouching?: boolean;
}
function FormikValidationLabel<T>(props: Props<T>): ReactElement {
  const hasError = (): boolean =>
    !!(
      _.get(props.formik.errors, props.name) &&
      (props.showDespiteTouching ?? _.get(props.formik.touched, props.name))
    );
  const getErrorText = (props: Props<T>): string => {
    return typeof _.get(props.formik.errors, props.name) === 'string' &&
      hasError()
      ? _.get(props.formik.errors, props.name)
      : '';
  };
  return (
    <Collapse in={hasError()}>
      <Label
        label={getErrorText(props)}
        size={props.size}
        className="invalid-feedback d-block"
      />
    </Collapse>
  );
}

export default FormikValidationLabel;
