import { v4 as uuidv4 } from 'uuid'
import { DomainEventInterface } from '../../interfaces'

type AccountCreatedEventPayloadType = {
  ownerName: string
  initialBalance: number
  time: Date
}

export class AccountCreatedEvent implements DomainEventInterface {
  public static readonly kind: string = 'accountCreated'

  constructor(
    public entityId: string,
    public payload: AccountCreatedEventPayloadType,
    public readonly eventId: string = uuidv4(),
    public readonly kind: string = AccountCreatedEvent.kind
  ) { }
}
