const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../script1.js'), 'utf8');
const css = fs.readFileSync(path.join(__dirname, '../styles.css'), 'utf8');
const duration = css.match(/--motion-ms:\s*(\d+)/)[1];
let click, current, visibleHeight = 120, opacity = '1';
const summary = { addEventListener: (_, handler) => { click = handler; } };
const body = {
  // Deliberately report full height even when details is closed.
  getBoundingClientRect: () => ({ height: visibleHeight }),
  querySelector: () => ({ getBoundingClientRect: () => ({ height: 120 }) }),
  animate: (frames, options) => (current = { frames, options, cancel() {} }),
};
const details = { open: false, querySelector: s => s === 'summary' ? summary : body };
vm.runInNewContext(source, {
  window: { matchMedia: () => ({ matches: false }) },
  document: { querySelectorAll: s => s === '.project' ? [details] : [] },
  getComputedStyle: () => ({ opacity, getPropertyValue: () => duration }),
});
const toggle = () => click({ preventDefault() {} });
toggle();
assert.equal(current.frames[0].height, '0px');
assert.equal(current.frames[1].height, '120px');
assert.equal(current.options.duration, 300);
current.onfinish();
assert.equal(details.open, true);
toggle();
assert.equal(current.frames[0].height, '120px');
assert.equal(current.frames[1].height, '0px');
visibleHeight = 55;
opacity = '0.45';
toggle();
assert.equal(current.frames[0].height, '55px');
assert.equal(current.frames[0].opacity, '0.45');
assert.equal(current.frames[1].height, '120px');
current.onfinish();
visibleHeight = 120;
toggle();
current.onfinish();
assert.equal(details.open, false);
console.log('PASS: expansion, collapse, mid-animation reversal, 300 ms setting');
