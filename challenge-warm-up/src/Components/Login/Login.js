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
            <Form className="container d-flex flex-column text-dark bg-secondary border border-dark p-5">
                <h1>Login</h1>
                <div className="form-floating m-3">
                    <Field type='text' className="form-control" id='floatingEmail' name='email' placeholder="Email" />
                    <label htmlFor='floatingEmail'>Email</label>
                    <span className="text-danger d-flex fs-4"><ErrorMessage name='email' /></span>
                </div>
                <div className="form-floating m-3">
                    <Field type='password' className="form-control" id='floatingPassword' name='password' placeholder="Password" />
                    <label htmlFor='floatingPassword'>Password</label>
                    <span className="text-danger d-flex fs-4"><ErrorMessage name='password' /></span>
                </div>
                <button className="btn btn-dark btn-lg" type='submit'>Submit</button>
            </Form>
        </Formik>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};

export default Login
