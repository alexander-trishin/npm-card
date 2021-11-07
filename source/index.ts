import cardJson = require('./card.json');
import createCard = require('./create-card');
import packageJson = require('../package.json');

const card = createCard({ ...cardJson, info: { ...cardJson.info, package: packageJson.name } });

console.log(card);
