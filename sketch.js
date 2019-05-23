let w = 960;
let h = 540;

let dots = [];
let interpolatedDots = [];

const totalSplines = 100;

class Dot {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

function setup() {
	createCanvas(w, h);
}

function draw() {
	background(250);

	showFunction();
	showDots();
	interpolate();
}

function showDots() {
	push();
	rectMode(1);
	stroke(255, 0, 0);
	fill(255, 0, 0);
	dots.forEach(d => {
		ellipse(d.x, d.y, 10);
	});
	pop();
}

function showFunction() {
	push();
	rectMode(1);
	stroke(0, 0, 0);
	fill(0, 0, 0);
	noFill();
	beginShape();
	interpolatedDots.forEach(d => {
		vertex(d.x, d.y);
	});
	endShape();
	pop();
}

function interpolate() {
	interpolatedDots = [];
	if (dots.length < 2) return;

	const firstDot = dots[0];
	const lastDot = dots[dots.length - 1];
	const delta = (lastDot.x - firstDot.x) / totalSplines;
	for (let x = firstDot.x; x <= lastDot.x; x += delta) {
		const y = calculateLinearCombination(x);
		interpolatedDots.push(new Dot(x, y))
	}
}

function calculateLinearCombination(x) {
	let L = 0;
	for (let j = 0; j < dots.length; j++) {
		let l = 1;
		for (let m = 0; m < dots.length; m++) {
			if (m === j) continue;

			l *= (x - dots[m].x) / (dots[j].x - dots[m].x)
		}

		L += dots[j].y * l;
	}
	return L;
}

function mouseClicked() {
	dots.push(new Dot(mouseX, mouseY));
	dots.sort((d1, d2) => d1.x - d2.x);
}
