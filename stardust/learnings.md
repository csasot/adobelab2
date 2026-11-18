# Learnings — omyapersonalcare.us replica run (2026-11-17)

- **Trailing slashes.** WordPress sources end every URL in `/`; DA serves `/x` and 404s `/x/`. `verify.mjs` (via `publicUrl`, folder-index migrated files) fetched `/x/` and failed 70/71. One redirect row per delivered path (`/x/ → /x`) fixed both the instrument and every inbound bookmark; add these rows at D-site, not E.
- **Code-bus CDN variants.** After a code push, the CDN variant served to real Chrome kept the old `scripts/*.js` (max-age 7200) while curl got the new one. Replaying a flow check right after a push needs a fresh host: a throwaway branch (`<branch>--repo--owner.aem.live`, same content) gives one at once.
- **Honeypots in form-flow fills.** The source's hidden `email-confirm` honeypot is a named field; filling it made Playwright wait 30 s, the 6 s first-visit popup then covered the submit. Never list honeypots in `fill`.
- **Hidden dialogs and `aria-modal`.** A dialog that keeps `aria-modal="true"` while `hidden` reads as still open to the parity check; set it only while open.
- **Forms without required fields** still have to refuse an all-empty submit — the replay caught local capture saving blank entries.
- **JSON-LD parity is cheap on EDS.** The source's Yoast graph goes verbatim into a `json-ld` metadata row; the pipeline renders it in head. Health 64 → 97 with no code.
