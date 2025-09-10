# something for git

# we want to set the GPG_TTY so that git commit signing works
set -gx GPG_TTY $(tty)
