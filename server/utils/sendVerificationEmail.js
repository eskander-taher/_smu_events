const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	auth: {
		user: process.env.EMAIL_ADDRESS,
		pass: process.env.EMAIL_PASSWORD,
	},
	tls: {
		rejectUnauthorized: false,
	},
});

const generateVerificationLink = (id) => {
	const verificationToken = jwt.sign({ id: id }, process.env.SECRET, {
		expiresIn: "1d",
	});
	return `http://localhost:80/api/verify-email?token=${verificationToken}`;
};

async function sendVerificationEmail(id, email) {
	const htmlContent = `
    <!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Подтверждение адреса электронной почты</title>
      <style>
        .container {
			font-family: Arial, sans-serif;
			background-color: #f0f0f0;
			padding: 40px;
			border-radius: 8px;
			box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
			max-width: 500px;
			text-align: center;
		}

		p {
			font-size: 18px;
			color: #333;
			margin: 0;
			padding: 0;
			line-height: 1.5;
			margin-bottom: 15px;
		}

		.button {
			display: inline-block;
			background-color: #007bff;
			color: #fff;
			text-decoration: none;
			padding: 10px 20px;
			border-radius: 5px;
			transition: background-color 0.3s ease;
		}

		.button:hover {
			background-color: #0056b3;	
		}

		.button-text {
			color: #fff;
			text-decoration: none;
		}
      </style>
    </head>
    <body>
      	<div class="container">
			<p>Пожалуйста, нажмите следующую кнопку, чтобы подтвердить свой адрес электронной почты:</p>
			<a href="${generateVerificationLink(
				id
			)}" class="button"><span class="button-text">Подтвердить адрес</span></a>
		</div>
    </body>
    </html>
  `;

	const message = {
		from: process.env.EMAIL_ADDRESS,
		to: email,
		subject: "Подтвердите ваш адрес электронной почты",
		html: htmlContent,
	};
	await transporter.sendMail(message);
}

module.exports = sendVerificationEmail;
