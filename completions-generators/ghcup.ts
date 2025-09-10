export default async function generator() {
  const { stdout } = Bun.spawn(["ghcup", "-h"]);
  const text = await stdout.text();

  const head =
`# disable file completion
complete -c ghcup -f
`;

  const [_, body] = text.match(/commands:([\s\S]*?)\n\n/)!;
  
  const out = body!.trim().split("\n").map(line => {
    const [_, command, description] = line.trim().match(/^(\w+)\s+(.*)$/)!;
    return `complete -c ghcup -n '__fish_use_subcommand' -a '${command}' -d '${description}'`;
  });

  return [head, ...out].join("\n") + "\n";
}