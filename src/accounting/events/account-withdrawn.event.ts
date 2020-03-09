import { v4 as uuidv4 } from 'uuid'
import { DomainEventInterface } from '../../interfaces'

type AccountDepositEventPayloadType = {
  withdrawnAmount: number
  currentBalance: number
  time: Date
}

export class AccountWithdrawnEvent implements DomainEventInterface {
  public static readonly kind: string = 'accountWithdrawn'

  constructor(
    public readonly entityId: string,
    public readonly payload: AccountDepositEventPayloadType,
    public readonly eventId: string = uuidv4(),
    public readonly kind: string = AccountWithdrawnEvent.kind
  ) { }
}
