# fnm is a node.js version manager
# fnm
set FNM_PATH "/home/lhc_fl/.local/share/fnm"
if [ -d "$FNM_PATH" ]
  set PATH "$FNM_PATH" $PATH
  fnm env | source
end
