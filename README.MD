## Ionic integrate Facebook

A simple application using Ionic integrated Facebook. Get albums from Facebook and display the entire pictures of album and preview image.

### Getting Started

1. Create an Ionic project

2. Add the inappbrowser plugin to your project
  
  `ionic plugin add cordova-plugin-inappbrowser`

3. copy `openfb.js` to your project and import it in your `index.html`

4. Create a Facebook app here: https://developers.facebook.com/apps. In the advanced settings, make sure you declare a “Valid OAuth redirect URI”. For example, if during development you must declare http://localhost:8100/oauthcallback.html as a valid redirect URI. Also add https://www.facebook.com/connect/login_success.html as a Valid OAuth redirect URI for access from Cordova.

5. Copy the Facebook App Id and paste it as the first argument of the OpenFB.init() method invocation in the run() function in app.js.

Note:
  * You need copy the `oauthcallback.html` to you project, otherwise the you can not  complete login and redirect `index.html`.
  * More details you can check `openFB.service.js`

### Screenshots

<img src="/screenshots/albums.jpg?raw=true" alt="albums" height="400px">
<img src="/screenshots/photos.jpg?raw=true" alt="photos" height="400px">
<img src="/screenshots/photo-preview.jpg?raw=true" alt="preview" height="400px">

