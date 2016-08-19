import React from 'react';
import { render } from 'react-dom';

module.exports = (req, scriptFilename) =>
  <html lang='en'>
    <head>
      <title>KTS Client</title>
    </head>
    <body>
      <div id='app' />
    </body>
    <script src='App.js' />
  </html>;
