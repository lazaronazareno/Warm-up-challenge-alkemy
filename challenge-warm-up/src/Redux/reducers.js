import api from '../API/quotesApi'

const initialState = {
    "quotesList" : [],
    "details" : [],
    "loading" : false,
    "error" : null,
}

const GET_QUOTES = 'GET_QUOTES';
const GET_DETAILS = 'GET_DETAILS';
const IS_LOADING = 'IS_LOADING';
const DELETE_QUOTE = 'DELETE_QUOTE';

export default function reducer (state = initialState, action) {
    console.log(action)
    switch (action.type) {
        case GET_QUOTES : 
        if(action.payload.response === 'error') {
            return {
                ...state,
                error : action.payload.error,
                loading: false
            }
        } else {
            return {
                ...state,
                quotesList : action.payload,
                details : [],
                loading: false,
            }
        }
        case GET_DETAILS : 
        if(action.payload.response === 'error') {
            return {
                ...state,
                error : action.payload.error,
                loading: false
            }
        } else {
            return {
                ...state,
                details : action.payload,
                loading: false,
            }
        }
        case IS_LOADING :
            return {
                ...state,
                loading: action.payload,
            }
        case DELETE_QUOTE :
            if(action.payload.response === 'error') {
                return {
                    ...state,
                    error: action.payload.error,
                    quotesList : [],
                    loading : false
                }
            }else {
                return {
                    ...state,
                    quotesList : state.quotesList.filter(quotes => quotes.id !== action.payload),
                    loading: false
                }
            }
        default:
            return state;
    }
}

export const getQuotes = () => async (dispatch, getState) => {
    try {
        const data = await api.quotes.getQ()
        dispatch({
            type : GET_QUOTES,
            payload : data,
        })
    } catch (error) {
        dispatch ({
            type: GET_QUOTES,
            payload: error,
        })
    }
}

export const getDetails = (id) => async (dispatch, getState) => {
    try {
        const data = await api.quotes.getIdQ(id)
        dispatch({
            type : GET_DETAILS,
            payload : data,
        })
    } catch (error) {
        dispatch ({
            type: GET_DETAILS,
            payload: error,
        })
    }
}

export const isLoading = () => (dispatch, getState) => {
    dispatch({
        type: IS_LOADING,
        payload : true
    })
}

export const deleteQuote = (id) => async (dispatch, getState) => {
    try {
        await api.quotes.removeQ(id)
        dispatch({
            type: DELETE_QUOTE,
            payload : id
        })
    } catch (error) {
        dispatch({
            type: DELETE_QUOTE,
            payload : error
        })
    }

}