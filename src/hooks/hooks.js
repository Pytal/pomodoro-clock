import { useState, useEffect, useRef } from 'react';
import { createContainer } from 'unstated-next';


const TimerHook = createContainer(useTimerHook);
function useTimerHook() {
  const [running, setRunning] = useState(false);

  const [_break, setBreak] = useState(5);
  const incBreak = () => { if (!running && _break < 60) setBreak( _break => _break + 1 ) };
  const decBreak = () => { if (!running && _break > 1) setBreak( _break => _break - 1 ) }

  const [session, setSession] = useState(25);
  const incSession = () => { if (!running && session < 60) setSession( session => session + 1 ) }
  const decSession = () => { if (!running && session > 1) setSession( session => session - 1 ) }

  const beep = document.getElementById('beep');
  const isSession = useRef(true);
  const [timer, setTimer] = useState(`${session}:00`);
  const [interv, setInterv] = useState('');

  useEffect(() => {
    if ( `${session}`.length === 1 ) { setTimer( `0${session}:00` ) }
    else { setTimer( `${session}:00` ) }
  }, [session])

  function startStop() {
    !running ? setRunning(true) : setRunning(false);
  };

  useEffect(() => {
    let [min, sec] = timer.split(':').map( a => Number(a) );
    let finalMin, finalSec;

    if (!running) { clearInterval(interv) }
    else {
      setInterv(
        setInterval(() => {
          if (sec === 0) {
            if (min === 0) {
              if ( isSession.current ) { min = _break; isSession.current = false }
              else { min = session; isSession.current = true }
              sec += 1;
              beep.play() }
            else if (min > 0) { min -= 1; sec = 60 } }

          sec -= 1;
          finalMin = (min.toString().length === 1) ? `0${min}` : min;
          finalSec = (sec.toString().length === 1) ? `0${sec}` : sec;
          setTimer( `${finalMin}:${finalSec}` );
        }, 1000)
      )  
    }
  }, [running]) // eslint-disable-line

  function reset() {
    const beep = document.getElementById('beep');

    setBreak(5);
    setSession(25);
    setTimer( `25:00` );
    setRunning(false);
    isSession.current = true;
    beep.load();
    clearInterval(interv);
  };

  return { _break, incBreak, decBreak,
           session, incSession, decSession,
           timer, isSession,
           startStop, reset }
};

export { TimerHook };
