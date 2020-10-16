import Engine from "../engine";

export default interface Level {
  title: string;
  description?: string;
  generate: () => Engine;
}
