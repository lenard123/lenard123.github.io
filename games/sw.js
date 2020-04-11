
var cacheName = 'v1:static'

self.addEventListener('install', function(e) {
	e.waitUntil(
		caches.open(cacheName).then(function(cache) {
			return cache.addAll([
				'./index.html',
				'./app.js',
				'./app.css',
				'./icons/2048.ico',
				'./icons/connect_4.png',
				'./icons/snake.png',
				'./icons/tic_tac_toe.png',
				'./snake/app.css',
				'./snake/app.js',
				'./snake/index.html',
				'./tic_tac_toe/app.css',
				'./tic_tac_toe/app.js',
				'./tic_tac_toe/index.html'
			]).then(function(){
				self.skipWaiting();
			})
		})
	)
})

self.addEventListener('fetch', function(event){
	event.respondWith(
		caches.match(event.request).then(function(response){
			if (response) {
				return response
			}
			return fetch(event.request)
		})
	)
})
