import fastify from 'fastify'
import { v4 as uuidv4 } from 'uuid'
import { filter } from 'rxjs/operators'
import commandBus from './command-bus'
import {
  DepositMoneyCommand,
  WithdrawMoneyCommand,
  CreateAccountCommand
} from './accounting/commands'
import eventBus from './event-bus'
import { DomainEventInterface } from './interfaces'
import store from './store/store'
import { AccountReadModelInterface } from './accounting/account-read-model.interface'
import {
  AccountDepositedEvent,
  AccountWithdrawnEvent,
  AccountCreatedEvent
} from './accounting/events'
import { NotFoundError } from './util/http.error'

const server = fastify({ logger: true })

server.post('/account', async (request) => {
  const id = uuidv4()

  return commandBus.dispatch(new CreateAccountCommand(
    id,
    request.body.owner
  ))
})

server.get('/account/:accountId', async (request) =>
  store.get(`readmodel.account.${request.params.accountId}`)
    || new NotFoundError('Account not found')
)

server.post('/account/:accountId/deposit', async (request) => {
  return commandBus.dispatch(new DepositMoneyCommand(
    request.params.accountId,
    request.body.amount
  ))
})

server.post('/account/:accountId/withdraw', async (request) => {
  return commandBus.dispatch(new WithdrawMoneyCommand(
    request.params.accountId,
    request.body.amount
  ))
})

eventBus.events
  .pipe(
    filter(x => x.kind === AccountCreatedEvent.kind)
  )
  .subscribe(event => {
    const storeKey = `readmodel.account.${event.entityId}`

    const account = {
      id: event.entityId,
      ownerName: event.payload.ownerName,
      currentBalance: event.payload.initialBalance,
      createdAt: event.payload.time
    } as AccountReadModelInterface

    store.set(storeKey, account)
  })

eventBus.events
  .pipe(
    filter(x =>
      [AccountDepositedEvent.kind, AccountWithdrawnEvent.kind]
        .includes(x.kind))
  )
  .subscribe(event => {
    const storeKey = `readmodel.account.${event.entityId}`

    const account = {
      ...store.get(storeKey),
      currentBalance: event.payload.currentBalance,
      lastUpdatedAt: event.payload.time
    } as AccountReadModelInterface

    store.set(storeKey, account)
  })

const port = 3000

server.listen(port, (e) => console.log(e || `Server listening on port ${port}`))
