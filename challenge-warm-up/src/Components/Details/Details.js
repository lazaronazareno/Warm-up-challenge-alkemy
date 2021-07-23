import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './detailsStyles.scss'


const Details = () => {
    const quotesDetails = useSelector(store => store.quotes.details)
    const loading = useSelector(store => store.quotes.loading)
    const error = useSelector(store => store.quotes.error)

    return (
        <div className="rose d-flex flex-column border border-dark p-5">
            { loading === true && (
            <div className="d-flex justify-content-center m-3">
                <div className="spinner-border" role="status" />
            </div>
          )}
            { quotesDetails.body && (
                <div className="d-flex flex-column">
                    <h1>Body</h1>
                    <span className="fs-3 p-2">{quotesDetails.body}</span>
                    <Link to="/" className="btn btn-dark">Back</Link>
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
    )
}

export default Details
