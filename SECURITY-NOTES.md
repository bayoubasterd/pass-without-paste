# Pass Without Paste tester portal

This directory is the public, static tester portal. It is intentionally inert until its private download and report destinations are configured in `version.json`.

## Security boundary

- The public page contains no tester identities, character data, analytics, credentials, or private download tokens.
- Tester reports must go to a private form or private issue tracker. Do not point `reportUrl` at a public issue tracker while reports may contain character screenshots or uploaded files.
- Private repository access tokens must never be placed in this directory or in the browser extension.
- The download remains disabled until `downloadUrl` is set to the controlled release location.
- The page reads only its same-origin `version.json`; its content policy blocks third-party scripts, objects, and form submissions. GitHub Pages cannot supply a reliable anti-framing response header, so the page does not claim clickjacking protection.
- Publishing should expose only this directory, not the repository root or source archives.

## Before publishing

1. Create the controlled release and private report intake.
2. Set `downloadUrl` and `reportUrl` in `version.json`.
3. Confirm `currentVersion` and the SHA-256 checksum match the packaged Chrome build.
4. Review every public sentence for vendor-neutral wording.
5. Publish this directory only after the repository owner, visibility, and Pages URL are confirmed.

The extension update notice will eventually read the same `version.json` after the final public Pages URL is known.
