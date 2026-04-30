const mail = async ({ name, email, message }) => {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
      name: name,
      email: email,
      message: message,
    }),
  });

  const result = await response.json();
  return { status: response.status, ...result };
};

export default mail;
