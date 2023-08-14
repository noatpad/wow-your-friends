import type { Platform } from '../ConquerorTable/Conqueror';

interface BaseMilestone {
  date: string,
  message?: string
};

interface ThresholdMilestone extends BaseMilestone {
  type: 'threshold',
  count: number
};

interface FirstMilestone extends BaseMilestone {
  type: 'first',
  platform: Platform,
  firstPlace?: boolean
};

interface SameDayMilestone extends BaseMilestone {
  type: 'sameday',
  count: number
}

interface TimeFrameMilestone extends BaseMilestone {
  type: 'timeframe',
  count: number,
  hours: number
}

interface StreakMilestone extends BaseMilestone {
  type: 'streak',
  days: number
}

interface SpecialMilestone extends BaseMilestone {
  type: 'special',
  text: string
};

interface AnniversaryMilestone extends BaseMilestone {
  type: 'anniversary',
  year: number
}

export type Milestone = ThresholdMilestone | FirstMilestone | SameDayMilestone | TimeFrameMilestone | StreakMilestone | SpecialMilestone | AnniversaryMilestone;
