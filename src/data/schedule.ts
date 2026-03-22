import { speakers } from './speakers';

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
}

export const scheduleItems: ScheduleItem[] = [
  { time: '08:30 - 09:15', type: 'registration', emoji: '☕️🎫', title: 'Registration & Welcome Coffee', description: 'Pick up your badge, grab a coffee, and start networking with fellow Mac Admins' },
  { time: '09:15 - 09:30', type: 'keynote', emoji: '🎉', title: 'Opening', description: 'Welcome to Mac Admins Europe 2026' },
  {
    time: '09:30 - 10:15',
    type: 'session',
    title: 'Session 1',
    // speakerIds: [] // Unassigned
  },
  {
    time: '10:15 - 10:40',
    type: 'sponsor',
    title: 'Sponsor Session 1',
    // speakerIds: [] // Unassigned
  },
  { time: '10:40 - 11:10', type: 'break', emoji: '☕️', title: 'Coffee Break', description: 'Refresh and visit our exhibitors' },
  {
    time: '11:10 - 11:55',
    type: 'session',
    title: 'Session 2',
    // speakerIds: [] // Unassigned
  },
  {
    time: '11:55 - 12:20',
    type: 'sponsor',
    title: 'Sponsor Session 2',
    // speakerIds: [] // Unassigned
  },
  { time: '12:20 - 13:20', type: 'lunch', emoji: '🍽️', title: 'Lunch & Networking', description: 'Enjoy lunch, visit exhibitors, and connect with peers' },
  {
    time: '13:20 - 14:05',
    type: 'session',
    title: 'Session 3',
    // speakerIds: [] // Unassigned
  },
  {
    time: '14:05 - 14:50',
    type: 'session',
    title: 'Session 4',
    // speakerIds: [] // Unassigned
  },
  { time: '14:50 - 15:20', type: 'break', emoji: '☕️', title: 'Coffee Break', description: 'Last chance to visit exhibitors' },
  {
    time: '15:20 - 15:45',
    type: 'sponsor',
    title: 'Sponsor Session 3',
    // speakerIds: [] // Unassigned
  },
  {
    time: '15:45 - 16:30',
    type: 'session',
    title: 'Session 5',
    // speakerIds: [] // Unassigned
  },
  {
    time: '16:30 - 16:55',
    type: 'sponsor',
    title: 'Sponsor Session 4',
    // speakerIds: [] // Unassigned
  },
  { time: '16:55 - 17:15', type: 'keynote', emoji: '🎬', title: 'Closing Session', description: 'Key takeaways and looking ahead' }
];
