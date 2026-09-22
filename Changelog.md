# Changelog

All notable changes to the 46176A / BEC Robotics website are documented here.

Versions are grouped around meaningful development milestones rather than individual Git commits. Early development contains several large commits because the website was primarily being developed and tested locally with Live Server before changes were committed.

---

## [1.0.0] — 2026-09-18

### Major Website & Archive Release

This release represents the first major consolidated version of the website, bringing together the public-facing site, legal documentation, robotics archive, team imagery, and updated robot interface.

### Added

* Added comprehensive robotics archive documentation covering historical seasons from 2020 through 2026.
* Added historical documentation for Bumblebee, Goblin machine, and Robotnik.
* Added engineering and competition documentation.
* Added Terms of Use.
* Added Privacy Policy.
* Added Cookie Policy.
* Added Copyright & Trademark notice.
* Added new team photographs.
* Added Component Telemetry section.
* Added diagnostic cards for:

  * Swerve Drive Pod
  * Active Intake
  * Telescoping Lift

### Changed

* Reworked the robot page into the current BEC Robotics interface.
* Updated the website branding and color palette.
* Updated navigation and footer systems.
* Updated team imagery.
* Updated the homepage splash screen.
* Added animated page sections.
* Expanded robot subsystem information.

### Technical

* Added historical archive files using the `YYYY-MM-DD_Category_FileName.ext` convention.
* Added additional image assets.
* Added AOS animation support.
* Expanded CSS for component telemetry and diagnostic cards.

---

## [0.6.0] — 2026-09-15

### Custom Domain

### Added

* Added custom-domain configuration through `CNAME`.

### Changed

* Updated the configured website domain during domain setup.
* Adjusted browser local-storage behavior in the site script.

### Fixed

* Prevented development browser state from being unnecessarily cleared.

---

## [0.5.0] — 2026-08-07

### Stability & Cleanup

### Fixed

* Corrected HTML structure issues.
* Cleaned up invalid or misplaced elements.
* Added safeguards around splash-screen JavaScript.
* Improved handling of previously-started sessions.

### Technical

* Cleaned up several HTML pages.
* Added JavaScript guards around the `DOMContentLoaded` logic.

---

## [0.4.0] — 2026-04-15

### Arcade Interface

### Added

* Added arcade-style visual effects.
* Added CRT/scanline styling.
* Added retro/pixel-style typography.
* Added arcade leaderboard functionality.
* Added dynamic leaderboard generation.
* Added announcement banner functionality.
* Added responsive Season page styling.

### Changed

* Reworked portions of the site's visual identity around an arcade/CRT aesthetic.
* Updated navigation and active-page states.
* Updated footer and sponsor presentation.
* Updated robot information and subsystem presentation.

### Technical

* Added dynamic JavaScript leaderboard generation.
* Added responsive CSS for arcade and Season components.

---

## [0.3.1] — 2026-03-25

### Season Page

### Added

* Added dedicated Season page.
* Added season overview information.
* Added build-completion statistics.
* Added award and engineering-hour information.
* Added mission/objective section.
* Added responsive Season page layout.

### Changed

* Added Season to the main website navigation.
* Updated homepage navigation and call-to-action links.

---

## [0.3.0] — 2026-03-12

### Dynamic Documentation & Gallery

### Added

* Added dynamic documentation archive.
* Added GitHub API integration for loading documents.
* Added searchable documentation.
* Added robot photo gallery.
* Added GitHub API integration for loading gallery images.
* Added the first robot gallery image.
* Added document cards with file-type information.
* Added gallery hover effects.

### Changed

* Updated navigation to include the documentation system.
* Added dynamic file loading instead of hard-coded documents.
* Added structured document metadata.

### Technical

* Added GitHub repository API requests.
* Added automatic file filtering.
* Added document search functionality.
* Added dynamic gallery rendering.

---

## [0.2.5] — 2026-03-12

### Documentation Interface Improvements

### Changed

* Improved document-card presentation.
* Added document metadata.
* Added file type indicators.
* Improved document search and filtering.
* Added dynamic document display functions.

### Technical

* Expanded the JavaScript documentation system.
* Improved handling of files that follow the site's naming convention.

---

## [0.2.4] — 2026-03-12

### Gallery & Media

### Added

* Added robot gallery image support.
* Added the first robot image to the website.

### Changed

* Updated gallery layout and hover behavior.
* Updated robot imagery references.

---

## [0.2.3] — 2026-03-12

### Navigation Expansion

### Added

* Added Documents navigation across the main website pages.
* Added footer and sponsor sections.
* Added social-link areas to the footer.

### Changed

* Updated shared navigation across pages.
* Expanded footer styling.

---

## [0.2.2] — 2026-03-09

### Robot Documentation

### Added

* Added additional Robotnik documentation.
* Added project timeline information.
* Added robot development notes.

### Changed

* Renamed and reorganized robot documentation files.
* Improved robot documentation naming.

---

## [0.2.1] — 2026-03-06

### Robot Media & Development Environment

### Added

* Added robot photographs from the 2025 season.
* Added robot image placeholder.
* Added VS Code Live Server configuration.

### Changed

* Replaced external placeholder images with local assets.
* Updated team member image references.
* Updated robot blueprint image reference.
* Corrected team-role wording in the robot documentation.

### Technical

* Configured Live Server for local website development.

---

## [0.2.0] — 2026-03-04

### Multi-Page Website

### Added

* Added dedicated Competitions page.
* Added dedicated Documentation page.
* Added initial robot documentation.
* Added historical robot information.
* Added navigation between website pages.

### Changed

* Expanded the homepage navigation.
* Added Competitions to the site structure.
* Added Documents to the site structure.
* Moved robot documentation into the new `docs` structure.

### Technical

* Established the initial multi-page website architecture.

---

## [0.1.3] — 2026-03-03

### Team Information

### Added

* Added real team member names.
* Added team roles.
* Added team bios.
* Added additional team member cards.

### Changed

* Replaced the original placeholder team information with actual team information.
* Expanded the Team section.

---

## [0.1.2] — 2026-03-03

### Robot Page

### Added

* Added dedicated Robot page.
* Added robot hero section.
* Added robot technical specifications.
* Added subsystem cards.
* Added initial robot documentation.
* Added responsive robot-page styling.

### Changed

* Added robot navigation.
* Expanded the shared website stylesheet.

---

## [0.1.1] — 2026-03-03

### Website Foundation

### Added

* Added initial homepage.
* Added navigation.
* Added homepage hero section.
* Added animated loading screen.
* Added initial JavaScript page-transition behavior.
* Added initial cyber/robotics visual theme.
* Added responsive team-card styling.
* Added smooth scrolling.

### Changed

* Expanded the initial HTML/CSS/JavaScript prototype into a functional homepage.

---

## [0.1.0] — 2026-03-03

### Initial Commit

The initial repository was created with the project README.

### Added

* Initial `README.md`.
* Project identifier: `46176A`.

---

# Version History

| Version | Date       | Release                         |
| ------- | ---------- | ------------------------------- |
| `1.0.0` | 2026-09-18 | Major Website & Archive         |
| `0.6.0` | 2026-09-15 | Custom Domain                   |
| `0.5.0` | 2026-08-07 | Stability & Cleanup             |
| `0.4.0` | 2026-04-15 | Arcade Interface                |
| `0.3.1` | 2026-03-25 | Season Page                     |
| `0.3.0` | 2026-03-12 | Dynamic Documentation & Gallery |
| `0.2.5` | 2026-03-12 | Documentation Interface         |
| `0.2.4` | 2026-03-12 | Gallery & Media                 |
| `0.2.3` | 2026-03-12 | Navigation Expansion            |
| `0.2.2` | 2026-03-09 | Robot Documentation             |
| `0.2.1` | 2026-03-06 | Robot Media & Development       |
| `0.2.0` | 2026-03-04 | Multi-Page Website              |
| `0.1.3` | 2026-03-03 | Team Information                |
| `0.1.2` | 2026-03-03 | Robot Page                      |
| `0.1.1` | 2026-03-03 | Website Foundation              |
| `0.1.0` | 2026-03-03 | Initial Commit                  |

---

# Versioning

This project follows a modified Semantic Versioning approach:

* **MAJOR** — Major redesigns, architectural changes, or significant milestones.
* **MINOR** — New pages, systems, or substantial features.
* **PATCH** — Smaller features, improvements, corrections, and fixes.

Early versions are intentionally more granular because the initial website was built rapidly through local development and Live Server testing before being committed in larger batches.

---

# Unreleased

Changes made after `1.0.0` should be documented here until the next release.

### Added

*

### Changed

*

### Fixed

*

### Removed

*

### Technical

*
