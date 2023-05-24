import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getImagesAPI from 'services/getImages-api';
import { Button } from 'components/Button/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './ImageGallery.module.css'


export function ImageGallery( {searchQuery, page, funcLoadMore} ) {
 
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('idle');
    const [totalPages, setTotalPages] = useState(0);
 
    useEffect(() => {

        if (!searchQuery) {
            return
        }

        if (page === 1) {
            setImages([]);
        }


        setStatus('pending')

        getImagesAPI
            .getImages(searchQuery, page)
            .then(images => {
                setImages(prevState =>
                    [...prevState, ...images.hits]);
                setStatus('resolved');
                setTotalPages(Math.floor(images.totalHits / 12));
            })
            .catch(error => {
                setError(error);
                setStatus('rejected');
            });
            
    }, [searchQuery, page]);
  



    

  
    
        
        if (status === 'idle') {
            console.log('start')
            return
        }
        if (status === 'pending') {
            console.log('load')
            return <Loader />     
        }

        if (status === 'rejected') {
            Notify.failure(error.message);
            return

        }
     
        if (images.length === 0) {
            return (
                <div className={css.notifySorry}>
                    <h1>Sorry, there are no images matching your search query. Please try again.</h1>
                </div>
            )
        }   

        if (status === 'resolved') {
            return (
                <>
                    <ul className={css.gallery}>
                        {images.map(image  => (
                            <ImageGalleryItem
                                key={image.id}
                                item={image}

                            />
                        ))}
                    </ul>
                    {page <= totalPages && (<Button onClick={funcLoadMore} />)}
                    
                </>
            )
        }
}


ImageGallery.propType = {
    searchQuery: PropTypes.string.isRequired,
};
