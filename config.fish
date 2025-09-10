starship init fish | source

for file in ~/.config/fish/conf.d/*.fish
    source $file
end

for file in ~/.config/fish/generated-completions/*.fish
    source $file
end

zoxide init fish | source
alias ls "eza --icons"

if status is-interactive
    sh /home/lhc_fl/start-db-and-redis.sh
    # Commands to run in interactive sessions can go here
end
