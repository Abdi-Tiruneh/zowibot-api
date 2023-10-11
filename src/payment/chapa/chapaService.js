var request = require("request");

function initiateTransaction(user, amount, tx_ref) {
  const options = {
    method: "POST",
    url: "https://api.chapa.co/v1/transaction/initialize",
    headers: {
      Authorization: `Bearer ${process.env.AUTHORIZATION_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: amount,
      currency: "ETB",
      first_name: user.firstName,
      last_name: user.lastName,
      tx_ref: tx_ref,
      callback_url: `http://localhost:5000/api/v1/transactions/verify/${tx_ref}`,
      "customization[title]": "Payment for my favourite virtual game",
      "customization[description]": "I love zowibot virtual game",
    }),
  };

  return new Promise((resolve, reject) => {
    request(options, function (error, response) {
      if (error) {
        reject(error);
      } else {
        try {
          const responseBody = JSON.parse(response.body);
          resolve(responseBody);
        } catch (parseError) {
          reject(parseError);
        }
      }
    });
  });
}

function verifyTransaction(tx_ref) {
  const options = {
    method: "GET",
    url: `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
    headers: {
      Authorization: `Bearer ${process.env.AUTHORIZATION_TOKEN}`,
    },
  };

  return new Promise((resolve, reject) => {
    request(options, function (error, response) {
      if (error) reject(error);
      else {
        try {
          const responseBody = JSON.parse(response.body);
          resolve(responseBody);
        } catch (parseError) {
          reject(parseError);
        }
      }
    });
  });
}

module.exports = {
  initiateTransaction,
  verifyTransaction,
};
