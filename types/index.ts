export interface UserSummary {
  id: string;
  username: string;
  email: string;
}

export interface PostItem {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author: UserSummary;
  likesCount: number;
  viewsCount: number;
  likedByMe: boolean;
  score: number;
}

export interface AuthResponse {
  user: UserSummary;
  token: string;
}

export interface DashboardData {
  totalPosts: number;
  totalLikes: number;
  totalViews: number;
  bestPost: PostItem | null;
}

export interface ProfileData {
  user: UserSummary;
  totalPosts: number;
  totalLikesReceived: number;
  totalViewsReceived: number;
  posts: PostItem[];
}
