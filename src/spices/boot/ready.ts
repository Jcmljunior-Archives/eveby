import { Boot } from "../../core/boot";

export default class Ready extends Boot {
  constructor() {
    super({
      name: "ready",
    });
  }

  run() {
    console.log("Tudo Pronto.");
  }
}
