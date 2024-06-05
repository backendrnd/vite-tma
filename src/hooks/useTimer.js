import { useEffect, useRef } from 'react';
import { useForceUpdate } from './useForceUpdate.js';

export function useTimer(seconds) {
    const forceUpdate = useForceUpdate();
    const intervalRef = useRef(undefined);

    useEffect(() => {
        if (seconds) {
            intervalRef.current = setInterval(() => {
                console.log('HERE', seconds);
                if (seconds > 0) {
                    forceUpdate();
                }
            }, 1000);
        }
        return () => {
            clearInterval(intervalRef.current);
            intervalRef.current = undefined;
        };
    }, [forceUpdate, seconds]);

    return [seconds];
}
