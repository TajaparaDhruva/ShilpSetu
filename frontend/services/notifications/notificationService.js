import { INITIAL_MOCK_NOTIFICATIONS } from '@/constants/mockData';

class NotificationService {
  notifications = [...INITIAL_MOCK_NOTIFICATIONS];

  async getNotifications() {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return [...this.notifications];
  }

  async markAsRead(id) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const index = this.notifications.findIndex((n) => n.id === id);
    if (index !== -1) {
      this.notifications[index].isRead = true;
      return true;
    }
    return false;
  }

  async markAllAsRead() {
    await new Promise((resolve) => setTimeout(resolve, 300));
    this.notifications = this.notifications.map((n) => ({ ...n, isRead: true }));
  }

  getUnreadCount() {
    return this.notifications.filter((n) => !n.isRead).length;
  }
}

export const notificationService = new NotificationService();