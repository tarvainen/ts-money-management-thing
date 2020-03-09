import { v4 as uuidv4 } from 'uuid'
import { DomainEventInterface } from '../../interfaces'

type AccountDepositEventPayloadType = {
  depositAmount: number
  currentBalance: number,
  time: Date
}

export class AccountDepositedEvent implements DomainEventInterface {
  public static readonly kind: string = 'accountDeposited'

  constructor(
    public readonly entityId: string,
    public readonly payload: AccountDepositEventPayloadType,
    public readonly eventId: string = uuidv4(),
    public readonly kind: string = AccountDepositedEvent.kind
  ) { }
}
