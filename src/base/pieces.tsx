import React from 'react';

const style = {
  display: 'none'
};

const pieces = () =>
<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
  <defs>
    <g id="alpha" fill="none">
      <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="4"/>
      <circle cx="32" cy="32" r="16" stroke="currentColor" strokeWidth="4"/>
    </g>
    <path id="beta" d="M48 12L16 52h32L16 12h32z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path id="gamma" d="M34 16a2 2 0 10-4 0h4zM8 38a2 2 0 100 4v-4zm48 4a2 2 0 100-4v4zm-5.59-17.59a2 2 0 10-2.82-2.82l2.82 2.82zm-34-2.82a2 2 0 10-2.82 2.82l2.82-2.82zM8 42h24v-4H8v4zm24 0h24v-4H32v4zm0-16c3.87 0 7.36 1.56 9.9 4.1l2.83-2.83A17.95 17.95 0 0032 22v4zm9.9 4.1A13.95 13.95 0 0146 40h4c0-4.97-2.02-9.47-5.27-12.73L41.9 30.1zm2.83 0l5.68-5.69-2.82-2.82-5.69 5.68 2.83 2.83zM18 40c0-3.87 1.56-7.36 4.1-9.9l-2.83-2.83A17.95 17.95 0 0014 40h4zm4.1-9.9A13.95 13.95 0 0132 26v-4c-4.97 0-9.47 2.02-12.73 5.27l2.83 2.83zm0-2.83l-5.69-5.68-2.82 2.82 5.68 5.69 2.83-2.83zM34 24v-8h-4v8h4z" fill="currentColor"/>
    <path id="delta" d="M32 12l1.41-1.41a2 2 0 00-2.82 0L32 12zM12 32l-1.41-1.41a2 2 0 000 2.82L12 32zm20 20l-1.41 1.41a2 2 0 002.82 0L32 52zm20-20l1.41 1.41a2 2 0 000-2.82L52 32zM30.59 10.59l-20 20 2.82 2.82 20-20-2.82-2.82zm-20 22.82l20 20 2.82-2.82-20-20-2.82 2.82zm22.82 20l20-20-2.82-2.82-20 20 2.82 2.82zm20-22.82l-20-20-2.82 2.82 20 20 2.82-2.82zM30 12v40h4V12h-4z" fill="currentColor"/>
  </defs>
</svg>;

export default pieces;