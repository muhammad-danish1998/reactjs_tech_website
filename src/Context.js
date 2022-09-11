import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from './reducer'

// =========  initial State ======= 

const initialState = {
    isLoading: true,
    query: "html",
    nbPages: 0,
    page: 0,
    hits: [],
};

let API = "https://hn.algolia.com/api/v1/search?";

// =========== create context ============= 

const Appcontext = createContext();

// ============= context provider =========== 

const ContextProvider = ({ children }) => {

// ============ use Reducer ========== 
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchApiData = async (url) => {
// ========== dispatch for loading ============ 
        dispatch({ type: "SET_LOADING" });

        try {
            const res = await fetch(url);
            const data = await res.json();
// ========== dispatch for Get Stories ============  
            dispatch({
                type: "GET_STORIES",
                payload: {
                    hits: data.hits,
                    nbPages: data.nbPages,
                }

            })
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }
    //=========== to remove the post ===============
  const removePost = (post_ID) => {
    dispatch({ type: "REMOVE_POST", payload: post_ID });
  };
    //=========== to Search the post ===============

  const searchPost = (searchQuery) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: searchQuery,
    });
  };

  // =========== pagination ============
  
  const getNextPage = () => {
    dispatch({
      type: "NEXT_PAGE",
    });
  };

  const getPrevPage = () => {
    dispatch({
      type: "PREV_PAGE",
    });
  };

    useEffect(() => {
        fetchApiData(`${API}query=${state.query}&page=${state.page}`);
    }, [state.query,state.page])

    return (
        <Appcontext.Provider value={{ ...state, removePost, searchPost,  getNextPage, getPrevPage }}>
            {children}
        </Appcontext.Provider>
    )
};

// ============= custom hook ================= 
const useGlobalContext = () => {
    return useContext(Appcontext)
}

export { Appcontext, ContextProvider, useGlobalContext }

