declare module "*.manual.lua" {
  const raw: string;
  function callMain(args?: any): any;
  function runScript(globals?: any): void;
  export { raw, callMain, runScript };
}
declare module "*.lua" {
  const value: any;
  export default value;
}
