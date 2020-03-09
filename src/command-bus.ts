import { CommandInterface } from './interfaces/command.interface'
import AccountAggregate from './accounting/account.aggregate'
import store from './store/store'
import eventBus from './event-bus'

class CommandBus {
  dispatch(command: CommandInterface): AccountAggregate {
    return this.handleCommand(command)
  }

  private handleCommand(command: CommandInterface): AccountAggregate {
    const accountAggregate = new AccountAggregate()

    const streamId = `commands.account.${command.entityId}`
    const history = store.get(streamId) || []

    accountAggregate.loadFromHistory(history)

    history.push(command)
    store.set(streamId, history)

    const domainEvents = accountAggregate.apply(command)

    eventBus.dispatchMany(domainEvents)

    return accountAggregate
  }
}

const commandBus = new CommandBus()

export default commandBus
