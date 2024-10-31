# -*- encoding: utf-8 -*-
# stub: tty-table 0.10.0 ruby lib

Gem::Specification.new do |s|
  s.name = "tty-table".freeze
  s.version = "0.10.0".freeze

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Piotr Murach".freeze]
  s.date = "2018-02-18"
  s.description = "A flexible and intuitive table generator".freeze
  s.email = ["".freeze]
  s.homepage = "https://piotrmurach.github.io/tty/".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.0.0".freeze)
  s.rubygems_version = "3.5.9".freeze
  s.summary = "A flexible and intuitive table generator".freeze

  s.installed_by_version = "3.5.9".freeze if s.respond_to? :installed_by_version

  s.specification_version = 4

  s.add_runtime_dependency(%q<equatable>.freeze, ["~> 0.5.0".freeze])
  s.add_runtime_dependency(%q<necromancer>.freeze, ["~> 0.4.0".freeze])
  s.add_runtime_dependency(%q<pastel>.freeze, ["~> 0.7.2".freeze])
  s.add_runtime_dependency(%q<tty-screen>.freeze, ["~> 0.6.4".freeze])
  s.add_runtime_dependency(%q<strings>.freeze, ["~> 0.1.0".freeze])
  s.add_development_dependency(%q<bundler>.freeze, [">= 1.5.0".freeze, "< 2.0".freeze])
  s.add_development_dependency(%q<rake>.freeze, [">= 0".freeze])
  s.add_development_dependency(%q<rspec>.freeze, ["~> 3.1".freeze])
end
