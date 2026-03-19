const test = require('node:test');
const assert = require('node:assert');

// Mock location global
global.location = {
  hostname: 'example.com'
};

const { isInternalLink } = require('./router.js');

test('isInternalLink - internal links', () => {
  const internalLink = {
    hostname: 'example.com',
    protocol: 'https:'
  };
  assert.strictEqual(isInternalLink(internalLink), true);

  const internalHttpLink = {
    hostname: 'example.com',
    protocol: 'http:'
  };
  assert.strictEqual(isInternalLink(internalHttpLink), true);
});

test('isInternalLink - external links', () => {
  const externalLink = {
    hostname: 'otherdomain.com',
    protocol: 'https:'
  };
  assert.strictEqual(isInternalLink(externalLink), false);
});

test('isInternalLink - non-http protocols', () => {
  const mailtoLink = {
    hostname: 'example.com',
    protocol: 'mailto:'
  };
  assert.strictEqual(isInternalLink(mailtoLink), false);

  const telLink = {
    hostname: 'example.com',
    protocol: 'tel:'
  };
  assert.strictEqual(isInternalLink(telLink), false);

  const fileLink = {
    hostname: 'example.com',
    protocol: 'file:'
  };
  assert.strictEqual(isInternalLink(fileLink), false);
});
