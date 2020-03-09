import { CommandInterface } from '../interfaces/command.interface'
import {
  DepositMoneyCommand,
  WithdrawMoneyCommand,
  CreateAccountCommand
} from './commands'
import { DomainEventInterface } from '../interfaces'
import { AccountCreatedEvent } from './events/account-created.event'
import { AccountDepositedEvent } from './events/account-deposited.event'
import { AccountWithdrawnEvent } from './events/account-withdrawn.event'

export default class AccountAggregate {
  private id: string
  private owner: string
  private balance: number

  constructor() {
    this.id = ''
    this.owner = ''
    this.balance = 0
  }

  apply(command: CommandInterface): DomainEventInterface[] {
    switch (command.kind) {
      case CreateAccountCommand.kind:
        return this._createAccount(command as CreateAccountCommand)
      case DepositMoneyCommand.kind:
        return this._depositMoney(command as DepositMoneyCommand)
      case WithdrawMoneyCommand.kind:
        return this._withdrawMoney(command as WithdrawMoneyCommand)
    }

    return []
  }

  loadFromHistory(history: CommandInterface[]): AccountAggregate {
    for (const command of history) {
      this.apply(command)
    }

    return this
  }

  private _createAccount(command: CreateAccountCommand) {
    this.id = command.entityId
    this.owner = command.owner
    this.balance = 0

    return [
      new AccountCreatedEvent(
        this.id,
        {
          ownerName: this.owner,
          initialBalance: 0,
          time: command.time
        }
      )
    ]
  }

  private _depositMoney(command: DepositMoneyCommand) {
    this.balance += command.amount

    return [
      new AccountDepositedEvent(
        this.id,
        {
          currentBalance: this.balance,
          depositAmount: command.amount,
          time: command.time
        }
      )
    ]
  }

  private _withdrawMoney(command: WithdrawMoneyCommand) {
    this.balance -= command.amount

    return [
      new AccountWithdrawnEvent(
        this.id,
        {
          currentBalance: this.balance,
          withdrawnAmount: command.amount,
          time: command.time
        }
      )
    ]
  }

}
