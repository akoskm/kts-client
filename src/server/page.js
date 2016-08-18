import React from 'react';
import { render } from 'react-dom';

module.exports = (req, scriptFilename) => {

  return render(
    <html class='no-js' lang=''>
      <body>
        <div id='app' />
        <script src='App.js' />
      </body>
    </html>
  );
};
