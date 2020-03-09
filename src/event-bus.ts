import { DomainEventInterface } from './interfaces'

class EventBus {
  private handler: Function = () => {}

  setHandler(callback: Function) {
    this.handler = callback
  }

  dispatchMany(events: DomainEventInterface[]) {
    for (const event of events) {
      this.dispatch(event)
    }
  }

  private dispatch(event: DomainEventInterface) {
    setTimeout(() => this.handleEvent(event))
  }

  private handleEvent(event: DomainEventInterface) {
    this.handler(event)
  }
}

const eventBus = new EventBus()

export default eventBus
