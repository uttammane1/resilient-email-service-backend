const EmailLog = require('../models/emailLog');
const nodemailer = require('nodemailer');

const providers = [
  nodemailer.createTransport({ service: 'gmail', auth: { user: 'mock1@gmail.com', pass: 'mockpass1' } }),
  nodemailer.createTransport({ service: 'gmail', auth: { user: 'mock2@gmail.com', pass: 'mockpass2' } })
];

class EmailService {
  constructor() {
    this.maxAttempts = 3;
    this.retryDelay = 1000; 
  }

  async sendEmail(recipient, subject, body) {
    const existingLog = await EmailLog.findOne({ recipient, subject, body, status: 'success' });
    if (existingLog) {
      console.log('Idempotency check: Email already sent.');
      return { message: 'Email already sent', status: 'success' };
    }

    // Create email log
    const emailLog = new EmailLog({ recipient, subject, body });
    await emailLog.save();

    // sending email
    let result = null;
    for (const [index, provider] of providers.entries()) {
      result = await this._attemptSend(provider, emailLog, index);
      if (result.status === 'success') break;
    }

    // Save status to database
    emailLog.status = result.status;
    emailLog.sentAt = result.status === 'success' ? new Date() : null;
    await emailLog.save();

    return result;
  }

  async _attemptSend(provider, emailLog, providerIndex) {
    for (let attempt = 1; attempt <= this.maxAttempts; attempt++) {
      try {
        console.log(`Attempt ${attempt} using provider ${providerIndex + 1}`);
        await provider.sendMail({
          from: 'mock1@gmail.com',
          to: emailLog.recipient,
          subject: emailLog.subject,
          text: emailLog.body
        });
        console.log('Email sent successfully!');
        return { status: 'success', providerIndex };
      } catch (error) {
        console.error(`Attempt ${attempt} failed: ${error.message}`);
        await new Promise((resolve) => setTimeout(resolve, this.retryDelay * Math.pow(2, attempt - 1))); 
      }
    }
    console.error('All attempts failed for this provider.');
    return { status: 'failed' };
  }
}

module.exports = new EmailService();
