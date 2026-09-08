export const sampleUsers = [
  { id: 'user-001', name: 'Maya Chen', email: 'maya.chen@example.com', team: 'Trail Blazers', level: 'Pro' },
  { id: 'user-002', name: 'Jordan Ellis', email: 'jordan.ellis@example.com', team: 'Pulse Squad', level: 'Advanced' },
  { id: 'user-003', name: 'Noah Williams', email: 'noah.williams@example.com', team: 'Trail Blazers', level: 'Intermediate' },
  { id: 'user-004', name: 'Sofia Patel', email: 'sofia.patel@example.com', team: 'Sunrise Crew', level: 'Advanced' },
]

export const sampleActivities = [
  { id: 'activity-001', name: 'Morning Run', type: 'Run', duration: '32 min', points: 86 },
  { id: 'activity-002', name: 'Power Flow', type: 'Yoga', duration: '45 min', points: 72 },
  { id: 'activity-003', name: 'Hill Intervals', type: 'Cycle', duration: '38 min', points: 94 },
  { id: 'activity-004', name: 'Strength Circuit', type: 'Strength', duration: '28 min', points: 81 },
]

export const sampleLeaderboard = [
  { id: 'rank-001', rank: 1, name: 'Maya Chen', team: 'Trail Blazers', points: 486 },
  { id: 'rank-002', rank: 2, name: 'Sofia Patel', team: 'Sunrise Crew', points: 452 },
  { id: 'rank-003', rank: 3, name: 'Jordan Ellis', team: 'Pulse Squad', points: 429 },
  { id: 'rank-004', rank: 4, name: 'Noah Williams', team: 'Trail Blazers', points: 387 },
]

export const sampleTeams = [
  { id: 'team-001', name: 'Trail Blazers', captain: 'Maya Chen', members: 12, points: 2840 },
  { id: 'team-002', name: 'Pulse Squad', captain: 'Jordan Ellis', members: 9, points: 2415 },
  { id: 'team-003', name: 'Sunrise Crew', captain: 'Sofia Patel', members: 11, points: 2688 },
]

export const sampleWorkouts = [
  {
    id: 'workout-001', name: 'Tempo Run', difficulty: 'Moderate', duration: '30 min', focus: 'Cardio',
    exercises: [
      { id: 'exercise-001', name: 'Warm-up jog', targetSets: 1, targetReps: '5 min' },
      { id: 'exercise-002', name: 'Tempo intervals', targetSets: 4, targetReps: '2 min' },
      { id: 'exercise-003', name: 'Cool-down walk', targetSets: 1, targetReps: '5 min' },
    ],
  },
  {
    id: 'workout-002', name: 'Full Body Lift', difficulty: 'Challenging', duration: '45 min', focus: 'Strength',
    exercises: [
      { id: 'exercise-004', name: 'Back Squat', targetSets: 4, targetReps: '8 reps' },
      { id: 'exercise-005', name: 'Bench Press', targetSets: 4, targetReps: '8 reps' },
      { id: 'exercise-006', name: 'Barbell Row', targetSets: 3, targetReps: '10 reps' },
    ],
  },
  {
    id: 'workout-003', name: 'Mobility Reset', difficulty: 'Easy', duration: '20 min', focus: 'Mobility',
    exercises: [
      { id: 'exercise-007', name: 'Worlds greatest stretch', targetSets: 2, targetReps: '6 / side' },
      { id: 'exercise-008', name: 'Deep squat hold', targetSets: 3, targetReps: '30 sec' },
      { id: 'exercise-009', name: 'Shoulder flow', targetSets: 2, targetReps: '10 reps' },
    ],
  },
  {
    id: 'workout-004', name: 'Core Builder', difficulty: 'Moderate', duration: '25 min', focus: 'Core',
    exercises: [
      { id: 'exercise-010', name: 'Hanging knee raise', targetSets: 3, targetReps: '12 reps' },
      { id: 'exercise-011', name: 'Cable crunch', targetSets: 3, targetReps: '12 reps' },
      { id: 'exercise-012', name: 'Plank', targetSets: 3, targetReps: '45 sec' },
    ],
  },
]