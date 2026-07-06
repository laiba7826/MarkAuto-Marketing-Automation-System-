import type { Lead, Campaign, Message, BudgetRequest, User, Platform, ScheduledPost, MediaAsset, Strategy, Sale, ReviewItem } from '../types';

export const MOCK_LEADS: Lead[] = [
  { id: '1', name: 'John Doe', email: 'john@techcorp.com', company: 'TechCorp', status: 'New', revenue: 5000, lastContact: '2024-03-10' },
  { id: '2', name: 'Jane Smith', email: 'jane@innovate.io', company: 'Innovate', status: 'Qualified', revenue: 12000, lastContact: '2024-03-12' },
  { id: '3', name: 'Bob Wilson', email: 'bob@buildit.com', company: 'BuildIt', status: 'Proposal', revenue: 25000, lastContact: '2024-03-15' },
  { id: '4', name: 'Alice Brown', email: 'alice@dataflow.net', company: 'DataFlow', status: 'Negotiation', revenue: 45000, lastContact: '2024-03-18' },
  { id: '5', name: 'Charlie Davis', email: 'charlie@bright.com', company: 'Bright Inc', status: 'Closed', revenue: 15000, lastContact: '2024-03-20' },
];

export const MOCK_CAMPAIGNS: Campaign[] = [
  { id: '1', name: 'Q1 Product Launch', status: 'Active', budget: 50000, platform: 'Instagram', owner: 'Mark Marketing', metrics: { clicks: 12500, impressions: 500000, conversions: 450 } },
  { id: '2', name: 'Summer Sale Prep', status: 'Draft', budget: 20000, platform: 'Email', owner: 'Mark Marketing', metrics: { clicks: 0, impressions: 0, conversions: 0 } },
  { id: '3', name: 'Brand Awareness', status: 'Completed', budget: 15000, platform: 'YouTube', owner: 'Mark Marketing', metrics: { clicks: 8000, impressions: 200000, conversions: 120 } },
];

export const MOCK_MESSAGES: Message[] = [
  { id: '1', senderId: '3', senderName: 'Mark Marketing', senderRole: 'Marketing', content: 'Hey, did you review the latest campaign assets?', timestamp: '2024-03-20T10:00:00Z', read: false, recipientTeam: 'Marketing' },
  { id: '2', senderId: '5', senderName: 'Sam Sales', senderRole: 'Sales', content: 'The lead from TechCorp looks promising.', timestamp: '2024-03-20T11:30:00Z', read: true, recipientTeam: 'Marketing' },
  { id: '3', senderId: '2', senderName: 'Sarah Supervisor', senderRole: 'Supervisor', content: 'Please submit the Q2 budget request by Friday.', timestamp: '2024-03-21T08:15:00Z', read: false, recipientTeam: 'Supervisors' },
];

export const MOCK_BUDGET_REQUESTS: BudgetRequest[] = [
  { id: '1', campaignId: '1', campaignName: 'Q1 Product Launch', amount: 5000, description: 'Extra social media push', status: 'Pending', requestedBy: 'Mark Marketing', requestedAt: '2024-03-21T09:00:00Z' },
  { id: '2', campaignId: '3', campaignName: 'Brand Awareness', amount: 2000, description: 'Influencer partnership', status: 'Approved', requestedBy: 'Mark Marketing', requestedAt: '2024-03-15T14:00:00Z', approvedAmount: 2000 },
];

export const MOCK_PLATFORMS: Platform[] = [
  { id: '1', name: 'Instagram', type: 'Social', status: 'Connected', accountHandle: '@markauto' },
  { id: '2', name: 'Mailchimp', type: 'Email', status: 'Connected', accountHandle: 'markauto-news' },
  { id: '3', name: 'Google Ads', type: 'Search', status: 'Disconnected', accountHandle: 'MarkAuto Ads' },
];

export const MOCK_USERS: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@marketing.com', role: 'Admin', status: 'Active', phone: '0300-1111111' },
  { id: '2', name: 'Sarah Supervisor', email: 'sarah@marketing.com', role: 'Supervisor', status: 'Active', phone: '0300-2222222' },
  { id: '3', name: 'Mark Marketing', email: 'mark@marketing.com', role: 'Marketing', status: 'Active', phone: '0300-3333333' },
  { id: '4', name: 'Cathy Content', email: 'cathy@marketing.com', role: 'Content', status: 'Active', phone: '0300-4444444' },
  { id: '5', name: 'Sam Sales', email: 'sam@marketing.com', role: 'Sales', status: 'Inactive', phone: '0300-5555555' },
];

export const MOCK_POSTS: ScheduledPost[] = [
  { id: '1', title: 'Launch teaser reel', platform: 'Instagram', scheduledFor: '2024-04-01T09:00', status: 'Scheduled', assetName: 'teaser.mp4' },
  { id: '2', title: 'Feature highlight', platform: 'YouTube', scheduledFor: '2024-04-03T12:00', status: 'Draft' },
  { id: '3', title: 'Customer story', platform: 'Instagram', scheduledFor: '2024-03-28T15:00', status: 'Published', assetName: 'story.jpg' },
];

export const MOCK_ASSETS: MediaAsset[] = [
  { id: '1', fileName: 'teaser.mp4', type: 'video', sizeKb: 8240, uploadedAt: '2024-03-25', linkedPost: 'Launch teaser reel' },
  { id: '2', fileName: 'story.jpg', type: 'image', sizeKb: 540, uploadedAt: '2024-03-26', linkedPost: 'Customer story' },
];

export const MOCK_STRATEGIES: Strategy[] = [
  { id: '1', title: 'Reels-first growth', objective: 'Grow IG reach 30% in Q2', owner: 'Cathy Content', contentType: 'Reel', status: 'Pending' },
  { id: '2', title: 'Email re-engagement', objective: 'Win back dormant subscribers', owner: 'Cathy Content', contentType: 'Copy', status: 'Archived' },
];

export const MOCK_SALES: Sale[] = [
  { id: '1', leadName: 'Charlie Davis', service: 'SEO Package', revenue: 15000, closedAt: '2024-03-20' },
  { id: '2', leadName: 'Acme Co', service: 'Social Management', revenue: 22000, closedAt: '2024-03-22' },
];

export const MOCK_REVIEWS: ReviewItem[] = [
  { id: '1', title: 'Launch teaser reel', submittedBy: 'Cathy Content', type: 'Post', status: 'Pending', submittedAt: '2024-03-26' },
  { id: '2', title: 'Spring banner set', submittedBy: 'Cathy Content', type: 'Asset', status: 'Pending', submittedAt: '2024-03-27' },
];

export const REVENUE_DATA = [
  { name: 'Jan', amount: 45000 }, { name: 'Feb', amount: 52000 }, { name: 'Mar', amount: 48000 },
  { name: 'Apr', amount: 61000 }, { name: 'May', amount: 55000 }, { name: 'Jun', amount: 67000 },
];
