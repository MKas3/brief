interface IRequestUserData {
  email: string;
  name: string;
  password: string;
}

interface IRequestGoogleUserData {
  token: string;
}

interface IResponseUserData {
  id: string;
  email: string;
  name: string;
  token: string;
  role: Role;
  isGoogle: boolean;
}
