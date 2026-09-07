const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../script1.js'), 'utf8');
const css = fs.readFileSync(path.join(__dirname, '../styles.css'), 'utf8');
const duration = css.match(/--motion-ms:\s*(\d+)/)[1];
let click, current, animatedHeight;
const summary = { addEventListener: (_, handler) => { click = handler; } };
const details = {
  open: false,
  querySelector: () => summary,
  getBoundingClientRect: () => ({ height: animatedHeight ?? (details.open ? 180 : 60) }),
  animate: (frames, options) => (current = {
    frames, options, cancel() { animatedHeight = undefined; },
  }),
};
vm.runInNewContext(source, {
  window: { matchMedia: () => ({ matches: false }) },
  document: { querySelectorAll: s => s === '.project' ? [details] : [] },
  getComputedStyle: () => ({ getPropertyValue: () => duration }),
});
const toggle = () => click({ preventDefault() {} });
toggle();
assert.equal(current.frames[0].height, '60px');
assert.equal(current.frames[1].height, '180px');
assert.equal(current.options.duration, 600);
current.onfinish();
assert.equal(details.open, true);
toggle();
assert.equal(current.frames[0].height, '180px');
assert.equal(current.frames[1].height, '60px');
animatedHeight = 115;
toggle();
assert.equal(current.frames[0].height, '115px');
assert.equal(current.frames[1].height, '180px');
current.onfinish();
toggle();
current.onfinish();
assert.equal(details.open, false);
console.log('PASS: outer-row expansion, collapse, reversal, 600 ms setting');
