{
  description = "A best script!";
  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
  };
  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        nodeDeps = import ./node-deps.nix { inherit pkgs; };
        inherit (nodeDeps) packageJSON nodeModules;

        pkgs = import nixpkgs {
          inherit system;
        };

        # Common build inputs
        commonBuildInputs = with pkgs; [
          html-tidy
          sass
          yarn
        ];

        site = pkgs.stdenv.mkDerivation {
          name = "chobble-com";
          src = ./.;
          buildInputs = commonBuildInputs ++ [ nodeModules ];

          configurePhase = ''
            mkdir -p _site/style
            ln -sf ${packageJSON} package.json
            ln -sf ${nodeModules}/node_modules .
          '';

          buildPhase = ''
            sass --update src/_scss:_site/css --style compressed
            yarn --offline eleventy
            find _site -name "*.html" -exec tidy --wrap 80 --indent auto --indent-spaces 2  --wrap 80 --quiet --tidy-mark no -modify {} \;
          '';

          installPhase = ''cp -r _site $out'';

          # Fix potential permissions issues
          dontFixup = true;
        };

        # Helper function to create scripts
        mkScript =
          name:
          (pkgs.writeScriptBin name (builtins.readFile ./bin/${name})).overrideAttrs (old: {
            buildCommand = "${old.buildCommand}\n patchShebangs $out";
          });

        # Helper function to create packages
        mkPackage =
          name:
          pkgs.symlinkJoin {
            inherit name;
            paths = [ (mkScript name) ] ++ commonBuildInputs;
            buildInputs = [ pkgs.makeWrapper ];
            postBuild = "wrapProgram $out/bin/${name} --prefix PATH : $out/bin";
          };

        # Script names
        scripts = [
          "build"
          "serve"
          "tidy_html"
        ];

        # Generate all packages
        scriptPackages = builtins.listToAttrs (
          map (name: {
            inherit name;
            value = mkPackage name;
          }) scripts
        );

      in
      rec {
        defaultPackage = packages.site;
        packages = scriptPackages // {
          inherit site;
        };

        devShells = rec {
          default = dev;
          dev = pkgs.mkShell {
            buildInputs = commonBuildInputs ++ (builtins.attrValues packages);
            shellHook = ''
              rm -rf node_modules
              rm -rf package.json
              ln -sf ${packageJSON} package.json
              ln -sf ${nodeModules}/node_modules .
              echo "Development environment ready!"
              echo "Run 'serve' to start development server"
              echo "Run 'build' to build the site in the _site directory"
              echo "Run 'tidy_html' to run html-tidy over each file in _site"
            '';
          };
        };
      }
    );
}
