import React from 'react';
import CardItem from './CardItem';
import './Cards.css';

function Cards() {
    return (
        <div className='cards'>
            <h1>Evolving eViral Partners</h1>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        <CardItem 
                        src='images/kyubiworld.png'
                        text='Kyubi World - NFTs: A place for aspiring artists to flourish'
                        label='Kyubi World'
                        path={{ pathname: "https://www.kyubi.world"}} 
                        />
                        <CardItem 
                        src='images/basedevlogo.png'
                        text='BaseDev - Get Ahead in BlockChain Technology'
                        label='Dev/Ed'
                        path={{ pathname: "https://www.basedev.app/"}} 
                        />
                    </ul>
                </div>
            </div>
        </div>            
    );
}

export default Cards;
