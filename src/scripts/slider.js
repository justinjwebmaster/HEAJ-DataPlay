/* SLIDESHOW */

const slides = [
	{
		"image":"cour_vue_haut.png"
	},
    {
		"image":"cour.jpg"
	},
	{
		"image":"long_a.jpg"
	},
	{
		"image":"bat_a_vue.jpg"
	},
	{
		"image":"bat_a.jpg"
	},
	{
		"image":"box.jpg"
	}
]

const slideshow = document.querySelectorAll(".slideshow");
const numberSlides = slideshow.length;
const next = document.querySelector(".arrow--right");
const previous = document.querySelector(".arrow--left");
let count = 0;

const dots = document.querySelectorAll(".dot");
const numberDots = dots.length;
let countDots= 0;

function nextSlide() {
	slideshow[count].classList.remove("active");

	if(count < numberSlides - 1){
		count++;
	}
	else {
		count = 0;
	}
	slideshow[count].classList.add("active");
	console.log(count);
}
function nextDot() {
	dots[countDots].classList.remove("dot--selected");

	if(countDots < numberDots - 1){
		countDots++;
	}
	else {
		countDots = 0;
	}
	dots[countDots].classList.add("dot--selected");
	console.log(countDots);
}

next.addEventListener("click", nextSlide);

function previousSlide() {
	slideshow[count].classList.remove("active");

	if(count > 0){
		count--;
	}
	else {
		count = numberSlides - 1;
	}
	slideshow[count].classList.add("active");
	console.log(count);
}
function previousDot() {
	dots[countDots].classList.remove("dot--selected");

	if(countDots > 0){
		countDots--;
	}
	else {
		countDots = numberDots - 1;
	}
	dots[countDots].classList.add("dot--selected");
	console.log(countDots);
}

previous.addEventListener("click", previousSlide);
