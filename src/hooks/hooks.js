import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';

const TimerHook = createContainer(useTimerHook);
function useTimerHook() {
  const [_break, setBreak] = useState(5);
  function handleBreak(inc_or_dec) {
    if (!running) {
      if (inc_or_dec === 'inc' && _break < 60) { setBreak( _break => _break + 1 ) }
      else if (_break > 1) { setBreak( _break => _break - 1 ) };
    }
  };

  const [session, setSession] = useState(25);
  function handleSession(inc_or_dec) {
    if (!running) {
      if (inc_or_dec === 'inc' && session < 60) { setSession( session => session + 1 ) }
      else if (session > 1) { setSession( session => session - 1 ) };
    }
  };

  const [timer, setTimer] = useState(`${session}:00`);
  const [running, setRunning] = useState(false);
  const [interv, setInterv] = useState('');

  useEffect(() => {
    (session.toString().length === 1) ?
      setTimer( `0${session}:00` ) :
      setTimer( `${session}:00` );
  }, [session])

  useEffect(() => {
    let [min, sec] = timer.split(':').map( a => parseInt(a) );
    let finalMin, finalSec;

    if (!running) { clearInterval(interv) }
    else {
      setInterv(
        setInterval(() => {
          if (sec === 0) { min -= 1; sec = 60 };
          sec -= 1;
          // format to string and set timer
          finalMin = (min.toString().length === 1) ? `0${min}` : min;
          finalSec = (sec.toString().length === 1) ? `0${sec}` : sec;
          setTimer( `${finalMin}:${finalSec}` );
        }, 1000)
      )  
    }
  }, [running]) // eslint-disable-line

  function startStop() {
    (!running) ? setRunning(true) : setRunning(false);
  };

  function reset() {
    setBreak(5);
    setSession(25);
    setTimer( `${session}:00` );
    setRunning(false);
    clearInterval(interv);
  };

  return { _break, handleBreak, session, handleSession, timer, running, startStop, reset }
};

export { TimerHook };
