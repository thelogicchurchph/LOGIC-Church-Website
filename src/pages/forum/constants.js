import { ForumRounded, ChatBubbleOutline, FavoriteBorder, MenuBook, Campaign } from '@mui/icons-material';

export const SIDEBAR_CATEGORIES = [
  { id: 'All', label: 'All Discussions', icon: ForumRounded, gradient: 'from-gray-500 to-gray-400' },
  { id: 'General', label: 'General', icon: ChatBubbleOutline, gradient: 'from-blue-500 to-cyan-400' },
  { id: 'Questions', label: 'Questions', icon: ChatBubbleOutline, gradient: 'from-teal-500 to-emerald-400' },
  { id: 'Prayer Wall', label: 'Prayer Wall', icon: FavoriteBorder, gradient: 'from-red-500 to-pink-500' },
  { id: 'Testimonies', label: 'Testimonies', icon: ForumRounded, gradient: 'from-green-500 to-emerald-400' },
  { id: 'Bible Study', label: 'Bible Study', icon: MenuBook, gradient: 'from-amber-500 to-orange-400' },
  { id: 'Announcements', label: 'Announcements', icon: Campaign, gradient: 'from-purple-500 to-indigo-400' },
];

export const CATEGORIES = SIDEBAR_CATEGORIES.filter(c => c.id !== 'All').map(c => c.id);

export const CATEGORY_COLORS = {
  'General': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Questions': 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  'Prayer Wall': 'bg-red-500/10 text-red-400 border-red-500/20',
  'Testimonies': 'bg-green-500/10 text-green-400 border-green-500/20',
  'Bible Study': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'Announcements': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
};
