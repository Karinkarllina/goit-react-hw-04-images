import { useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import css from './App.module.css'


export function App() {
  
  const [searchQuery, setsearchQuery] = useState('');
  const [page, setPage] = useState(1);
 

  const handleSubmit = searchQueryBar => {
    setsearchQuery(searchQueryBar);


    if (searchQueryBar !== searchQuery) {
      setPage(1)
    }
    
  };

  const btnLoadMore = () => {
    setPage(prevState =>  prevState + 1 );
  };


    return (
      <div className={css.App}>
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery searchQuery={searchQuery} page={page} funcLoadMore={btnLoadMore} />
        
      </div>
  );
  
}

