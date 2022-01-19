import { F1TelemetryClient } from 'f1-2021-udp';
import * as fs from 'fs';
import * as util from 'util';

const lap_file = fs.createWriteStream('logs/lap.log', { flags: 'w' });
const damage_file = fs.createWriteStream('logs/damage.log', {
	flags: 'w',
});
const standings_file = fs.createWriteStream('logs/standings.log', {
	flags: 'w',
});
const setups_file = fs.createWriteStream('logs/setups.log', {
	flags: 'w',
});
const participants_file = fs.createWriteStream('logs/participants.log', {
	flags: 'w',
});
const lobby_file = fs.createWriteStream('logs/lobby.log', {
	flags: 'w',
});
const classification_file = fs.createWriteStream('logs/classification.log', {
	flags: 'w',
});

const client = new F1TelemetryClient();

const output = (title, data) => {
	console.log(`${title}:`);
	console.log(data);
	console.log('');
};

const log = (title, data) => {
	if (title === 'lap') {
		lap_file.write(util.format(data) + '\n');
	} else if (title === 'damage') {
		damage_file.write(util.format(data) + '\n');
	} else if (title === 'standings') {
		standings_file.write(util.format(data) + '\n');
	} else if (title === 'setups') {
		setups_file.write(util.format(data) + '\n');
	} else if (title === 'participants') {
		participants_file.write(util.format(data) + '\n');
	} else if (title === 'lobby') {
		lobby_file.write(util.format(data) + '\n');
	} else if (title === 'classification') {
		classification_file.write(util.format(data) + '\n');
	}
};

client.on('session', function (data) {
	output('SESSION', data);
});

client.on('lapData', function (data) {
	log('lap', data);
});

client.on('carDamage', function (data) {
	log('damage', data);
});

client.on('lobbyInfo', function (data) {
	log('lobby', data);
});

client.on('finalClassification', function (data) {
	log('classification', data);
});

client.on('carSetups', function (data) {
	log('setups', data);
});

client.on('participants', function (data) {
	log('participants', data);
});

client.start();

console.log('Client is running!');
