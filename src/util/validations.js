export function validateEmail(email, users) {
  const regex = /\S+@\S+\.\S+/;
  if (!regex.test(email)) return "invalid email format";

  const user = users.find(user => user.email === email);
  if (user) return "This email has already been registered";

  return true;
}

export function validatePassword(password) {
  const regex = /^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z])/;
  if (!regex.test(password)) return "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character";
  return true;  
}

export function validateConfirmPassord(password, confrmPassword) {
  if (password !== confrmPassword) return "Incorrect password confirmation";
  return true;  
}

export function validateName(name) {
  if (name.length < 1) return "Add your name";

  return true;
}

export function validateLogin(users, email, password) {
  const message = "Login or password incorrect"
  if (users.length < 1) return message;

  const dateUser = users.find(user => user.email === email);
  if (!dateUser) return message;

  if(dateUser.password !== password) return message;

  return true;
}
