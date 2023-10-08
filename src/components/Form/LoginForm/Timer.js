import React, { useEffect } from 'react';

const Timer = (props) => {

    const { seconds, setSeconds, isActive, setIsActive } = props;
  
    useEffect(() => {

        let interval;

        if (isActive && seconds > 0) {
            interval = setInterval(() => {
                setSeconds(seconds - 1);
            }, 1000);
        }

        if (seconds === 0) {
            setIsActive(false);
            clearInterval(interval);
        }

        return () => {
        clearInterval(interval);
        };

        // eslint-disable-next-line
    }, [isActive, seconds]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return <span className='mx-1'>in {formatTime(seconds)}</span>
}

export default Timer;