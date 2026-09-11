import { MOCK_USER } from '@/constants/mockData';

















class AuthService {
  currentUser = MOCK_USER;
  isUserAuthenticated = true; // Set to true by default for developer ease, editable via auth actions

  async login(params) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (!params.mobile || params.mobile.length < 10) {
      return { success: false, message: 'Please enter a valid 10-digit mobile number' };
    }

    return { success: true, message: 'OTP sent successfully to ' + params.mobile };
  }

  async signup(params) {
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (!params.name || !params.mobile) {
      return { success: false, message: 'Name and mobile number are required' };
    }

    const newUser = {
      id: 'artisan_' + Date.now(),
      name: params.name,
      mobile: params.mobile,
      craftCategory: params.craftCategory || 'Woodwork & Carving',
      location: 'Jaipur, Rajasthan',
      preferredLanguage: params.preferredLanguage || 'hi',
      profilePhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
      bio: 'Craft artisan on ShilpSetu',
      experienceYears: 5,
      completionPercentage: 70
    };

    this.currentUser = newUser;
    return { success: true, user: newUser };
  }

  async verifyOTP(params) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (params.otp !== '123456' && params.otp.length !== 6) {
      return { success: false, message: 'Invalid OTP. For test mode, enter 123456 or any 6 digits.' };
    }

    this.isUserAuthenticated = true;
    if (!this.currentUser) {
      this.currentUser = MOCK_USER;
    }

    return { success: true, user: this.currentUser };
  }

  async logout() {
    await new Promise((resolve) => setTimeout(resolve, 400));
    this.isUserAuthenticated = false;
    this.currentUser = null;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isAuthenticated() {
    return this.isUserAuthenticated;
  }

  async updateProfile(updates) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    if (this.currentUser) {
      this.currentUser = { ...this.currentUser, ...updates };
    }
    return this.currentUser || MOCK_USER;
  }
}

export const authService = new AuthService();