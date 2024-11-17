import { main } from "canvas-gleam";
export const attach = (id: string) => {
  const res = main();
  return [res.foo, res.bar, id];
};
