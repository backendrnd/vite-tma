import { useEffect, useRef, useState } from 'react';

export default function useTimer(initialSeconds) {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [timeout, setTimeout] = useState(initialSeconds);
    const timerRef = useRef(0);
    const onTimerEndRef = useRef();

    const startTimer = (seconds, onTimerEnd) => {
        onTimerEndRef.current = onTimerEnd;
        setTimeout(seconds);
    };

    useEffect(() => {
        setSeconds(timeout);
        if (!timeout) {
            return;
        }
        timerRef.current = Math.floor(Date.now() / 1000);
        const interval = setInterval(() => {
            const value = timerRef.current + timeout - Math.floor(Date.now() / 1000);
            setSeconds(value);
            if (value <= 0) {
                clearInterval(interval);
                onTimerEndRef.current && onTimerEndRef.current();
                setTimeout(0);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [timeout]);

    return [seconds, startTimer];
}
