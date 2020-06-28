import sgMail from '@sendgrid/mail';

export default class SendGrid {
  private from: string;
  protected to: string;
  protected subject: string;

  constructor(to: string, subject: string) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
    this.from = 'omokoro@gmail.com';
    this.to = to;
    this.subject = subject;
  }
  async sendMail(): Promise<void> {

    const msg = {
      to: this.to,
      from: this.from,
      subject: this.subject,
      text: 'This is a test of this module',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
      try {
        await sgMail.send(msg);
      } catch (error) {
        console.error(error);
  
        if (error.response) {
          console.error(error.response.body);
        }
      }
  }
}
