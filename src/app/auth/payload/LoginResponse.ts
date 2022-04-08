export class LoginResponse {
  accessToken: string;
  type: string;
  refreshToken: string;
  user: User;
}

class User {
  id: string
  name: string
  avatar: string
  personalMail: string
  companyMail: string
  username: string
  authorities: [
    {
      authority: string
    }
  ]
}
