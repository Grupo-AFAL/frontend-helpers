# Grupo AFAL FrontEnd Helpers

[![Maintainability](https://api.codeclimate.com/v1/badges/969fbe0a6dfa323f51da/maintainability)](https://codeclimate.com/github/Grupo-AFAL/frontend-helpers/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/969fbe0a6dfa323f51da/test_coverage)](https://codeclimate.com/github/Grupo-AFAL/frontend-helpers/test_coverage)

Collection of components and utilities to facilitate developing web applications integrating Ruby helpers to facilitate the generation of HTML templates, Bulma componentes with some customizations and StimulusJS controllers to provide the functionality to those components.

## Ruby/Rails Helpers

### Instalation

Add this line to your application's Gemfile:

```ruby
gem 'frontend_helpers', github: 'Grupo-AFAL/frontend-helpers', branch: 'main'
```

And then execute:

    $ bundle install

### Usage

TODO: Write how to use Ruby helpers

### Development

After checking out the repo, run `bin/setup` to install dependencies. Then, run `rake spec` to run the tests. You can also run `bin/console` for an interactive prompt that will allow you to experiment.

To install this gem onto your local machine, run `bundle exec rake install`. To release a new version, update the version number in `version.rb`, and then run `bundle exec rake release`, which will create a git tag for the version, push git commits and tags, and push the `.gem` file to [rubygems.org](https://rubygems.org).

## Javascript Controllers and utilities

### Instalation

```
yarn add https://github.com/Grupo-AFAL/frontend-helpers.git
```

### Usage

All controllers have dependency on StimulusJS which is a peerDependency of this package.

```js
import { Application } from 'stimulus'
import { DropdownController } from 'frontend-helpers'

const application = Application.start()
application.register('dropdown', DropdownController)
```

### Development

The javascript code live under the `javascript` folder.

#### Start development server

```
npm run start
```

A browser window will open at `localhost:8080`

New controllers go in `src/controllers` and utility functions go in `src/utils`

For new components create a HTML file in `docs/` to test out the controller being developed.

## Bulma framework and custom CSS

### Instalation

CSS is expected to be loaded by the Asset Pipeline and is available to `@import` into the `application.scss`

```scss
@import 'fe_base';
```

### Usage

TODO: Write how to use SCSS

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/Grupo-AFAL/frontend-helpers. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](https://github.com/Grupo-AFAL/frontend-helpers/blob/master/CODE_OF_CONDUCT.md).

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Code of Conduct

Everyone interacting in the FrontendHelpers project's codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/[USERNAME]/frontend_helpers/blob/master/CODE_OF_CONDUCT.md).
