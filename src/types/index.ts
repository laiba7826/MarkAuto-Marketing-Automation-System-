export type Role = 'Visitor' | 'Admin' | 'Supervisor' | 'Marketing' | 'Content' | 'Sales';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status?: 'Active' | 'Inactive';
  phone?: string;
  avatar?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Closed';
  revenue: number;
  lastContact: string;
}

export interface Campaign {
  id: string;
  name: string;
  status: 'Draft' | 'Active' | 'Paused' | 'Completed';
  metrics: { clicks: number; impressions: number; conversions: number };
  budget: number;
  platform?: string;
  owner?: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: Role;
  content: string;
  timestamp: string;
  read: boolean;
  recipientTeam: 'Marketing' | 'Supervisors' | 'Sales' | 'Content' | 'Admin';
}

export interface BudgetRequest {
  id: string;
  campaignId: string;
  campaignName: string;
  amount: number;
  description: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Countered';
  requestedBy: string;
  requestedAt: string;
  approvedAmount?: number;
  decisionNote?: string;
}

export interface Platform {
  id: string;
  name: string;
  type: 'Social' | 'Email' | 'Search' | 'Display';
  status: 'Connected' | 'Disconnected';
  accountHandle: string;
}

export interface ScheduledPost {
  id: string;
  title: string;
  platform: string;
  scheduledFor: string;
  status: 'Scheduled' | 'Published' | 'Draft';
  assetName?: string;
}

export interface MediaAsset {
  id: string;
  fileName: string;
  type: 'image' | 'video';
  sizeKb: number;
  uploadedAt: string;
  linkedPost?: string;
}

export interface Strategy {
  id: string;
  title: string;
  objective: string;
  owner: string;
  contentType: 'Reel' | 'Post' | 'Copy';
  status: 'Pending' | 'Approved' | 'Rejected' | 'Archived';
}

export interface Sale {
  id: string;
  leadName: string;
  service: string;
  revenue: number;
  closedAt: string;
}

export interface ReviewItem {
  id: string;
  title: string;
  submittedBy: string;
  type: 'Post' | 'Asset' | 'Copy';
  status: 'Pending' | 'Approved' | 'Rejected';
  submittedAt: string;
}
