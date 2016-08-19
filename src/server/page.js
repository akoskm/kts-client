function generate(req, scriptFilename) {
  return '<html lang=\'en\'>\
    <head>\
      <title>KTS Client</title>\
    </head>\
    <body>\
      <div id=\'app\' />\
    </body>\
    <script src=\'App.js\' />\
  </html>';
}

export default { generate };
