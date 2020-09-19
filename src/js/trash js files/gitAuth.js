const USER = 'av222gx@student.lnu.se';
const PASS = 'ahmadreza6567';
const REPO = 'https://bitbucket.org/infomaker/exjobb-branding-template';

const git = require('simple-git/promise');
const remote = `https://${USER}:${PASS}@${REPO}`;

git().silent(true)
  .clone(remote)
  .then(() => console.log('finished'))
  .catch((err) => console.error('failed: ', err));