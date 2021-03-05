# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0-beta.3] - 2021-03-05
### Fixed
- Fix transition classes not being removed properly in same cases.
- Recompile typings.
- Mark package as side-effect free.

## [0.1.0-beta.2] - 2021-03-04
### Changed
- Rename `animate` to `transition`.
- Rename `AnimationOptions.classPrefix` to `AnimationOptions.prefix`.

### Fixed
- Don't apply the `move` class to elements that aren't changing position.
- Fix buggy behavior when a new transition is started while a previous one is still running.

[Unreleased]: https://github.com/tobyzerner/hello-goodbye/compare/v0.1.0-beta.3...HEAD
[0.1.0-beta.3]: https://github.com/tobyzerner/hello-goodbye/compare/v0.1.0-beta.2...v0.1.0-beta.3
[0.1.0-beta.2]: https://github.com/tobyzerner/hello-goodbye/compare/v0.1.0-beta.1...v0.1.0-beta.2
