import React from 'react'
import { Formik, Form, Field, ErrorMessage,} from 'formik'
import PropTypes from 'prop-types';
import * as Yup from 'yup'
import loginApi from '../../API/loginApi'

const initialValues = {
    email : '',
    password : ''
}

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required')
})

function Login({ setToken }) {
    const onSubmit = async (values, onSubmitProps) => {
        const token = await loginApi.login.accept(values);
        setToken(token)
        if(token.error){
            alert(token.error)
        }
        onSubmitProps.resetForm()
    }
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form className="card text-dark bg-secondary">
                <div className="form-floating m-3">
                    <Field type='text' className="form-control" id='floatingEmail' name='email' placeholder="Email" />
                    <label htmlFor='floatingEmail'>Email</label>
                    <ErrorMessage name='email' />
                </div>
                <div className="form-floating m-3">
                    <Field type='password' className="form-control" id='floatingPassword' name='password' placeholder="Password" />
                    <label htmlFor='floatingPassword'>Password</label>
                    <ErrorMessage name='password' />
                </div>
                <button className="btn btn-primary btn-lg" type='submit'>submit</button>
            </Form>
        </Formik>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};

export default Login
