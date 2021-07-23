import React from 'react'
import { useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage,} from 'formik'
import { Link } from 'react-router-dom';
import * as Yup from 'yup'
import api from '../../API/quotesApi'
import './modifyStyles.scss'

const initialValues = {
    title : '',
    body : ''
}

const validationSchema = Yup.object({
    title: Yup.string().required('*Required'),
    body: Yup.string().required('*Required')
})

function Modify(props) {
    const quotesDetails = useSelector(store => store.quotes.details)
    const loading = useSelector(store => store.quotes.loading)
    const error = useSelector(store => store.quotes.error)

    const onSubmit = async (values, onSubmitProps) => {
        try {
            await api.quotes.updateQ(quotesDetails.id, values)
            alert('Modify Quote Succesfull! Redirecting to Home')
            props.history.goBack();
        } catch (error) {
            alert(error);
        }
        onSubmitProps.resetForm()
    }    

    return (
        <div className="container d-flex flex-column">
          <div className="container rose d-flex flex-column border border-dark p-5">
              { loading === true && (
              <div className="d-flex justify-content-center m-3">
                  <div className="spinner-border" role="status" />
              </div>
              )}
              { quotesDetails.body && (
                  <div className="d-flex flex-column">
                      <h1>Previous Quote</h1>
                      <span className="fw-bolder fs-3">Title:</span>
                      <span className="fs-3 p-2 pt-0">{quotesDetails.title}</span>
                      <span className="fw-bolder fs-3">Body:</span>
                      <span className="fs-3 p-2 pt-0">{quotesDetails.body}</span>
                  </div>
              )}
              {error && (
                  <h1>{error}</h1>
              )}
              {(!quotesDetails.body) && (loading === false) && (
                  <>
                    <h1>Error: Quotes not Found</h1>
                    <Link to='/' className="btn btn-dark btn-lg">Back</Link>
                  </>
              )}
          </div>
          { quotesDetails.body && (
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                  <Form className="container text-dark roseIntense border border-top-0 border-dark">
                      <h1>Modify Quote</h1>
                      <span className="fw-bolder fs-4">Id : {quotesDetails.id}</span>
                      <div className="form-floating m-3">
                          <Field type='text' className="form-control" id='title' name='title' placeholder="title" />
                          <label htmlFor='title'>Title</label>
                          <span className="text-danger d-flex fs-4"><ErrorMessage name='title' /></span>
                      </div>
                      <div className="form-floating m-3">
                          <Field type='text' className="form-control" id='body' name='body' placeholder="Body" />
                          <label htmlFor='body'>Body</label>
                          <span className="text-danger d-flex fs-4"><ErrorMessage name='body' /></span>
                      </div>
                      <button className="btn btn-dark btn-lg" type='submit'>Submit</button>
                      <Link to='/' className="btn btn-dark btn-lg">Back</Link>
                  </Form>
              </Formik>
          )}
        </div>
    )
}

export default Modify
