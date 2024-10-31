# -*- encoding: utf-8 -*-
# stub: whirly 0.3.0 ruby lib

Gem::Specification.new do |s|
  s.name = "whirly".freeze
  s.version = "0.3.0".freeze

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Jan Lelis".freeze]
  s.date = "2021-06-04"
  s.description = "Simple terminal spinner with support for custom spinners. Includes spinners from npm's cli-spinners.".freeze
  s.email = ["hi@ruby.consulting".freeze]
  s.homepage = "https://github.com/janlelis/whirly".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new([">= 2.0".freeze, "< 4.0".freeze])
  s.rubygems_version = "3.5.9".freeze
  s.summary = "Whirly: The friendly terminal spinner".freeze

  s.installed_by_version = "3.5.9".freeze if s.respond_to? :installed_by_version

  s.specification_version = 4

  s.add_runtime_dependency(%q<unicode-display_width>.freeze, [">= 1.1".freeze])
end
