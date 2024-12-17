{
  pkgs ? import <nixpkgs> { },
}:

let
  packageJSON = pkgs.writeTextFile {
    name = "package.json";
    text = builtins.toJSON {
      name = "chobble-com";
      version = "1.0.0";
      dependencies = {
        "@11ty/eleventy" = "^3.0.0";
        "@11ty/eleventy-plugin-rss" = "^2.0.2";
        "fast-glob" = "^3.3.2";
      };
    };
  };

  nodeModules = pkgs.mkYarnModules {
    pname = "chobble-com-deps";
    version = "1.0.0";
    packageJSON = packageJSON;
    yarnLock = ./yarn.lock;
    yarnFlags = [ "--frozen-lockfile" ];
  };
in
{
  inherit packageJSON nodeModules;
}
