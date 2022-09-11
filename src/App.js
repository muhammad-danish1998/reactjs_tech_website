import React from 'react'
import Pagination from './compoents/Pagination'
import Search from './compoents/Search'
import Stories from './compoents/Stories'
import { ContextProvider } from './Context'
import "./App.css";

const App = () => {
  return (
    <div>
      <ContextProvider>
        <Search />
        <Pagination />
        <Stories />
      </ContextProvider>
      {/* https://hn.algolia.com/api/v1/search? */}
    </div>
  )
}

export default App