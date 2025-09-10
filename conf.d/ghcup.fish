# ghcup is the Haskell toolchain installer and version manager

set -q GHCUP_INSTALL_BASE_PREFIX[1]; or set GHCUP_INSTALL_BASE_PREFIX $HOME
fish_add_path $HOME/.cabal/bin
fish_add_path $HOME/.ghcup/bin