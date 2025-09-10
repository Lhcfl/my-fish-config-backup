starship init fish | source

for file in ~/.config/fish/generated-completions/*.fish
    source $file
end

zoxide init fish | source
alias ls "eza --icons"

# Commands to run in interactive sessions can go here
if status is-interactive
    # for discourse
    redis-server --daemonize yes
end
