import { CommandInterface } from '../../interfaces'

export class DepositMoneyCommand implements CommandInterface {
  public static readonly kind: string = 'depositMoney'

  constructor(
    public readonly entityId: string,
    public readonly amount: number,
    public readonly kind: string = DepositMoneyCommand.kind,
    public readonly time: Date = new Date()
  ) { }
}
