{
  pkgs ? import <nixpkgs> { },
}:

let
  # Input source files
  src = ./.;
  nodeDeps = import ./node-deps.nix { inherit pkgs; };
  inherit (nodeDeps) packageJSON nodeModules;

in
pkgs.stdenv.mkDerivation {
  name = "chobble-com";

  src = builtins.filterSource (
    path: type:
    !(builtins.elem (baseNameOf path) [
      "_site"
      "node_modules"
      ".git"
    ])
  ) src;

  nativeBuildInputs = with pkgs; [
    cacert
    html-tidy
    lightningcss
    sass
    yarn
  ];

  configurePhase = ''
    export HOME=$TMPDIR
    mkdir -p _site/style

    cp -r ${nodeModules}/node_modules .
    chmod -R +w node_modules
    cp ${packageJSON} package.json
  '';

  buildPhase = ''
    echo 'Building CSS'
    sass --update src/_scss:_site/css --style compressed

    echo 'Building site'
    yarn --offline eleventy

    echo 'Tidying HTML'
    find _site -name "*.html" -exec tidy --wrap 80 --indent auto --indent-spaces 2 --quiet yes --tidy-mark no -modify {} \;
  '';

  installPhase = ''
    mkdir -p $out
    cp -r _site/* $out/
    rm -rf node_modules _site package.json
  '';
}
