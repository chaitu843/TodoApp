

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(24);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(10);

var _App = __webpack_require__(247);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(405).polyfill();

var appId = 'app-wrapper';
_reactDom2.default.render(_react2.default.createElement(
	_reactRouterDom.BrowserRouter,
	null,
	_react2.default.createElement(_App2.default, null)
), document.getElementById('app-wrapper'));

/**
 * 
 * Firebase Setup
 */

var config = {
	apiKey: 'AIzaSyBhI8nDQw4C8QRejTkXpxjN1Ar-Lkjrivw',
	authDomain: 'leoburnett-altria-185831.firebaseapp.com',
	databaseURL: 'https://leoburnett-altria-185831.firebaseio.com',
	projectId: 'leoburnett-altria-185831',
	storageBucket: 'leoburnett-altria-185831.appspot.com',
	messagingSenderId: '310057816027'
};

if ('serviceWorker' in navigator) {
	firebase.initializeApp(config);
	var messaging = firebase.messaging();
	messaging.requestPermission().then(function () {
		return messaging.getToken();
	}).then(function (token) {
		console.log(token);
		window.localStorage.setItem('deviceToken', token);
	}).catch(function (err) {
		console.log('No Permission!! ', err);
	});

	messaging.onMessage(function (payload) {
		console.log('Message received. ', payload);
	});

	navigator.serviceWorker.register('firebase-messaging-sw.js').then(function (registration) {
		if ('sync' in registration) {
			console.log('Set reg in store !!!');
			store.reg = registration;
		}
		console.log('Registration successful, scope is:', registration.scope);
	}).catch(function (err) {
		console.log('Service worker registration failed, error:', err);
	});
}

//////////////////
// WEBPACK FOOTER
// ./client/src/index.js
// module id = 70
// module chunks = 0
