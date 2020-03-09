import { CommandInterface } from '../../interfaces'

export class CreateAccountCommand implements CommandInterface {
  public static readonly kind: string = 'createAccount'

  constructor(
    public readonly entityId: string,
    public readonly owner: string,
    public readonly kind: string = CreateAccountCommand.kind,
    public readonly time: Date = new Date()
  ) { }
}
