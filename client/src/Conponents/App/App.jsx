import React from 'react'
import CreateForm from '../CreateForm/CreateHeroForm';
import HeroList from '../HeroList/HeroList';
import icon from './Super_shield.svg';
import './app.scss'

export default function App() {


    return (
        <>
            <div className='header container' color='info'>
                <h1 className="header__title">
                    <img src={icon} alt="superman shield" className='header__icon' />
                     Heroes</h1>
            </div>
            <div className="app container">
                <CreateForm />
                <HeroList />
            </div>
        </>
    )
}
