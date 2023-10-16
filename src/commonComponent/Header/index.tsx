import './styles.scss'
import { Link, createSearchParams, useNavigate } from 'react-router-dom';
import { GoSearch } from "react-icons/go";
import { useEffect, useState } from 'react';

const Header = () => {
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [active, setIsActive] = useState<boolean>(false)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!searchQuery) return
        navigate({
            pathname: 'movie',
            search: createSearchParams({ search: searchQuery }).toString()
        })
        setSearchQuery('')
    }

    useEffect(() => {
        const changeHeaderBg = () => {
            const body = document.body;

            if (window.scrollY > 0 || (body.classList.contains("no-scroll") && parseFloat(body.style.top) * -1 > 0)) {
                setIsActive(true);
            } else {
                setIsActive(false);
            }
        };

        window.addEventListener("scroll", changeHeaderBg);

        return () => {
            window.removeEventListener("scroll", changeHeaderBg);
        };
    }, []);

    return (
        <header
            className={`header ${active&&'header-bg'}`}
        >
            <nav className='header__nav'>
                <Link to={'/'} className="header__nav__logo" />

                <form className="header__searchbox" onSubmit={(e) => handleSubmit(e)}>
                    <input
                        type='text'
                        placeholder='Search Movie Title...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type='submit' className='header__searchbox__btn'>
                        <GoSearch />
                    </button>
                </form>

            </nav>
        </header>
    );
};

export default Header;