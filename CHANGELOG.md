# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.30] - 2021-10-11

- Add active_link_with_icon method

## [0.3.29] - 2021-10-11

- Add icons 'business', 'credit-card-alt', 'cutlery-alt', 'dashboard' and 'face-profile' 

## [0.3.28] - 2021-10-11

- Adjust size of icons

## [0.3.27] - 2021-10-08

- Add store, lightbulb, project-diagram and chart-line icons

## [0.3.26] - 2021-10-06

- Allow to specify delay to make the request on SubmitOnChangeController

## [0.3.25] - 2021-10-07

- Add icons for daycare application

## [0.3.24] - 2021-10-06

- Allow to specify method and responseKind on SubmitOnChangeController

## [0.3.23] - 2021-10-01

- Repalace '-', '+' for icons in step number field.

## [0.3.22] - 2021-09-30

- Improve navbar transparency for tablets and mobile devices.

## [0.3.21] - 2021-09-29

- Add child icon

## [0.3.20] - 2021-09-20

- Improve filter form to support array attributes and remove tenant dependency

## [0.3.19] - 2021-09-19

- Add filter icon

## [0.3.18] - 2021-09-18

- Add search_field_group form tag builder

## [0.3.17] - 2021-09-14

- Updated hovercard controller to improve hovercard positioning

## [0.3.16] - 2021-09-10

- Updated `link_to_remove_fields` method to optionally receive soft_delete attribute.

## [0.3.15] - 2021-08-29

- Add `transparency funcionality` to navbar.

## [0.3.14] - 2021-08-29

- Add `facebook, instagram, pinterest, linkedin, mail, phone, map_marker_alt` icons.

## [0.3.13] - 2021-08-29

- Add `manual closing` to notifications

## [0.3.12] - 2021-08-29

- Add times icon

## [0.3.11] - 2021-08-29

- Add notification (alert, success, notification) icons

## [0.3.10] - 2021-08-29

- Pass options to ransack result method

## [0.3.9] - 2021-08-26

- Add `arrow-forward` and `arrow-back` icons

## [0.3.8] - 2021-08-24

- Adding `hoverable` to dropdown, that allows trigger it by hover

## [0.3.7] - 2021-08-21

- Create RadioToggleController

## [0.3.6] - 2021-08-17

- Extend InputOnChange Controller to add the ability to:
  - Change the key sent to the server
  - Sent a target_id for the element to update

## [0.3.5] - 2021-08-09

- Adding Print Controller, that allows to print the current page

## [0.3.4] - 2021-08-05

- Allow timefield to receive a minimun, maximum and default time. And datefield can now receive a minimum date

## [0.3.3] - 2021-08-04

- Create new InputOnChangeController to notify the server when there is some change in the input

## [0.3.2] - 2021-08-03

- Create new ToggleController to toggle content on and off based on the value of a checkbox

## [0.3.1] - 2021-08-03

- Allow boolean_field to receive check_box checked and unchecked values

## [0.3.0] - 2021-07-22

- Include FilterForm object to simplify adding filters to a data table

## [???]

- Add calendar-alt icon
- Add `autoFocusInput` to automatically focus elements in form with `autofocus="autofocus"`
- Fix: Clicking on tag-input results would render `undefined`
- Generate component docs using Markdown
- Skip Choices.js initialization when element already initialized.
- Setup linting for Ruby (Rubocop) and Javascript (StandardJS) with Github Actions

## [0.2.1] - 2021-03-15

### Added

- New notification component with dismiss behaviour
