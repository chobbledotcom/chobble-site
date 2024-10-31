# -*- encoding: utf-8 -*-
# stub: tty-prompt 0.12.0 ruby lib

Gem::Specification.new do |s|
  s.name = "tty-prompt".freeze
  s.version = "0.12.0".freeze

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Piotr Murach".freeze]
  s.date = "2017-03-19"
  s.description = "A beautiful and powerful interactive command line prompt with a robust API for getting and validating complex inputs.".freeze
  s.email = ["".freeze]
  s.homepage = "https://piotrmurach.github.io/tty".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.5.9".freeze
  s.summary = "A beautiful and powerful interactive command line prompt.".freeze

  s.installed_by_version = "3.5.9".freeze if s.respond_to? :installed_by_version

  s.specification_version = 4

  s.add_runtime_dependency(%q<necromancer>.freeze, ["~> 0.4.0".freeze])
  s.add_runtime_dependency(%q<pastel>.freeze, ["~> 0.7.0".freeze])
  s.add_runtime_dependency(%q<tty-cursor>.freeze, ["~> 0.4.0".freeze])
  s.add_runtime_dependency(%q<wisper>.freeze, ["~> 1.6.1".freeze])
  s.add_development_dependency(%q<bundler>.freeze, [">= 1.5.0".freeze, "< 2.0".freeze])
  s.add_development_dependency(%q<rake>.freeze, [">= 0".freeze])
  s.add_development_dependency(%q<rspec>.freeze, ["~> 3.5.0".freeze])
end
