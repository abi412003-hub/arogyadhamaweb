// Lets `node` run the repo's pure TypeScript modules in check scripts: an extensionless relative
// import ("./tariff-rates") resolves to its .ts file. Node 24 strips the types itself.
//   node --import ./scripts/ts-ext-hook.mjs scripts/check-stay-booking.mjs
import { registerHooks } from "node:module";

registerHooks({
  resolve(specifier, context, nextResolve) {
    try {
      return nextResolve(specifier, context);
    } catch (err) {
      if (specifier.startsWith(".") && !/\.[cm]?[jt]sx?$/.test(specifier)) return nextResolve(`${specifier}.ts`, context);
      throw err;
    }
  },
});
