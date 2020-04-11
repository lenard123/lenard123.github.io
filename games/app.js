if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./sw.js').then(function(reg) {
		console.log('Successfully registered service worker', reg)
	}).catch(function(err){
		console.warn('Error while registering service worker', err)
	})
}

window.addEventListener('online', function(e){
	console.log('You are online')
//	Page.hideOfflineWarning()
	Arrivals.loadData()
}, false)

window.addEventListener('offline', function(e){
	console.log('You are offline')
//	Page.showOfflineWarning();
}, false)


if(navigator.online) {
	Arrivals.loadData()
}