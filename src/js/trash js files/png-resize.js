#!/usr/bin/env node
let path = require('path')
let lwip = require('lwip')
let commander = require('commander')
let file = require('file')


let config = require('../package.json');
let cwd = process.cwd();
let sizes = [
	['ldpi', 0.1875],
	['mdpi', 0.25],
	['hdpi', 0.375],
	['xhdpi', 0.5],
	['xxhdpi', 0.75],
	['xxxhdpi', 1]
];

commander
	.version(config.version)
	.option('-i, --input [file]', 'The input file path')
	.option('-d, --directory [dir]', 'The input directory path (this is recursive)')
	.option('-im, --interpolation [nearest-neighbor, moving-average, linear, grid, cubic, or lanczos]', 'The interpolation method [lanczos]')
	.option('-c, --compression [none, fast, high]', 'Image compression level [fast]')
	.parse(process.argv);

let interpolation = commander.interpolation || 'lanczos';
let compression = commander.compression || 'fast';

function batchScale(index, input) {
	if (sizes.length > index) {
		let ext = path.extname(input);
		let basename = path.basename(input, ext);
		let dirname = path.dirname(input);

		let label = sizes[index][0];
		let scale = sizes[index][1];
		let output = path.resolve(dirname, `${basename}-${label}${ext}`);

		console.log('Processing', output);

		lwip.open(input, (err, image) =>
			image
				.batch()
				.scale(scale, interpolation)
				.writeFile(output, {
					compression,
					'interlaced': true,
					'transparency': 'auto'
				}, err => (err) ? console.error(err) : batchScale(index + 1, input))
		);
	}
}

if (commander.directory) {
	file.walk(commander.directory, (nil, dirPath, dirs, files) =>
		files
			.filter(file => file.endsWith('.png'))
			.forEach(file => batchScale(0, file))
	);
}

if (commander.input) {
	let input = path.resolve(cwd, commander.input);
	batchScale(0, input);
}