# -*- encoding: utf-8 -*-
# stub: pastel 0.7.2 ruby lib

Gem::Specification.new do |s|
  s.name = "pastel".freeze
  s.version = "0.7.2".freeze

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Piotr Murach".freeze]
  s.date = "2017-11-09"
  s.description = "Terminal strings styling with intuitive and clean API.".freeze
  s.email = ["".freeze]
  s.homepage = "https://github.com/piotrmurach/pastel".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.5.9".freeze
  s.summary = "Terminal strings styling with intuitive and clean API.".freeze

  s.installed_by_version = "3.5.9".freeze if s.respond_to? :installed_by_version

  s.specification_version = 4

  s.add_runtime_dependency(%q<equatable>.freeze, ["~> 0.5.0".freeze])
  s.add_runtime_dependency(%q<tty-color>.freeze, ["~> 0.4.0".freeze])
  s.add_development_dependency(%q<bundler>.freeze, [">= 1.5.0".freeze, "< 2.0".freeze])
  s.add_development_dependency(%q<rake>.freeze, [">= 0".freeze])
  s.add_development_dependency(%q<rspec>.freeze, ["~> 3.1".freeze])
end
