import { Boot } from "../../core/boot";

export default class Message extends Boot {
  constructor() {
    super({
      name: 'message'
    })
  }

  run(args: string[]) {
    console.log(args)
  }
}
