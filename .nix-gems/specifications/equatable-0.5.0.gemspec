# -*- encoding: utf-8 -*-
# stub: equatable 0.5.0 ruby lib

Gem::Specification.new do |s|
  s.name = "equatable".freeze
  s.version = "0.5.0".freeze

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Piotr Murach".freeze]
  s.date = "2014-09-13"
  s.description = "Allows ruby objects to implement equality comparison and inspection methods. By including this module, a class indicates that its instances have explicit general contracts for `hash`, `==` and `eql?` methods.".freeze
  s.email = ["".freeze]
  s.homepage = "http://github.com/peter-murach/equatable".freeze
  s.rubygems_version = "3.5.9".freeze
  s.summary = "Allows ruby objects to implement equality comparison and inspection methods.".freeze

  s.installed_by_version = "3.5.9".freeze if s.respond_to? :installed_by_version

  s.specification_version = 4

  s.add_development_dependency(%q<bundler>.freeze, ["~> 1.5".freeze])
end
