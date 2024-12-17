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
          sass
          yarn
          yarn2nix
        ];

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
          "push"
          "upgrade"
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
        defaultPackage = packages.serve;
        packages = scriptPackages;

        devShells = rec {
          default = dev;
          dev = pkgs.mkShell {
            buildInputs = commonBuildInputs ++ (builtins.attrValues packages);
            shellHook = ''
              echo "Development environment ready!"
              echo "Run 'serve' to start development server"
              echo "Run 'build' to build the site in the _site directory"
              echo "Run 'push' to push this site to surge.sh"
              echo "Run 'upgrade' to upgrade dependencies"
            '';
          };
        };
      }
    );
}
