# frozen_string_literal: true

require_relative 'lib/frontend_helpers/version'

Gem::Specification.new do |spec|
  spec.name          = 'frontend_helpers'
  spec.version       = FrontendHelpers::VERSION
  spec.authors       = ['Federico Gonzalez']
  spec.email         = ['fedegonzalez@afal.mx']

  spec.summary       = 'Collection of methods to facilitate frontend development'
  # spec.description   = %q{}
  # spec.homepage      = "TODO: Put your gem's website or public repo URL here."
  spec.license       = 'MIT'
  spec.required_ruby_version = Gem::Requirement.new('>= 2.7.2')

  # spec.metadata["allowed_push_host"] = "TODO: Set to 'http://mygemserver.com'"

  # spec.metadata["homepage_uri"] = spec.homepage
  # spec.metadata["source_code_uri"] = "TODO: Put your gem's public repo URL here."
  spec.metadata['changelog_uri'] = 'https://github.com/Grupo-AFAL/frontend-helpers/blob/main/CHANGELOG.md'

  # Specify which files should be added to the gem when it is released.
  # The `git ls-files -z` loads the files in the RubyGem that have been added into git.
  spec.files = Dir.chdir(File.expand_path(__dir__)) do
    `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  end
  spec.bindir        = 'exe'
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ['lib']

  spec.add_dependency 'rails', '> 6.1'
  spec.add_dependency 'ransack'

  spec.add_development_dependency 'rspec'
  spec.add_development_dependency 'rspec-rails', '~> 4.0'
  spec.add_development_dependency 'simplecov', '~> 0.21'
  spec.metadata['rubygems_mfa_required'] = 'true'
end
