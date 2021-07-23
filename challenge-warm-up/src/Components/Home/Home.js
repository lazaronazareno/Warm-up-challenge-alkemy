import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getQuotes, isLoading, getDetails } from '../../Redux/reducers';
import './homeStyles.scss';

const Home = () => {
    const dispatch = useDispatch();

    const quotesList = useSelector(store => store.quotes.quotesList)
    const error = useSelector(store => store.quotes.error)
    const loading = useSelector(store => store.quotes.loading)

    useEffect(() => {
        dispatch(isLoading())
        dispatch(getQuotes())
        return ;
    // eslint-disable-next-line
        }, [])

        let handleDetails = (id) => {
            dispatch(isLoading())
            dispatch(getDetails(id))
        }
        let handleEdit = (id) => {
            dispatch(isLoading())
            dispatch(getDetails(id))
        }
        let handleDelete = (id) => {
            console.log('delete', id)
        }
        
    return (
        <div className="container-fluid h-100">
            <h1>POSTS </h1>
            <Link to="/new" className="btn btn-dark">New</Link>
            { loading === true && (
            <div className="d-flex justify-content-center m-3">
                <div className="spinner-border" role="status" />
            </div>
          )}
          <div className="container-fluid d-flex flex-wrap justify-content-center">
            {quotesList.map((quotes) => (
                <div className="bg-light border border-dark p-2 hover">
                    <span className="text-wrap">{quotes.title}</span>
                    <div>
                        <Link to="/details" className="btn btn-outline-dark" id={quotes.id} onClick={() => handleDetails(quotes.id)}>Details</Link>
                        <Link to="/edit" className="btn btn-outline-dark" id={quotes.id} onClick={() => handleEdit(quotes.id)}>Edit</Link>
                        <button  className="btn btn-outline-dark" id={quotes.id} onClick={() => handleDelete(quotes.id)}>Delete</button>
                    </div>
                </div>
            ))}
          </div>
          {error && (
              <h1>{error}</h1>
          )}
        </div>
    )
}

export default Home
