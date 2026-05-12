export type ScheduleBlockType = 'registration' | 'keynote' | 'session' | 'sponsor' | 'break' | 'lunch';

export interface ScheduleItem {
  time: string;
  type: ScheduleBlockType;
  title: string;
  description?: string;
  emoji?: string;
  /**
   * Array of speaker 'order' IDs. 
   * E.g. [2, 10] places Armin and Rob together in the same session.
   */
  speakerIds?: number[];
  /**
   * YouTube URL for the recorded talk.
   */
  youtubeUrl?: string;
}

export const scheduleItems: ScheduleItem[] = [
  { time: '08:30 - 09:15', type: 'registration', emoji: '☕️🎫', title: 'Registration & Welcome Coffee', description: 'Pick up your badge, grab a coffee, and start networking with fellow Mac Admins' },
  { time: '09:15 - 09:30', type: 'keynote', emoji: '🎉', title: 'Opening', description: 'Welcome to Mac Admins Europe 2026' },
  {
    time: '09:30 - 10:15',
    type: 'session',
    title: 'A Few of Our Favorite (Mac Admin) Things',
    speakerIds: [2, 10],
    youtubeUrl: 'https://www.youtube.com/watch?v=MKPJPUc_1x0',
  },
  {
    time: '10:15 - 10:40',
    type: 'sponsor',
    title: 'Securing Developer Workflows (With the Tools They Already Love)',
    speakerIds: [9],
    youtubeUrl: 'https://www.youtube.com/watch?v=hRrSXQrtWmc',
  },
  { time: '10:40 - 11:10', type: 'break', emoji: '☕️', title: 'Coffee Break', description: 'Refresh and visit our exhibitors' },
  {
    time: '11:10 - 11:55',
    type: 'session',
    title: 'There’s Something Strange in the Management Neighbourhood',
    speakerIds: [1],
    youtubeUrl: 'https://www.youtube.com/watch?v=3PCKYq6KZZE',
  },
  {
    time: '11:55 - 12:20',
    type: 'sponsor',
    title: 'Think Different. Then Update: Software Updates, It\'s been a journey.',
    speakerIds: [5],
    youtubeUrl: 'https://www.youtube.com/watch?v=Mpp9yoW9olo',
  },
  { time: '12:20 - 13:20', type: 'lunch', emoji: '🍽️', title: 'Lunch & Networking', description: 'Enjoy lunch, visit exhibitors, and connect with peers' },
  {
    time: '13:20 - 14:05',
    type: 'keynote',
    emoji: '⭐️',
    title: 'Special Guest',
    description: 'More details coming soon',
  },
  {
    time: '14:05 - 14:50',
    type: 'session',
    title: 'Trust, But Verify: Exposing Risk in Your App Catalog',
    speakerIds: [7],
    youtubeUrl: 'https://www.youtube.com/watch?v=l5DXOagVtpA',
  },
  { time: '14:50 - 15:20', type: 'break', emoji: '☕️', title: 'Coffee Break', description: 'Last chance to visit exhibitors' },
  {
    time: '15:20 - 15:45',
    type: 'sponsor',
    title: 'Unlock the future of device management with Fleet',
    speakerIds: [6, 8],
    youtubeUrl: 'https://www.youtube.com/watch?v=OQln89CXldw',
  },
  {
    time: '15:45 - 16:30',
    type: 'session',
    title: 'From Zero to Hero : Making Onboarding Magical',
    speakerIds: [4],
    youtubeUrl: 'https://www.youtube.com/watch?v=e1yehdbIJqI',
  },
  {
    time: '16:30 - 16:55',
    type: 'sponsor',
    title: 'The Perpetual Promise of Passkeys & Passwordless',
    speakerIds: [3],
    youtubeUrl: 'https://www.youtube.com/watch?v=ZXdUnoX-YYo',
  },
  { time: '16:55 - 17:15', type: 'keynote', emoji: '🎬', title: 'Closing Session', description: 'Key takeaways and looking ahead' },
];
