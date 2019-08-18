import './App.css';
import React from 'react';

function PomodoroDisplay() {
  return (
    <div className='pomo'>
      <h1 id='pomo-title'>Pomodoro</h1>
      <div className='break'>
        <p className='label' id='break-label'>Break Length</p>
        <p className='length' id='break-length'>5</p>
        <button className='dec' id='break-decrement'>👇</button> {/* eslint-disable-line */}
        <button className='inc' id='break-increment'>☝</button> {/* eslint-disable-line */}
      </div>
      <div className='session'>
        <p className='label' id='session-label'>Session Length</p>
        <p className='length' id='session-length'>25</p>
        <button className='dec' id='session-decrement'>👇</button> {/* eslint-disable-line */}
        <button className='inc' id='session-increment'>☝</button> {/* eslint-disable-line */}
      </div>
      <div className='timer'>
        <p id='timer-label'>Session</p>
        <p id='time-left'>00:00</p>
        <button id='start_stop'>⏯</button> {/* eslint-disable-line */}
        <button id='reset'>🔄</button> {/* eslint-disable-line */}
      </div>
    </div>
  )
};

function Display() {
  return (
    <div className='slate'>
      <PomodoroDisplay />
    </div>
  )
};

export default Display;
