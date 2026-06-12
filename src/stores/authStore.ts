import { makeAutoObservable } from 'mobx';

class AuthStore {
  isAuthenticated = false;
  userId: string | null = null;
  nickname: string | null = null;
  profileImage: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return this.isAuthenticated;
  }

  login(userId: string, nickname: string) {
    this.isAuthenticated = true;
    this.userId = userId;
    this.nickname = nickname;
  }

  updateProfile(nickname: string, profileImage?: string | null) {
    this.nickname = nickname;
    if (profileImage !== undefined) this.profileImage = profileImage;
  }

  logout() {
    this.isAuthenticated = false;
    this.userId = null;
    this.nickname = null;
    this.profileImage = null;
  }
}

export default new AuthStore();
