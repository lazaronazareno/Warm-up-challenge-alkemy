import React from 'react'
import { Formik, Form, Field, ErrorMessage,} from 'formik'
import { Link } from 'react-router-dom';
import * as Yup from 'yup'
import api from '../../API/quotesApi'

const initialValues = {
    title : '',
    body : ''
}

const validationSchema = Yup.object({
    title: Yup.string().required('*Required'),
    body: Yup.string().required('*Required')
})

const onSubmit = async (values, onSubmitProps) => {
    try {
        await api.quotes.postQ(values)
        alert('Quote Succesfully uploaded')
    } catch (error) {
        alert(error);
    }
    onSubmitProps.resetForm()
}

function NewQuote() {
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className="container text-dark bg-secondary border border-dark">
            <h1>New Quote</h1>
            <div className="form-floating m-3">
                <Field type='text' className="form-control" id='title' name='title' placeholder="title" />
                <label htmlFor='title'>Title</label>
                <span className="text-danger d-flex fs-5"><ErrorMessage name='title' /></span>
            </div>
            <div className="form-floating m-3">
                <Field type='text' className="form-control" id='body' name='body' placeholder="Body" />
                <label htmlFor='body'>Body</label>
                <span className="text-danger d-flex fs-5"><ErrorMessage name='body' /></span>
            </div>
            <button className="btn btn-dark btn-lg" type='submit'>Submit</button>
            <Link to='/' className="btn btn-dark btn-lg">Back</Link>
        </Form>
    </Formik>
    )
}

export default NewQuote
