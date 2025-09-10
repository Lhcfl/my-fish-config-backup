export default async function generator() {
  const { stdout } = Bun.spawn(["ghcup", "-h"]);
  const text = await stdout.text();
  const lines = text.split("\n");

  const out : string[] = [
`# disable file completion
complete -c ghcup -f
`,
  ];
  let is_command = false;
  for (const line of lines) {
    if (line.trim() === "") {
      is_command = false;
      continue;
    }
    if (is_command) {
      const matched = line.trim().match(/^(\w+)\s+(.*)$/);
      if (matched) {
        const command = matched[1];
        out.push(`complete -c ghcup -n '__fish_use_subcommand' -a '${command}' -d '${matched[2]}'`);
      } else {
        is_command = false;
      }
    }
    if (line.trim().startsWith("Main commands")) {
      is_command = true;
    }
  }

  return out.join("\n") + "\n";
}