import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getQuotes, isLoading, getDetails, deleteQuote, sumNum, decNum } from '../../Redux/reducers';
import './homeStyles.scss';

const Home = () => {
    const dispatch = useDispatch();

    const quotesList = useSelector(store => store.quotes.quotesList)
    const error = useSelector(store => store.quotes.error)
    const loading = useSelector(store => store.quotes.loading)
    const numberPage = useSelector(store => store.quotes.numberPage)

    useEffect(() => {
        dispatch(isLoading())
        dispatch(getQuotes(numberPage))
        return ;
    // eslint-disable-next-line
        }, [numberPage])

        let handleDetails = (id) => {
            dispatch(isLoading())
            dispatch(getDetails(id))
        }
        let handleEdit = (id) => {
            dispatch(isLoading())
            dispatch(getDetails(id))
        }
        let handleDelete = id => {
            dispatch(isLoading())
            dispatch(deleteQuote(id))
        }
        
    return (
        <div className="container-fluid d-flex flex-column justify-content-center align-items-center mt-4">
            <div className="container-fluid d-flex justify-content-around">
              <h1>POSTS </h1>
              <Link to="/new" className="btn btn-dark mb-2">New</Link>
            </div>
            { loading === true && (
            <div className="d-flex justify-content-center m-3">
                <div className="spinner-border" role="status" />
            </div>
          )}
          <div className="container-fluid d-flex flex-wrap justify-content-evenly">
            {quotesList.map((quotes) => (
                <div className="bg-light d-flex flex-column border border-dark p-3 hover" key={quotes.id}>
                    <span>Title:</span>
                    <span className="text-wrap">{quotes.title}</span>
                    <div className="d-flex justify-content-evenly">
                        <Link to="/details" className="btn btn-dark" id={quotes.id} onClick={() => handleDetails(quotes.id)}>Details</Link>
                        <Link to="/edit" className="btn btn-dark" id={quotes.id} onClick={() => handleEdit(quotes.id)}>Edit</Link>
                        <button className="btn btn-dark" id={quotes.id} onClick={() => handleDelete(quotes.id)}>Delete</button>
                    </div>
                </div>
            ))}
          </div>
          <div className="container d-flex justify-content-evenly p-2">
            { numberPage > 1 && loading === false && (
                <button className="btn btn-lg btn-dark" onClick={() => dispatch(decNum(numberPage))}>Prev Page</button>
            )}
            { loading === false && (
                <span className="fs-4">Page {numberPage}</span>
            )}
            { numberPage < 5 && loading === false && (
                <button className="btn btn-lg btn-dark" onClick={() => dispatch(sumNum(numberPage))}>Next Page</button>
            )}

          </div>
          {error && (
              <h1>{error}</h1>
          )}
        </div>
    )
}

export default Home
