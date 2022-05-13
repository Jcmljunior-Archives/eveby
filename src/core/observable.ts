declare interface ObservableInterface {
  observers: string[]
  subscribe(c: any): any
  unsubscribe(c: any): any
  notify(model: any): any
}

export abstract class Observable implements ObservableInterface {
  observers: string[]

  constructor() {
    this.observers = []
  }

  subscribe(c: any) {
    this.observers.push(c)
  }

  unsubscribe(c: any) {
    this.observers = this.observers.filter((observer: any) => {
      return observer instanceof c !== true
    })
  }

  notify(model: any) {
    this.observers.forEach((observer: any) => {
      observer.notify(model)
    })
  }
}
