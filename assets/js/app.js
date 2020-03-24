
function mostrarMenuMobile(e) {
	e.preventDefault();
	mobileMenu.classList.toggle('is-visible')
}

var mobileMenu = document.querySelector('.mobile-menu')
var triggerMenu = document.querySelectorAll('.trigger-menu')

for( var t of triggerMenu){
	t.addEventListener('click', mostrarMenuMobile)
}

function toggleDark() {
	var element = document.body;
	element.classList.toggle("dark-mode");
}

function toggleIcon(x) {
	x.classList.toggle("fa-sun");
}
