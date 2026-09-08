import { useEffect, useMemo, useState } from 'react'
import { fetchCollection } from '../api.js'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

const exerciseLibrary = [
  { id: 'library-squat', name: 'Back Squat', focus: 'Legs' },
  { id: 'library-bench', name: 'Bench Press', focus: 'Chest' },
  { id: 'library-row', name: 'Barbell Row', focus: 'Back' },
  { id: 'library-rdl', name: 'Romanian Deadlift', focus: 'Hamstrings' },
  { id: 'library-press', name: 'Overhead Press', focus: 'Shoulders' },
  { id: 'library-pullup', name: 'Pull-up', focus: 'Back' },
  { id: 'library-lunge', name: 'Walking Lunge', focus: 'Legs' },
  { id: 'library-plank', name: 'Plank', focus: 'Core' },
]

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [selectedId, setSelectedId] = useState('')
  const [session, setSession] = useState(null)
  const [isCreating, setIsCreating] = useState(false)
  const [routineForm, setRoutineForm] = useState({ name: '', focus: 'Strength', difficulty: 'Moderate', duration: '45 min' })
  const [draftExercises, setDraftExercises] = useState([])

  useEffect(() => {
    const controller = new AbortController()
    fetchCollection(workoutsEndpoint, controller.signal)
      .then((items) => {
        const savedRoutines = JSON.parse(window.localStorage.getItem('octofit-custom-workouts') || '[]')
        const allWorkouts = [...savedRoutines, ...items]
        setWorkouts(allWorkouts)
        setSelectedId(allWorkouts[0]?.id || '')
        setStatus('ready')
      })
      .catch((requestError) => {
        if (requestError.name === 'AbortError') return
        setError(requestError.message)
        setStatus('error')
      })
    return () => controller.abort()
  }, [])

  const selectedWorkout = useMemo(
    () => workouts.find((workout) => workout.id === selectedId),
    [selectedId, workouts],
  )

  function startWorkout(workout) {
    const savedSession = window.localStorage.getItem(`octofit-session-${workout.id}`)
    const exercises = workout.exercises || []
    setSession(savedSession ? JSON.parse(savedSession) : {
      workoutId: workout.id,
      exercises: exercises.map((exercise) => ({
        ...exercise,
        sets: Array.from({ length: exercise.targetSets || 3 }, (_, index) => ({
          id: `${exercise.id}-set-${index + 1}`,
          set: index + 1,
          weight: '',
          reps: '',
          completed: false,
        })),
      })),
    })
  }

  function updateSet(exerciseId, setId, field, value) {
    setSession((current) => {
      const nextSession = {
        ...current,
        exercises: current.exercises.map((exercise) => exercise.id === exerciseId
          ? { ...exercise, sets: exercise.sets.map((set) => set.id === setId ? { ...set, [field]: value } : set) }
          : exercise),
      }
      window.localStorage.setItem(`octofit-session-${nextSession.workoutId}`, JSON.stringify(nextSession))
      return nextSession
    })
  }

  function finishWorkout() {
    if (session) window.localStorage.setItem(`octofit-session-${session.workoutId}`, JSON.stringify(session))
    setSession(null)
  }

  function toggleExercise(exercise) {
    setDraftExercises((current) => current.some((item) => item.id === exercise.id)
      ? current.filter((item) => item.id !== exercise.id)
      : [...current, { ...exercise, targetSets: 3, targetReps: '10 reps' }])
  }

  function updateDraftExercise(exerciseId, field, value) {
    setDraftExercises((current) => current.map((exercise) => exercise.id === exerciseId
      ? { ...exercise, [field]: value }
      : exercise))
  }

  function createRoutine(event) {
    event.preventDefault()
    if (!routineForm.name.trim() || draftExercises.length === 0) return

    const routine = {
      id: `custom-${Date.now()}`,
      name: routineForm.name.trim(),
      focus: routineForm.focus,
      difficulty: routineForm.difficulty,
      duration: routineForm.duration,
      exercises: draftExercises,
      custom: true,
    }
    const savedRoutines = JSON.parse(window.localStorage.getItem('octofit-custom-workouts') || '[]')
    window.localStorage.setItem('octofit-custom-workouts', JSON.stringify([routine, ...savedRoutines]))
    setWorkouts((current) => [routine, ...current])
    setSelectedId(routine.id)
    setRoutineForm({ name: '', focus: 'Strength', difficulty: 'Moderate', duration: '45 min' })
    setDraftExercises([])
    setIsCreating(false)
  }

  if (status === 'loading') return <p className="table-message">Loading training plans…</p>
  if (status === 'error') return <p className="table-message error-message">{error}</p>

  return (
    <section className="resource-page workout-planner">
      <div className="page-heading">
        <div className="heading-line">
          <p className="eyebrow">Training floor</p>
          <span className="live-status"><span className="status-dot" /> Ready when you are</span>
        </div>
        <h1>Workouts</h1>
        <p className="page-description">Pick a plan, start your session, and log every working set as you go.</p>
      </div>

      {!session && <>
        <div className="planner-actions">
          <span>Build a plan that fits your week.</span>
          <button className="create-routine-action" type="button" onClick={() => setIsCreating((current) => !current)}>
            {isCreating ? 'Close builder' : '+ Create routine'}
          </button>
        </div>

        {isCreating && <form className="routine-builder" onSubmit={createRoutine}>
          <div className="builder-heading"><div><span className="detail-kicker">Custom program</span><h2>Build your routine</h2></div><span className="builder-step">01 / 02</span></div>
          <div className="routine-fields">
            <label>Routine name<input required value={routineForm.name} placeholder="e.g. Push day" onChange={(event) => setRoutineForm({ ...routineForm, name: event.target.value })} /></label>
            <label>Focus<select value={routineForm.focus} onChange={(event) => setRoutineForm({ ...routineForm, focus: event.target.value })}><option>Strength</option><option>Cardio</option><option>Mobility</option><option>Core</option></select></label>
            <label>Difficulty<select value={routineForm.difficulty} onChange={(event) => setRoutineForm({ ...routineForm, difficulty: event.target.value })}><option>Easy</option><option>Moderate</option><option>Challenging</option></select></label>
            <label>Duration<select value={routineForm.duration} onChange={(event) => setRoutineForm({ ...routineForm, duration: event.target.value })}><option>20 min</option><option>30 min</option><option>45 min</option><option>60 min</option></select></label>
          </div>
          <div className="builder-heading exercise-builder-heading"><div><span className="detail-kicker">Exercise library</span><h3>Choose your movements</h3></div><span className="builder-step">{draftExercises.length} selected</span></div>
          <div className="exercise-library">
            {exerciseLibrary.map((exercise) => {
              const selectedExercise = draftExercises.find((item) => item.id === exercise.id)
              return <div className={`library-exercise ${selectedExercise ? 'selected' : ''}`} key={exercise.id}>
                <label className="library-check"><input type="checkbox" checked={Boolean(selectedExercise)} onChange={() => toggleExercise(exercise)} /><span>{exercise.name}</span><small>{exercise.focus}</small></label>
                {selectedExercise && <div className="exercise-settings"><label>Sets<input type="number" min="1" max="10" value={selectedExercise.targetSets} onChange={(event) => updateDraftExercise(exercise.id, 'targetSets', Number(event.target.value))} /></label><label>Target reps<input value={selectedExercise.targetReps} onChange={(event) => updateDraftExercise(exercise.id, 'targetReps', event.target.value)} /></label></div>}
              </div>
            })}
          </div>
          <button className="primary-action builder-submit" type="submit" disabled={!routineForm.name.trim() || draftExercises.length === 0}>Save routine <span>→</span></button>
        </form>}

        <div className="workout-grid">
        <div className="workout-list">
          <div className="section-label">Choose a routine</div>
          {workouts.map((workout) => (
            <button className={`workout-card ${selectedId === workout.id ? 'selected' : ''}`} key={workout.id} type="button" onClick={() => setSelectedId(workout.id)}>
              <span className="workout-card-top"><span>{workout.focus}</span><span>{workout.duration}</span></span>
              <strong>{workout.name}</strong>
              <span className="workout-card-bottom">{workout.difficulty} · {workout.exercises?.length || 0} exercises</span>
            </button>
          ))}
        </div>
        <div className="workout-detail">
          {selectedWorkout && <>
            <span className="detail-kicker">Today’s session</span>
            <h2>{selectedWorkout.name}</h2>
            <p>{selectedWorkout.focus} · {selectedWorkout.duration} · {selectedWorkout.difficulty}</p>
            <ul className="exercise-preview">
              {(selectedWorkout.exercises || []).map((exercise) => <li key={exercise.id}><span>{exercise.name}</span><span>{exercise.targetSets} × {exercise.targetReps}</span></li>)}
            </ul>
            <button className="primary-action" type="button" onClick={() => startWorkout(selectedWorkout)}>Start workout <span>→</span></button>
          </>}
        </div>
        </div>
      </>}

      {session && <div className="active-session">
        <div className="session-header">
          <div><span className="detail-kicker">Session in progress</span><h2>{workouts.find((workout) => workout.id === session.workoutId)?.name}</h2></div>
          <button className="finish-action" type="button" onClick={finishWorkout}>Save session</button>
        </div>
        <p className="session-tip">Record the actual weight and reps for every set. Mark a set complete when it is done.</p>
        <div className="exercise-log">
          {session.exercises.map((exercise) => <article className="exercise-block" key={exercise.id}>
            <div className="exercise-heading"><h3>{exercise.name}</h3><span>Target: {exercise.targetSets} × {exercise.targetReps}</span></div>
            <div className="set-table">
              <div className="set-row set-heading"><span>Set</span><span>Weight (kg)</span><span>Reps</span><span>Done</span></div>
              {exercise.sets.map((set) => <div className={`set-row ${set.completed ? 'complete' : ''}`} key={set.id}>
                <span className="set-number">{set.set}</span>
                <input aria-label={`${exercise.name} set ${set.set} weight`} type="number" min="0" step="0.5" value={set.weight} placeholder="0" onChange={(event) => updateSet(exercise.id, set.id, 'weight', event.target.value)} />
                <input aria-label={`${exercise.name} set ${set.set} reps`} type="number" min="0" step="1" value={set.reps} placeholder="0" onChange={(event) => updateSet(exercise.id, set.id, 'reps', event.target.value)} />
                <input aria-label={`${exercise.name} set ${set.set} completed`} type="checkbox" checked={set.completed} onChange={(event) => updateSet(exercise.id, set.id, 'completed', event.target.checked)} />
              </div>)}
            </div>
          </article>)}
        </div>
      </div>}
    </section>
  )
}