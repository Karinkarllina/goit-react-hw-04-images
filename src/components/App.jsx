import { useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import css from './App.module.css'


export function App() {
  
  const [searchQuery, setsearchQuery] = useState('');

  const handleSubmit = searchQuery => {
    setsearchQuery(searchQuery);
  };

    return (
      <div className={css.App}>
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery searchQuery={searchQuery}/>
      </div>
  );
  
}

