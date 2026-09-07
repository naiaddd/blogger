# Personal project website

A static project portfolio for James McAllister-Barnard. No build step,
framework, external font request, or data API is required.

Serve this directory with a local HTTP server and open index.html.
The site also supports repository subpaths such as /blogger/.

- index.html: selected projects, ordered by maturity and presentation value.
- styles.css: shared layout, colours, motion, and responsive rules.
- script1.js: optional accordion animation and email copying.

Project details use native HTML details/summary and work without JavaScript.
Motion respects the visitor's reduced-motion setting. Public source links
should only be added after verifying that the repository is accessible.

Set --motion-ms in styles.css to tune project animations and control
transitions together (600 ms by default).

The older data.js, py.js, and output.html experiments are retained but are
not loaded or linked by the portfolio.
