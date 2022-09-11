const reducer = (state, action) => {
    switch (action.type) {
        // ================ case for loading =============== 
        case "SET_LOADING":
            return {
                ...state,
                isLoading: true,
            };
        // ================ case for Get stories =============== 

        case "GET_STORIES":
            return {
                ...state,
                isLoading: false,
                hits: action.payload.hits,
                nbPages: action.payload.nbPages,
            }
        // ================ case for remove stories =============== 
        
            case "REMOVE_POST":
                return {
                  ...state,
                  hits: state.hits.filter(
                    (curElem) => curElem.objectID !== action.payload
                  ),
                };
        // ================ case for search stories =============== 

                case "SEARCH_QUERY":
                    return {
                      ...state,
                      query: action.payload,
                    };
        // ================ case for pagination stories =============== 

        case "NEXT_PAGE":
            let pageNumInc = state.page + 1;
      
            if (pageNumInc >= state.nbPages) {
              pageNumInc = 0;
            }
            return {
              ...state,
              page: pageNumInc,
            };
      
          case "PREV_PAGE":
            let pageNum = state.page - 1;
      
            if (pageNum <= 0) {
              pageNum = 0;
            }
      
            return {
              ...state,
              page: pageNum,
            };
                   
    }
        // ============== By default state return ============ 
    return state;
}

export default reducer;