import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css'
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ item }) => {

  const [showModal, setShowModal] = useState(false);

  const { webformatURL, tags, largeImageURL } = item;

   
  const modalOpen = (modalOpen ) => {
    setShowModal(modalOpen, true);
  };
    

  const modalClose = () => {
    setShowModal(false);
  };
 

  return (
    <>
      <li className={css.galeryItem}
        onClick={event => {
          event.preventDefault();
          modalOpen({ largeImageURL, tags });
        }}>
        <img src={webformatURL} alt={tags} loading="lazy" className={css.image} />
    </li>
    
        {showModal && (
        <Modal modalOpen={modalOpen} modalClose={modalClose}>
                <div className={css.modalContent}>
                    <img src={largeImageURL} alt={tags} loading="lazy" />
                </div>
        </Modal>
      )}
      </>
  );  
};


ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};




