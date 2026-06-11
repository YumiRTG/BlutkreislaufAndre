import { useState, useCallback, useEffect } from 'react';

export interface ModuleProgress {
  moduleId: string;
  completed: boolean;
  stepsCompleted: number;
  exercisesCompleted: string[];
  score: number;
}

export function useProgress() {
  const [progress, setProgress] = useState<ModuleProgress[]>(() => {
    const saved = localStorage.getItem('blutkreislauf-progress');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('blutkreislauf-progress', JSON.stringify(progress));
  }, [progress]);

  const getModuleProgress = useCallback((moduleId: string): ModuleProgress => {
    return progress.find(p => p.moduleId === moduleId) || {
      moduleId,
      completed: false,
      stepsCompleted: 0,
      exercisesCompleted: [],
      score: 0
    };
  }, [progress]);

  const completeStep = useCallback((moduleId: string, stepIndex: number) => {
    setProgress(prev => {
      const existing = prev.find(p => p.moduleId === moduleId);
      if (existing) {
        return prev.map(p => 
          p.moduleId === moduleId 
            ? { ...p, stepsCompleted: Math.max(p.stepsCompleted, stepIndex + 1) }
            : p
        );
      }
      return [...prev, { moduleId, completed: false, stepsCompleted: stepIndex + 1, exercisesCompleted: [], score: 0 }];
    });
  }, []);

  const completeExercise = useCallback((moduleId: string, exerciseId: string, score: number) => {
    setProgress(prev => {
      const existing = prev.find(p => p.moduleId === moduleId);
      if (existing) {
        const newExercises = existing.exercisesCompleted.includes(exerciseId) 
          ? existing.exercisesCompleted 
          : [...existing.exercisesCompleted, exerciseId];
        return prev.map(p => 
          p.moduleId === moduleId 
            ? { ...p, exercisesCompleted: newExercises, score: Math.max(p.score, score) }
            : p
        );
      }
      return [...prev, { 
        moduleId, 
        completed: false, 
        stepsCompleted: 0, 
        exercisesCompleted: [exerciseId], 
        score 
      }];
    });
  }, []);

  const completeModule = useCallback((moduleId: string) => {
    setProgress(prev => {
      const existing = prev.find(p => p.moduleId === moduleId);
      if (existing) {
        return prev.map(p => 
          p.moduleId === moduleId 
            ? { ...p, completed: true }
            : p
        );
      }
      return [...prev, { moduleId, completed: true, stepsCompleted: 0, exercisesCompleted: [], score: 0 }];
    });
  }, []);

  const getTotalProgress = useCallback((): number => {
    const completed = progress.filter(p => p.completed).length;
    return completed;
  }, [progress]);

  const resetProgress = useCallback(() => {
    setProgress([]);
    localStorage.removeItem('blutkreislauf-progress');
  }, []);

  return {
    progress,
    getModuleProgress,
    completeStep,
    completeExercise,
    completeModule,
    getTotalProgress,
    resetProgress
  };
}
