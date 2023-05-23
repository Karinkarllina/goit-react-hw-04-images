import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css'
import { BsFillSearchHeartFill } from "react-icons/bs";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


export function Searchbar({ onSubmit} ) {

    const [searchQuery, setsearchQuery] = useState('');
    
    const handleChange = (event) => {
    setsearchQuery(event.currentTarget.value.toLowerCase());
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (searchQuery.trim() === '') {
            Notify.info('Please enter your request and try again');
            return 
        }
        onSubmit(searchQuery);
    };

    return (   
    <header className={css.searchbar}>
        <form className={css.form} onSubmit={handleSubmit}>
            <button type="submit" className={css.buttonSerach}>
                    <span className={css.buttonLabel}>
                        <BsFillSearchHeartFill size="22" />
                    </span>
            </button>
            <input
                className={css.input}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                value={searchQuery}
                onChange={handleChange}
            />
        </form>
    </header>
    );
}
    


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};