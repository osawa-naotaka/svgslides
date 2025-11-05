{
  description = "node develop environment";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs = { self, nixpkgs }:
  let
    system = "x86_64-linux";
    pkgs = import nixpkgs { inherit system; };
  in {
    devShells.${system}.default = pkgs.mkShell {
      buildInputs = with pkgs; [
        electron
        wine
        bun
      ];
      shellHook = ''
        export ELECTRON_OVERRIDE_DIST_PATH=${pkgs.electron_38}/bin
      '';
    };
  };
}
