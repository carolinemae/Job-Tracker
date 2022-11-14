import React from 'react';
import Loading from '../../images/loading-gif.gif';

const LoadingScreen = () => {
    return (
        <div className='center'>
            <img src={Loading} className='loading' alt='loading'></img>
        </div>
    );
};

export default LoadingScreen;