const navBurger = document.querySelector('#navBurger');
const navLinks = document.querySelector('#navLinks');
const projectCards = document.querySelector('#project-cards').children;

navBurger.addEventListener('click', () => {
	if(navLinks.classList.contains('hidden')) navLinks.classList.remove('hidden');
	else navLinks.classList.add('hidden')
})
