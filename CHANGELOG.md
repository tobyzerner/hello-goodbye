# Changelog

## [0.1.0](https://github.com/tobyzerner/hello-goodbye/compare/v0.1.0-beta.5...v0.1.0) (2023-03-16)
### Breaking Changes
* Package is now ES module only

### Bug Fixes
* Improve transition reliability ([ff861b5](https://github.com/tobyzerner/hello-goodbye/commit/ff861b5b6fab7b5cd2dfb7d7d06f90c40c8d9d62))

## [0.1.0-beta.5](https://github.com/tobyzerner/hello-goodbye/compare/v0.1.0-beta.4...v0.1.0-beta.5) (2021-05-18)
### Fixed
* Clean up animation if transition gets cancelled.

## [0.1.0-beta.4](https://github.com/tobyzerner/hello-goodbye/compare/v0.1.0-beta.3...v0.1.0-beta.4) (2021-03-31)
### Added
* Expose `cancel` function.

### Fixed
* Don't `move` elements that were previously hidden.

## [0.1.0-beta.3](https://github.com/tobyzerner/hello-goodbye/compare/v0.1.0-beta.2...v0.1.0-beta.3) (2021-03-05)
### Fixed
* Fix transition classes not being removed properly in same cases.
* Recompile typings.
* Mark package as side-effect free.

## [0.1.0-beta.2](https://github.com/tobyzerner/hello-goodbye/compare/v0.1.0-beta.1...v0.1.0-beta.2) (2021-03-04)
### Changed
* Rename `animate` to `transition`.
* Rename `AnimationOptions.classPrefix` to `AnimationOptions.prefix`.

### Fixed
* Don't apply the `move` class to elements that aren't changing position.
* Fix buggy behavior when a new transition is started while a previous one is still running.
