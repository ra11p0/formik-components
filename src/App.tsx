import { Formik } from 'formik';
import { ReactElement } from 'react';
import { Stack } from 'react-bootstrap';
import { FormikInput } from './lib/main';

function App(): ReactElement {
  return (
    <>
      <Stack className="m-1 p-1">
        <Formik initialValues={{ date: '' }} onSubmit={() => {}}>
          <FormikInput name={'date'} type="date" />
        </Formik>
      </Stack>
    </>
  );
}

export default App;
