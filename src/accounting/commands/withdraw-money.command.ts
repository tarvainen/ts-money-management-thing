import { CommandInterface } from '../../interfaces'

export class WithdrawMoneyCommand implements CommandInterface {
  public static readonly kind: string = 'withdrawMoney'

  constructor(
    public readonly entityId: string,
    public readonly amount: number,
    public readonly kind: string = WithdrawMoneyCommand.kind,
    public readonly time: Date = new Date()
  ) { }
}
