import { Subject } from 'rxjs'
import { DomainEventInterface } from './interfaces'

class EventBus {
  constructor(public events: Subject<DomainEventInterface> = new Subject()) { }

  dispatchMany(events: DomainEventInterface[]) {
    for (const event of events) {
      this.dispatch(event)
    }
  }

  private dispatch(event: DomainEventInterface) {
    setTimeout(() => this.handleEvent(event))
  }

  private handleEvent(event: DomainEventInterface) {
    this.events.next(event)
  }
}

const eventBus = new EventBus()

export default eventBus
