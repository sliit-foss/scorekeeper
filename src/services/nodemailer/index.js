const fs = require('fs');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');

const transport = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE,
  host: process.env.NODEMAILER_MAIL_HOST,
  auth: {
    user: process.env.NODEMAILER_MAIL_USER,
    pass: process.env.NODEMAILER_MAIL_PASSWORD
  },
  pool: true
});

handlebars.registerHelper('equals', function (arg1, arg2, options) {
  return arg1 === arg2 ? options.fn(this) : options.inverse(this);
});

exports.sendMailViaNodemailer = ({
  template: templateName,
  data: templateData = {},
  options: { to, cc, bcc, subject, attachments = [] } = {}
}) => {
  const replacements = JSON.parse(templateData);
  let templateHTML;
  try {
    templateHTML = fs.readFileSync(`${__dirname}/templates/${templateName}.html`, 'utf8');
  } catch (error) {
    throw new Error(`Template not found - ${templateName}`);
  }
  const template = handlebars.compile(templateHTML);
  const htmlToSend = template(replacements);
  const mailOptions = {
    from: {
      name: 'SLIIT FOSS Community',
      address: process.env.NODEMAILER_MAIL_USER
    },
    to,
    cc,
    bcc,
    subject,
    html: htmlToSend,
    attachments
  };
  if (Array.isArray(attachments) && attachments.length > 0) {
    mailOptions.attachments = attachments.map((fileAttachment) => ({
      content: fileAttachment.content,
      filename: fileAttachment.file_name,
      contentType: fileAttachment.type
    }));
  }
  return new Promise((resolve, reject) => {
    transport.sendMail(mailOptions, (error) => {
      if (error) {
        reject(error);
      }
      resolve(true);
    });
  });
};
