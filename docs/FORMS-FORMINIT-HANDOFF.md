# Forms and Forminit — new-site handoff

Prepared 2026-10-05 from the Mac Admins Europe repository. Copy this document into the new site's repo (for example, `docs/FORMS-FORMINIT-HANDOFF.md`) and give it to Claude or Codex.

**Status:** Current frontend behavior is documented below. Forminit account settings and delivery workflows have NOT been inspected or tested. The new site's requirements still need confirmation. Do not treat proposed settings as verified production configuration.

**Scope:** This handoff covers general contact and sponsorship inquiries only. The site owner confirmed that the newsletter has moved to **EmailOctopus**. Newsletter signup is outside this Forminit handoff; do not recreate or migrate it to Forminit, even if legacy newsletter code remains in this checkout.

## 1. How the existing site works

The existing site is Astro 5, statically built and hosted on GitHub Pages at `https://macadmins-eu.org`. There is no site-side form backend, database, server route, or Astro Action.

Both in-scope forms use native HTML submission:

```text
Visitor fills form → browser validates → HTTPS POST to Forminit
→ Forminit processes submission using its account settings
→ Forminit returns the configured redirect or its own thank-you page
```

- Each form uses `method="POST"`, `accept-charset="UTF-8"`, and an absolute Forminit `action` URL.
- With no explicit `enctype`, browsers send the default `application/x-www-form-urlencoded` body. There are no file uploads.
- The browser navigates away from the site on submission. There is no inline sending/success/error UI, fetch request, submit interception, or disabled-button/loading behavior.
- Form submission does not require site JavaScript. Personalized copy on the site's thank-you page does.
- `forminit` is listed as `^0.2.3` in `package.json` and locked to `0.2.3`, but no current source imports or initializes the SDK. The native POST flow does not need that package.
- No Forminit API key or form-specific environment variable is referenced by the current implementation. Form endpoint IDs are intentionally visible in rendered HTML; they are not private API credentials.

Forminit's official [redirection documentation](https://forminit.com/docs/redirections/) confirms native HTML POST support and provider-managed redirects. Actual redirects configured for this account are unknown.

## 2. Form inventory and existing endpoint IDs

These are existing-site identifiers, not permission to reuse them for another site. Confirm whether the new site replaces this one or needs separate Forminit forms.

| Purpose | Existing placement | Source component | Forminit POST endpoint |
| --- | --- | --- | --- |
| General contact | `/contact` | `src/components/ContactForm.astro` | `https://forminit.com/f/d90rfc8kn9k` |
| Sponsorship inquiry | `/sponsor-contact` | `src/components/SponsorContactForm.astro` | `https://forminit.com/f/kcw8ilaoucx` |

The contact page displays `hello@macadmins-eu.org`, and the sponsor page displays `sponsors@macadmins-eu.org` as `mailto:` alternatives. **These addresses are not evidence of Forminit notification recipients.** The HTML only sends data to the endpoints above; delivery recipients live outside this repo.

No local ticket-purchase, speaker-application, or payment form was found in this inventory. References to those activities in page copy or the privacy policy are not implementations of additional forms.

## 3. Exact field contracts

HTML `name` attributes are the submitted keys. IDs, labels, placeholders, and CSS class names are not payload keys. Preserve the exact `fi-` names when reproducing the existing integration; verify changes against Forminit's [form blocks reference](https://forminit.com/docs/form-blocks/).

### General contact

| Display field | Submitted name | Input type | Current browser validation |
| --- | --- | --- | --- |
| First Name | `fi-sender-firstName` | text | Required; minimum 2 characters |
| Last Name | `fi-sender-lastName` | text | Required; minimum 2 characters |
| Email Address | `fi-sender-email` | email | Required; browser email validation |
| Subject | `fi-select-subject` | select | Required; initial option has empty value |
| Message | `fi-text-message` | textarea | Required; minimum 10 characters |
| Hidden spam-trap field | `website_url` | hidden | Empty; not required |

Subject values and labels:

- `tickets`: Tickets & Registration
- `group-bookings`: Group Bookings
- `sponsorship`: Sponsorship Inquiry
- `speaking`: Speaker Inquiries
- `press`: Press & Media
- `other`: Other

Submit button: “Send Message”. Current response-time copy: “We typically respond within 24-48 hours on business days.” The subject field does not implement recipient routing in site code; any such routing must be confirmed in Forminit or another downstream service.

### Sponsorship inquiry

| Display field | Submitted name | Input type | Current browser validation |
| --- | --- | --- | --- |
| First Name | `fi-sender-firstName` | text | Required; minimum 2 characters |
| Last Name | `fi-sender-lastName` | text | Required; minimum 2 characters |
| Work Email Address | `fi-sender-email` | email | Required; browser email validation |
| Company Name | `fi-text-company` | text | Required |
| Interested Package | `fi-select-package` | select | Required; initial option has empty value |
| How can we help? | `fi-text-message` | textarea | Required; minimum 10 characters |
| Hidden spam-trap field | `website_url` | hidden | Empty; not required |

Package values: `platinum`, `gold`, `silver`, `patron`, `custom`. Platinum and Gold are currently disabled and labeled sold out. Those availability rules are old-event content, not reusable defaults for the new site.

“Work Email Address” is a label only: the current form does not reject personal email domains. Submit button: “Submit Sponsorship Request”. Current copy promises a response within 24–48 hours.

## 4. Confirmation and redirects

`src/pages/thankyou.astro` provides `/thankyou`. Its client-side script reads the `action` query parameter:

| URL path and query | Current displayed result |
| --- | --- |
| `/thankyou?action=thankyouform` | Message received; team will get back to the visitor |
| `/thankyou` or any other action | Generic submission thank-you |

There is no sponsor-specific action. Some generic/contact text still mentions 2026. The new site should use current branding and accurate confirmation wording. Legacy newsletter confirmation behavior is outside this handoff.

**Important:** None of the form components supplies a redirect hidden input or redirect script. To connect these forms to the site's confirmation page, the appropriate absolute redirect URL must be configured in Forminit. Proposed mappings to confirm:

- Contact → `https://<NEW_SITE_DOMAIN>/thankyou?action=thankyouform`
- Sponsorship → the same contact confirmation, or an approved sponsor-specific page

Use the real domain, path, and any hosting base path. These are proposals, not observed dashboard values. Reusing a form and changing its redirect can also affect submissions from the old site.

The confirmation page is public and can be opened directly. Its content is not an authenticated receipt and must not trigger mailing-list additions, payments, or other privileged actions. Do not put names, email addresses, or message bodies in redirect query strings.

## 5. Spam, validation, and privacy boundaries

- Contact and sponsorship include an empty hidden `website_url` field. Its presence alone does not prove effective spam protection.
- Forminit's [honeypot documentation](https://forminit.com/docs/honeypot/) says its default field is `_gotcha`; a custom name such as `website_url` must match the form's Honeypot setting. Confirm that setting separately for both endpoints.
- No CAPTCHA widget/token integration is present in these components.
- HTML `required`, `minlength`, disabled options, and email checks are browser conveniences, not a security boundary. Confirm backend validation and anti-spam settings; do not claim they mirror browser rules without evidence.
- No explicit maximum text lengths are set in these components. Confirm provider limits and desired new-site limits before adding them.
- The existing privacy page does not name Forminit. It does not establish this account's storage location, processor terms, retention settings, or deletion process for contact and sponsorship submissions.
- Have the site owner confirm privacy wording, consent requirements, processor arrangements, retention, and deletion responsibilities. Do not copy legal claims that have not been verified for the new site.
- Never commit account passwords, private API keys, webhook secrets, CAPTCHA secrets, or submission exports containing personal data.

## 6. Information to collect from the owner and Forminit

Screenshots or copied non-secret settings are sufficient initially. Redact API keys, tokens, webhook signing secrets, and real submission data. No account password is needed.

### New-site decisions

- Is this a replacement for Mac Admins Europe, or a separate site? What is the new repo/framework and production domain?
- Which forms are needed, where do they appear, and which fields/options/copy should change?
- Reuse existing Forminit forms or create separate forms? Who owns the account and manages settings?
- Which team inbox receives each form? Should subject/package affect routing? What should Reply-To be?
- Keep native submit-and-redirect, or request inline success/error states? Native POST is the existing behavior.
- Which preview/staging domains will be used? How should test submissions be isolated from production recipients?

### For each Forminit form, collect

| Setting/evidence | What to record |
| --- | --- |
| Identity | Form display name, form ID, endpoint, owner, active status |
| Submission access | Authentication mode suitable for public browser submissions; domain/origin restrictions if configured |
| Field configuration | Accepted block names/types, required fields, backend validation, limits |
| Notifications | Enabled status, actual recipient(s), subject/template, Reply-To configuration |
| Redirect | Exact configured absolute success URL; provider behavior on rejection/failure |
| Spam | Honeypot enabled/name; other enabled spam/CAPTCHA settings |
| Autoresponder | Enabled status, recipient mapping, approved content, sender settings |
| Downstream workflow | Any contact/sponsorship webhook or automation destination, field mapping, owner, failure/retry behavior |
| Operations | Submission quota, over-limit behavior, retention/deletion settings, who monitors failures |
| Test evidence | Sanitized test: received fields, notification delivery, redirect, downstream outcome |

Forminit documents [email notifications](https://forminit.com/docs/email-notifications/) and [autoresponders](https://forminit.com/docs/autoresponder/) separately. Do not assume either is enabled.

### Copy/paste collection sheet

```text
New site repo/framework:
Production domain and base path:
Preview/staging domain(s):
Replacement site or separate site:
Forms needed and requested field changes:
Native redirects or inline feedback:
Reuse existing Forminit forms or create new ones:

CONTACT
Form ID / endpoint:
Recipient(s) and routing:
Reply-To:
Success redirect:
Honeypot enabled / field name:
Other spam/auth/domain/validation settings:
Autoresponder:

SPONSORSHIP
Form ID / endpoint:
Recipient(s) and routing:
Reply-To:
Current packages / availability:
Success redirect:
Honeypot enabled / field name:
Other spam/auth/domain/validation settings:
Autoresponder:

Account/settings owner:
Quota / retention / failure-monitoring owner:
Safe test recipient and permission to send test submissions:
```

## 7. Implementation brief for Claude or Codex

Paste this prompt with the completed collection sheet:

> Read `docs/FORMS-FORMINIT-HANDOFF.md` and this repo's agent instructions before implementing. Build the approved contact and sponsorship forms using the confirmed Forminit endpoints and exact payload names. Newsletter is handled separately by EmailOctopus: leave it out of this Forminit implementation and do not alter its integration. Separate verified configuration from unresolved questions; do not invent recipients or redirect settings. Start from the existing native HTML POST behavior unless inline handling is explicitly requested. Do not add a server backend or expose private credentials for a static-site integration. Make component IDs unique when a form appears more than once, preserve accessible labels and browser validation, and match the confirmed honeypot settings. Use this site's current design system, branding, routes, and approved package options. Ensure confirmation copy reflects the actual result. Document required dashboard changes separately from code changes; do not modify shared production Forminit settings or send real test submissions without approval. Verify the build and complete the agreed end-to-end test checklist. Report remaining account-side work instead of claiming deployment or email delivery is complete.

If inline UX is selected, consult the current [HTML integration](https://forminit.com/docs/html/) and [Astro integration](https://forminit.com/docs/astro/) documentation. Scope handlers to each form instance; handle errors, preserve input on failure, restore buttons, and announce status accessibly. This would be new behavior, not a copy of the existing implementation.

## 8. Verification and launch checklist

Do not submit to the listed live endpoints just to test the document. Agree on test recipients and test-submission permission first.

- [ ] Confirm each endpoint belongs to the intended site/account and accepts the chosen public submission approach.
- [ ] Verify the new repo's production build and generated form actions/names.
- [ ] Test each form at mobile and desktop sizes, with keyboard navigation and accessible labels.
- [ ] Confirm empty/invalid/too-short values are blocked by browser validation.
- [ ] Confirm repeated form instances, if any, have unique IDs and work independently.
- [ ] With approval, submit clearly labeled synthetic test data to each form.
- [ ] Verify actual Forminit receipt and all submitted fields, not only the thank-you page.
- [ ] Verify the intended team's notification and Reply-To behavior.
- [ ] Verify the configured success redirect on the actual production/staging domain and base path.
- [ ] Verify confirmed honeypot/CAPTCHA behavior in an approved test form; do not flood production.
- [ ] Check rejection/network/quota failure behavior and ensure no false success message.
- [ ] For native POST, verify submission with JavaScript disabled; generic thank-you copy is the current fallback.
- [ ] Confirm privacy wording and operational owner; remove synthetic test data where appropriate.

## 9. Evidence and limits

In-scope repository sources inspected: `src/components/ContactForm.astro`, `src/components/SponsorContactForm.astro`, `src/pages/contact.astro`, `src/pages/sponsor-contact.astro`, `src/pages/thankyou.astro`, `src/pages/privacy.astro`, `src/utils/baseUrl.ts`, `astro.config.mjs`, `package.json`, and `package-lock.json`. Newsletter was excluded following the owner's confirmation that it moved to EmailOctopus; that integration has not been inspected here.

Official Forminit documentation linked above was checked on 2026-10-05. It explains supported mechanisms, not this account's configuration. No dashboard access, production submission, or notification-delivery test was performed. Frozen 2026 archive source/data was not changed.
