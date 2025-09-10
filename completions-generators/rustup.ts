export default async function generator() {
  const { stdout } = Bun.spawn(["rustup", "completions", "fish"]);
  return stdout.text();
}