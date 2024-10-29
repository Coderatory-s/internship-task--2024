// // store/useActivityStore.ts
// import { create } from 'zustand';
// import { IActivity } from '@/app/leads/activities/types';

// interface ActivityStore {
//   activities: IActivity[];
//   setActivities: (activities: IActivity[]) => void;
// }

// export const useActivityStore = create<ActivityStore>((set) => ({
//   activities: [],
//   setActivities: (activities) => set({ activities }),
// }));
import { create } from 'zustand';
import { IActivity } from '@/app/leads/activities/types';

interface ActivityState {
  activities: IActivity[];
  addActivity: (activity: IActivity) => void;
  clearActivities: () => void;
}

export const useActivityStore = create<ActivityState>((set) => ({
  activities: [],
  addActivity: (activity) =>
    set((state) => ({
      activities: [...state.activities, activity],
    })),
  clearActivities: () => set({ activities: [] })

}));
