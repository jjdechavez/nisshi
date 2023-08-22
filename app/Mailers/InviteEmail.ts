import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'
import Invite from 'App/Models/Invite'

export default class InviteEmail extends BaseMailer {
  constructor(private user: Invite) {
    super()
  }
  /**
   * WANT TO USE A DIFFERENT MAILER?
   *
   * Uncomment the following line of code to use a different
   * mailer and chain the ".options" method to pass custom
   * options to the send method
   */
  // public mailer = this.mail.use()

  /**
   * The prepare method is invoked automatically when you run
   * "InviteEmail.send".
   *
   * Use this method to prepare the email message. The method can
   * also be async.
   */
  public prepare(message: MessageContract) {
    const url = Route.builder()
      .prefixUrl(Env.get('APP_URL'))
      .params({ id: this.user.id })
      .makeSigned('invites_confirm', { expiresIn: '7d' })

    message
      .subject('Invitation from Nisshi')
      .from(Env.get('FROM_EMAIL'))
      .to(this.user.email)
      .htmlView('emails/invite', {
        url,
      })
  }
}
