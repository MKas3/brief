interface IRequestUserData {
  email: string;
  name: string;
  password: string;
}

interface IUpdateUserData {
  email: string;
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
  avatar?: string;
  role: Role;
  isGoogle: boolean;
}
