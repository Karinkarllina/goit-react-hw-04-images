import { useState } from 'react';
import PropTypes from 'prop-types';
import getImagesAPI from 'services/getImages-api';
import { Button } from 'components/Button/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './ImageGallery.module.css'


export function ImageGallery() {

    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('idle');
    const [totalPages, setTotalPages] = useState(0);
    const [showModal, setShowModal] = useState(false);
  
    // componentDidUpdate(prevProps, prevState) {
    //     const { page } = this.state;
    //     const prevQuery = prevProps.searchQuery;
    //     const nextQuery = this.props.searchQuery;

    //     if (prevQuery !== nextQuery || prevState.page !== page) {
    //         this.setState({ status: 'pending' });
            
    //          if (prevQuery !== nextQuery)  {
    //         this.setState({page: 1})
    //       }

    //             getImagesAPI
    //                 .getImages(nextQuery, page)
    //                 .then(images => {
    //                     this.setState(prevState => ({
    //                         images: page === 1 ? images.hits : [...prevState.images, ...images.hits],
    //                         status: 'resolved',
    //                         totalPages: Math.floor(images.totalHits / 12),
    //                     }));
    //                 })
    //                 .catch(error => this.setState({ error, status: 'rejected' }));
            
    //     } 

    // }


    const btnLoadMore = () => {
    setPage(prevState =>  prevState + 1 );
    };

    const toggleModal = () => {
    setShowModal(!showModal);
  };

        
        if (this.state.status === 'idle') {
            console.log('start')
            return
        }
        if (this.state.status === 'pending') {
            console.log('load')
            return <Loader />     
        }

        if (this.state.status === 'rejected') {
            Notify.failure("Error!");
            return

        }
     
        if (this.state.images.length === 0) {
            return (
                <div className={css.notifySorry}>
                    <h1>Sorry, there are no images matching your search query. Please try again.</h1>
                </div>
            )
        }   

        if (this.state.status === 'resolved') {
            return (
                <>
                    <ul className={css.gallery}>
                        {this.state.images.map(image  => (
                            <ImageGalleryItem
                                    key={image.id}
                                    item={image}
                                    imageOpen={this.modalOpen}
                                />
                        ))}
                    </ul>

                    { page <= totalPages && (<Button onClick={btnLoadMore}/>)}
                    
                    {showModal && (
                        <Modal modalOpen={toggleModal} modalClose={toggleModal}/>
                    )}
                </>
            )
        }
}


ImageGallery.propType = {
  searchQuery: PropTypes.string.isRequired,
};
