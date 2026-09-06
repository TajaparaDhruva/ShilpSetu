import { AppNotification, INITIAL_MOCK_NOTIFICATIONS } from '@/constants/mockData';

class NotificationService {
  private notifications: AppNotification[] = [...INITIAL_MOCK_NOTIFICATIONS];

  async getNotifications(): Promise<AppNotification[]> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return [...this.notifications];
  }

  async markAsRead(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const index = this.notifications.findIndex((n) => n.id === id);
    if (index !== -1) {
      this.notifications[index].isRead = true;
      return true;
    }
    return false;
  }

  async markAllAsRead(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    this.notifications = this.notifications.map((n) => ({ ...n, isRead: true }));
  }

  getUnreadCount(): number {
    return this.notifications.filter((n) => !n.isRead).length;
  }
}

export const notificationService = new NotificationService();
