import React from 'react'
import { Formik, Form, Field, ErrorMessage,} from 'formik'
import * as Yup from 'yup'
import api from '../../API/quotesApi'

const initialValues = {
    title : '',
    body : ''
}

const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    body: Yup.string().required('Required')
})

const onSubmit = async (values, onSubmitProps, e) => {
    e.preventDefault();
    try {
        await api.quotes.postQ(values)
    } catch (error) {
        alert(error);
    }
    console.log(values)
    console.log(onSubmitProps)
}

function NewQuote() {
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className="container text-dark bg-secondary border border-primary">
            <h1>New Quote</h1>
            <div className="form-floating m-3">
                <Field type='text' className="form-control" id='floatingTitle' name='title' placeholder="title" />
                <label htmlFor='floatingTitle'>Title</label>
                <span className="text-danger d-flex fs-4"><ErrorMessage name='title' /></span>
            </div>
            <div className="form-floating m-3">
                <Field type='text' className="form-control" id='floatingBody' name='body' placeholder="Body" />
                <label htmlFor='floatingBody'>Body</label>
                <span className="text-danger d-flex fs-4"><ErrorMessage name='body' /></span>
            </div>
            <button className="btn btn-dark btn-lg" type='submit'>Submit</button>
        </Form>
    </Formik>
    )
}

export default NewQuote
