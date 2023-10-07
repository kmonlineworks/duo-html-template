window.addEventListener('DOMContentLoaded', function () {
	// Text Animtion
	animateSmallText();
	// Navbar Scroll Animtion
	window.addEventListener('scroll', navbarAnimation);
	// Carousel Next and Preveiw Events
	carouselNextBtn.addEventListener('click', nextSlide);
	carouselPrevBtn.addEventListener('click', prevSlide);
	// Skillset Tab Event
	skillsetInit();
	tabs.forEach((tab) => {
		tab.addEventListener('click', tabSwitch);
	});
	// Portfolio Filter Event
	filterBtns.forEach((filterBtn) => {
		filterBtn.addEventListener('click', filterPortfolio);
	});
	// Mobile Menu Event
	mobileMenuBtn.addEventListener('click', mobileMenu);
});

// Navbar Mobile Menu ==========================================================
const mobileMenuBtn = document.querySelector('.navbar__mobile-menu');
function mobileMenu() {
	const navbarNav = document.querySelector('.navbar__nav');
	if (this.classList.contains('active')) {
		this.classList.remove('active');
		navbarNav.classList.remove('active');
		document.body.style.overflow = 'auto';
	} else {
		this.classList.add('active');
		navbarNav.classList.add('active');
		document.body.style.overflow = 'hidden';
	}
}

// Navbar Scroll Animation =====================================================
function navbarAnimation(e) {
	const navbar = document.querySelector('.navbar');
	if (this.scrollY >= 100) {
		navbar.classList.add('navbar--active');
	} else {
		navbar.classList.remove('navbar--active');
	}
}

// Text Waving Animation Function ==============================================
function animateSmallText() {
	// Showcase Small Text animation
	let smallText = document.querySelector('.showcase__left--text-content-small');
	let smallTextArray = [];
	if (smallText !== null) {
		for (var i = 0; i < smallText.innerText.length; i++) {
			smallTextArray.push(`<span>${smallText.innerText.charAt(i)}</span>`);
		}
		let st = smallTextArray.join('');
		smallText.innerHTML = st;

		textWaveEffect();
	}
}
function textWaveEffect() {
	let textSpan = document.querySelectorAll('.showcase__left--text-content-small span');
	textSpan.forEach((item, i) => {
		item.style.animationDelay = `${i * 100}ms`;
	});
}

// Carousel Scrolling Function =================================================
let carouselContainer = document.querySelector('.carousel__container');
let carousel = document.querySelector('.carousel__items');
let carouselItems = document.querySelector('.carousel__items--item');
let carouselPrevBtn = document.querySelector('.carousel__controls--item-left');
let carouselNextBtn = document.querySelector('.carousel__controls--item-right');
let carouselItemWidth = carousel.children[0].getBoundingClientRect().width;

let isPressed = false;
var xPosition, currentIndex;

carouselContainer.addEventListener('mouseenter', dragEnter);
carouselContainer.addEventListener('mouseleave', dragLeave);
carouselContainer.addEventListener('mousedown', dragPress);
carouselContainer.addEventListener('mousemove', dragMove);
window.addEventListener('mouseup', dragUnPress);

function dragEnter() {
	carouselContainer.style.cursor = 'grab';
}
function dragLeave() {
	currentPosition();
}
function dragPress(e) {
	isPressed = true;
	e.preventDefault();
	xPosition = e.pageX - carousel.offsetLeft;
	carouselContainer.style.cursor = 'grabbing';
	carousel.style.pointerEvents = 'none';
}
function dragMove(e) {
	if (!isPressed) return;
	e.preventDefault();
	carousel.style.left = `${e.offsetX - xPosition}px`;
	getBoundingClinet();
}
function dragUnPress() {
	isPressed = false;
	currentPosition();
	carouselContainer.style.cursor = 'grab';
	carousel.style.pointerEvents = 'auto';
}
function getBoundingClinet() {
	let container_x = carouselContainer.getBoundingClientRect();
	let carousel_x = carousel.getBoundingClientRect();

	if (parseInt(carousel.style.left) > 0) {
		carousel.style.left = 0;
	} else if (carousel_x.right < container_x.right) {
		carousel.style.left = `-${carousel_x.width - container_x.width}px`;
	}
}
function currentPosition() {
	let i = Math.abs(carousel.offsetLeft / carouselItemWidth);
	let iPosition;
	if (parseFloat(i.toFixed(1)) > parseFloat((i / 1.5).toFixed(1))) {
		iPosition = parseFloat(i.toFixed(0));
		carousel.style.left = `${-iPosition * carouselItemWidth}px`;
	}
}
function nextSlide() {
	carousel.style.left = `${carousel.offsetLeft}px`;
	let container_x = carouselContainer.getBoundingClientRect();
	let carousel_x = carousel.getBoundingClientRect();
	if (carousel_x.right > container_x.right + carouselItemWidth) {
		carousel.style.left = `${parseInt(carousel.style.left) - carouselItemWidth}px`;
	}
}
function prevSlide() {
	if (Math.abs(carousel.offsetLeft) > carouselItemWidth) {
		carousel.style.left = `${parseInt(carousel.style.left) + carouselItemWidth}px`;
	} else {
		carousel.style.left = 0;
	}
}

// Skillset Tabs Function ======================================================
const tabs = document.querySelectorAll('.skillset__tabs--tab');
let tabContent = document.querySelector('.skillset__tabarea--content');
function skillsetInit() {
	if (tabs.length > 0) {
		let activeTab = document.querySelector('#' + tabs[0].getAttribute('data-id'));
		tabContent.appendChild(activeTab.cloneNode(true));
	}
}
function tabSwitch() {
	for (var i = 0; i < tabs.length; i++) {
		tabs[i].classList.remove('active');
	}

	this.classList.add('active');
	const tabId = this.getAttribute('data-id');

	let tabData = document.querySelector('#' + tabId);
	tabContent.innerHTML = '';
	tabContent.appendChild(tabData.cloneNode(true));
}

// Portfolio Filter Function ===================================================
const filterBtns = document.querySelectorAll('.portfolio__header--links-button');
let portfolioItem = Array.from(document.querySelectorAll('.portfolio__items--item'));
function filterPortfolio() {
	if (this.classList.contains('btn')) {
		return;
	} else {
		filterBtns.forEach((btn) => {
			btn.classList.remove('btn');
		});
		this.classList.add('btn');
	}

	let btnId = this.getAttribute('data-id');
	const portfolioItems = document.querySelector('.portfolio__items');
	let images;

	if (btnId === 'all') {
		images = portfolioItem.map((item) => {
			return `<a class="${item.getAttribute('class')}" href="${item.getAttribute('href')}">
                <img style="transition:0.3s ease;animation:itemAnimation 0.3s linear forwards;" src="${item.children[0].getAttribute('src')}" data-category="${item.children[0].getAttribute('data-category')}" />
              </a>`;
		});
	} else {
		images = portfolioItem
			.filter((item) => item.children[0].getAttribute('data-category') === btnId)
			.map((item) => {
				return `<a class="${item.getAttribute('class')}" href="${item.getAttribute('href')}">
                <img style="transition:0.3s ease;animation:itemAnimation 0.3s linear forwards;" src="${item.children[0].getAttribute('src')}" data-category="${item.children[0].getAttribute('data-category')}" />
              </a>`;
			});
	}

	if (images.length === 0) return;
	portfolioItems.innerHTML = images.join('');
}

// Portfolio Counter ===========================================================
const counterItems = document.querySelectorAll('.portfolio__counter--item span');
function counter() {
	counterItems.forEach((item) => {
		let itemId = item.getAttribute('id');
		let itemValue = Number(item.getAttribute('data-value'));
		let itemText = item.textContent;
		for (var i = 0; i <= itemValue; i++) {
			timer(i, itemId);
		}
	});
}
function timer(i, itemId) {
	setTimeout(() => {
		document.getElementById(itemId).textContent = i;
	}, i);
}
let portfolioCounterOptions = {
	root: null,
	rootMargin: '50px',
	threshold: 1.0,
};
let portfolioCounter = (entries, portfolioCounterObserver) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			counter();
			portfolioCounterObserver.unobserve(document.querySelector('.portfolio__counter'));
		}
	});
};

if (counterItems.length !== 0) {
	let portfolioCounterObserver = new IntersectionObserver(portfolioCounter, portfolioCounterOptions);
	portfolioCounterObserver.observe(document.querySelector('.portfolio__counter'));
}
// ProgressBar Counter ===========================================================
const progressItems = document.querySelectorAll('.progressbar__right--items-item span');
function progressbarCounter() {
	progressItems.forEach((item) => {
		let itemId = item.getAttribute('id');
		let itemValue = Number(item.getAttribute('data-value'));
		let itemText = item.textContent;
		for (var i = 0; i <= itemValue * 100; i++) {
			progressbarTimer(i, itemId);
		}
	});
}
function progressbarTimer(i, itemId) {
	i = i / 100;
	if (i) {
		setTimeout(() => {
			document.getElementById(itemId).children[1].style.width = `${i}%`;
			document.getElementById(itemId).children[2].textContent = `${i}%`;
			document.getElementById(itemId).children[2].style.left = `${i}%`;
		}, i);
	}
}
let progressbarCounterOptions = {
	root: null,
	rootMargin: '50px',
	threshold: 1.0,
};
let progressbarCounterInit = (entries, progressbarCounterObserver) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			progressbarCounter();
			progressbarCounterObserver.unobserve(document.querySelector('.progressbar__right--items'));
		}
	});
};
if (progressItems.length !== 0) {
	let progressbarCounterObserver = new IntersectionObserver(progressbarCounterInit, progressbarCounterOptions);
	progressbarCounterObserver.observe(document.querySelector('.progressbar__right--items'));
}
