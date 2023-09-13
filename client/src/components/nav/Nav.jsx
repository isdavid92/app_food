import style from './Nav.module.css';
import logOut from './assets/img/buttonLogOut.png';
import home from './assets/img/buttonHome.png';
import search from './assets/img/search.png'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { addPage, getRecipesTitle, } from '../../redux/actions';
import { useState } from 'react';

const Nav = () => {
    const name = useSelector(state => state.name);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const [ title, setTitle ] = useState('');

    const handleHome = () => {
        dispatch(addPage(1));
        navigate('/home')
    }

    const handleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch()
          }
    }

    const handleSearch = () => {
        dispatch(getRecipesTitle(title));
        navigate('/search')
    }

    return(
        <nav>
            <div className={style.shadeBar}/>
            <div className={style.bar}>
                <h1 className={style.greeting}>Hi {name}!...</h1>
                <h1 className={style.greeting}>search recipe:</h1>
                <input type="text" className={style.input} placeholder='your recipe here...' onChange={handleChange} onKeyPress={handleKeyPress}/>
                <img src={search} className={style.search} title='search' onClick={() => handleSearch()}/>
                {
                    pathname !== '/home' &&
                    <img src={home} className={style.home} title='home' onClick={() => handleHome()}/>
                }
                <Link to={'/'} className={style.linklogOut}>
                    <img src={logOut} className={style.logOut} title='log out'/>
                </Link>
            </div>
            <div className={style.options}>
                <h3 className={style.chef}>The Chef´s Secret</h3>
                {
                    pathname == '/home' &&
                    <>
                        <Link to={'/form'} className={style.Linkcreate}>
                            <h1 className={style.shadeCreate}>{'create your recipe here O'}</h1>
                            <h1 className={style.create}>{'create your recipe here🥧'}</h1>
                        </Link>
                        <Link to={'/filter'} className={style.linkFilter}>
                            <h1 className={style.shadeFilter}>{'filter and sort >>'}</h1>
                            <h1 className={style.filter}>{'filter and sort >>'}</h1>
                        </Link>
                    </>
                }
            </div>
        </nav>
    )
};

export default Nav