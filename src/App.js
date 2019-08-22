import './App.css';
import React from 'react';
import { TimerHook } from './hooks/hooks';


// TODO: 👉 show break in timer-label when timer reaches 00:00
//       👉 implement break countdown when timer reaches 00:00
//       👉 add beep audio when break or timer reaches 00:00

// DONE: ✅ implement initial timer functionality
//       ✅ merge inc and dec functions into handlers


function PomodoroDisplay() {
  const timerhook = TimerHook.useContainer();

  return (
    <div className='pomo'>
      <h1 id='pomo-title'>Pomodoro</h1>
      <div className='break'>
        <p className='label' id='break-label'>Break Length</p>
        <p className='length' id='break-length'>{timerhook._break}</p>
        <button
          onClick={() => timerhook.handleBreak('dec')}
          className='dec'
          id='break-decrement'>
          <div className='decbtn'>👇</div> {/* eslint-disable-line */}
        </button>
        <button
          onClick={() => timerhook.handleBreak('inc')}
          className='inc'
          id='break-increment'>
          <div className='incbtn'>☝</div> {/* eslint-disable-line */}
        </button>
      </div>
      <div className='session'>
        <p className='label' id='session-label'>Session Length</p>
        <p className='length' id='session-length'>{timerhook.session}</p>
        <button
          onClick={() => timerhook.handleSession('dec')}
          className='dec'
          id='session-decrement'>
          <div className='decbtn'>👇</div> {/* eslint-disable-line */}
        </button>
        <button
          onClick={() => timerhook.handleSession('inc')}
          className='inc'
          id='session-increment'>
          <div className='incbtn'>☝</div> {/* eslint-disable-line */}
        </button>
      </div>
      <div className='timer'>
        <p id='timer-label'>Session</p>
        <p id='time-left'>{timerhook.timer}</p>
        <button
          onClick={timerhook.startStop}
          id='start_stop'>
          <div className='timerbtn'>⏯</div> {/* eslint-disable-line */}
        </button>
        <button
          onClick={timerhook.reset}
          id='reset'>
          <div className='timerbtn'>🔄</div> {/* eslint-disable-line */}
        </button>
      </div>
    </div>
  )
};

function Display() {
  return (
    <div className='slate'>
      <div className='backdrop'/>
      <TimerHook.Provider>
        <PomodoroDisplay />
      </TimerHook.Provider>
    </div>
  )
};

export default Display;
