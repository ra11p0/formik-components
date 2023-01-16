import React, { ReactElement } from 'react';
import { Form } from 'react-bootstrap';

interface Props {
  label?: string;
  size?: 'sm' | 'lg';
  for?: string;
  className?: string;
}

function Label(props: Props): ReactElement {
  if (props.size === 'sm')
    return (
      <small className={props.className}>{props.label ?? props.for}</small>
    );
  else
    return (
      <Form.Label htmlFor={props.for} className={props.className}>
        {props.label ?? props.for}
      </Form.Label>
    );
}

export default Label;
