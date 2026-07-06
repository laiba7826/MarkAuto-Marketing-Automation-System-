import fs from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data');

// Ensure data directory exists
if (!existsSync(DATA_DIR)) {
  mkdirSync(DATA_DIR, { recursive: true });
}

// Initial seed data
const SEED_DATA: Record<string, any[]> = {
  leads: [
    { id: '1', name: 'John Doe', email: 'john@techcorp.com', company: 'TechCorp', status: 'New', revenue: 5000, lastContact: '2024-03-10' },
    { id: '2', name: 'Jane Smith', email: 'jane@innovate.io', company: 'Innovate', status: 'Qualified', revenue: 12000, lastContact: '2024-03-12' },
    { id: '3', name: 'Bob Wilson', email: 'bob@buildit.com', company: 'BuildIt', status: 'Proposal', revenue: 25000, lastContact: '2024-03-15' },
    { id: '4', name: 'Alice Brown', email: 'alice@dataflow.net', company: 'DataFlow', status: 'Negotiation', revenue: 45000, lastContact: '2024-03-18' },
    { id: '5', name: 'Charlie Davis', email: 'charlie@bright.com', company: 'Bright Inc', status: 'Closed', revenue: 15000, lastContact: '2024-03-20' },
  ],
  campaigns: [
    { id: '1', name: 'Q1 Product Launch', status: 'Active', budget: 50000, platform: 'Instagram', owner: 'Mark Marketing', metrics: { clicks: 12500, impressions: 500000, conversions: 450 } },
    { id: '2', name: 'Summer Sale Prep', status: 'Draft', budget: 20000, platform: 'Email', owner: 'Mark Marketing', metrics: { clicks: 0, impressions: 0, conversions: 0 } },
    { id: '3', name: 'Brand Awareness', status: 'Completed', budget: 15000, platform: 'YouTube', owner: 'Mark Marketing', metrics: { clicks: 8000, impressions: 200000, conversions: 120 } },
  ],
  messages: [
    { id: '1', senderId: '3', senderName: 'Mark Marketing', content: 'Hey, did you review the latest campaign assets?', timestamp: '2024-03-20T10:00:00Z', read: false },
    { id: '2', senderId: '5', senderName: 'Sam Sales', content: 'The lead from TechCorp looks promising.', timestamp: '2024-03-20T11:30:00Z', read: true },
    { id: '3', senderId: '2', senderName: 'Sarah Supervisor', content: 'Please submit the Q2 budget request by Friday.', timestamp: '2024-03-21T08:15:00Z', read: false },
  ],
  budgetRequests: [
    { id: '1', campaignId: '1', campaignName: 'Q1 Product Launch', amount: 5000, description: 'Extra social media push', status: 'Pending', requestedBy: 'Mark Marketing', requestedAt: '2024-03-21T09:00:00Z' },
    { id: '2', campaignId: '3', campaignName: 'Brand Awareness', amount: 2000, description: 'Influencer partnership', status: 'Approved', requestedBy: 'Mark Marketing', requestedAt: '2024-03-15T14:00:00Z', approvedAmount: 2000 },
  ],
  platforms: [
    { id: '1', name: 'Instagram', type: 'Social', status: 'Connected', accountHandle: '@markauto' },
    { id: '2', name: 'Mailchimp', type: 'Email', status: 'Connected', accountHandle: 'markauto-news' },
    { id: '3', name: 'Google Ads', type: 'Search', status: 'Disconnected', accountHandle: 'MarkAuto Ads' },
  ],
  users: [
    { id: '1', name: 'Admin User', email: 'admin@marketing.com', role: 'Admin', status: 'Active', phone: '0300-1111111' },
    { id: '2', name: 'Sarah Supervisor', email: 'sarah@marketing.com', role: 'Supervisor', status: 'Active', phone: '0300-2222222' },
    { id: '3', name: 'Mark Marketing', email: 'mark@marketing.com', role: 'Marketing', status: 'Active', phone: '0300-3333333' },
    { id: '4', name: 'Cathy Content', email: 'cathy@marketing.com', role: 'Content', status: 'Active', phone: '0300-4444444' },
    { id: '5', name: 'Sam Sales', email: 'sam@marketing.com', role: 'Sales', status: 'Inactive', phone: '0300-5555555' },
  ],
  posts: [
    { id: '1', title: 'Launch teaser reel', platform: 'Instagram', scheduledFor: '2024-04-01T09:00', status: 'Scheduled', assetName: 'teaser.mp4' },
    { id: '2', title: 'Feature highlight', platform: 'YouTube', scheduledFor: '2024-04-03T12:00', status: 'Draft' },
    { id: '3', title: 'Customer story', platform: 'Instagram', scheduledFor: '2024-03-28T15:00', status: 'Published', assetName: 'story.jpg' },
  ],
  assets: [
    { id: '1', fileName: 'teaser.mp4', type: 'video', sizeKb: 8240, uploadedAt: '2024-03-25', linkedPost: 'Launch teaser reel' },
    { id: '2', fileName: 'story.jpg', type: 'image', sizeKb: 540, uploadedAt: '2024-03-26', linkedPost: 'Customer story' },
  ],
  strategies: [
    { id: '1', title: 'Reels-first growth', objective: 'Grow IG reach 30% in Q2', owner: 'Cathy Content', contentType: 'Reel', status: 'Pending' },
    { id: '2', title: 'Email re-engagement', objective: 'Win back dormant subscribers', owner: 'Cathy Content', contentType: 'Copy', status: 'Approved' },
  ],
  sales: [
    { id: '1', leadName: 'Charlie Davis', service: 'SEO Package', revenue: 15000, closedAt: '2024-03-20' },
    { id: '2', leadName: 'Acme Co', service: 'Social Management', revenue: 22000, closedAt: '2024-03-22' },
  ],
  reviews: [
    { id: '1', title: 'Launch teaser reel', submittedBy: 'Cathy Content', type: 'Post', status: 'Pending', submittedAt: '2024-03-26' },
    { id: '2', title: 'Spring banner set', submittedBy: 'Cathy Content', type: 'Asset', status: 'Pending', submittedAt: '2024-03-27' },
  ],
  revenueData: [
    { name: 'Jan', amount: 45000 }, { name: 'Feb', amount: 52000 }, { name: 'Mar', amount: 48000 },
    { name: 'Apr', amount: 61000 }, { name: 'May', amount: 55000 }, { name: 'Jun', amount: 67000 },
  ]
};

export class JSONDb {
  private static getFilePath(collection: string): string {
    return path.join(DATA_DIR, `${collection}.json`);
  }

  // Load a collection's items
  static async getCollection<T>(collection: string): Promise<T[]> {
    const file = this.getFilePath(collection);
    try {
      if (!existsSync(file)) {
        // Seed database file if it doesn't exist
        const initialData = SEED_DATA[collection] || [];
        await fs.writeFile(file, JSON.stringify(initialData, null, 2), 'utf-8');
        return initialData as T[];
      }
      const dataStr = await fs.readFile(file, 'utf-8');
      return JSON.parse(dataStr) as T[];
    } catch (error) {
      console.error(`Error reading collection ${collection}:`, error);
      return [];
    }
  }

  // Write a collection's items
  static async saveCollection<T>(collection: string, items: T[]): Promise<void> {
    const file = this.getFilePath(collection);
    try {
      await fs.writeFile(file, JSON.stringify(items, null, 2), 'utf-8');
    } catch (error) {
      console.error(`Error saving collection ${collection}:`, error);
    }
  }

  // Create an item
  static async insert<T extends { id: string }>(collection: string, item: Omit<T, 'id'>): Promise<T> {
    const items = await this.getCollection<T>(collection);
    const newItem = {
      ...item,
      id: Date.now().toString()
    } as T;
    items.unshift(newItem); // Insert at the beginning
    await this.saveCollection(collection, items);
    return newItem;
  }

  // Update an item
  static async update<T extends { id: string }>(collection: string, id: string, patch: Partial<T>): Promise<T | null> {
    const items = await this.getCollection<T>(collection);
    let updatedItem: T | null = null;
    const updatedItems = items.map(item => {
      if (item.id === id) {
        updatedItem = { ...item, ...patch };
        return updatedItem;
      }
      return item;
    });
    if (!updatedItem) return null;
    await this.saveCollection(collection, updatedItems);
    return updatedItem;
  }

  // Delete an item
  static async delete<T extends { id: string }>(collection: string, id: string): Promise<boolean> {
    const items = await this.getCollection<T>(collection);
    const filtered = items.filter(item => item.id !== id);
    if (filtered.length === items.length) return false;
    await this.saveCollection(collection, filtered);
    return true;
  }
}
