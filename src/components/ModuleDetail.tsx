import { useState } from 'react';
import { type LearningModule } from '@/data/learningData';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  ChevronRight, 
  ChevronLeft, 
  Lightbulb, 
  CheckCircle2, 
  Circle,
  BookOpen,
  PenTool,
  RotateCcw
} from 'lucide-react';
import { FillBlankExercise } from './FillBlankExercise';
import { QuizExercise } from './QuizExercise';
import { MatchingExercise } from './MatchingExercise';
import { LabelingExercise } from './LabelingExercise';
import { OrderingExercise } from './OrderingExercise';

interface ModuleDetailProps {
  module: LearningModule;
  onBack: () => void;
  onCompleteModule: (moduleId: string) => void;
  onCompleteStep: (moduleId: string, stepIndex: number) => void;
  onCompleteExercise: (moduleId: string, exerciseId: string, score: number) => void;
  moduleProgress: { completed: boolean; stepsCompleted: number; exercisesCompleted: string[]; score: number };
}

export function ModuleDetail({ 
  module, 
  onBack, 
  onCompleteModule,
  onCompleteStep, 
  onCompleteExercise,
  moduleProgress 
}: ModuleDetailProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(moduleProgress.stepsCompleted > 0 ? moduleProgress.stepsCompleted - 1 : 0);
  const [showExercises, setShowExercises] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<string[]>(moduleProgress.exercisesCompleted || []);
  const [showTip, setShowTip] = useState(false);

  const currentStep = module.steps[currentStepIndex];
  const isLastStep = currentStepIndex === module.steps.length - 1;
  const allExercisesCompleted = module.exercises.length > 0 && completedExercises.length >= module.exercises.length;

  const handleNextStep = () => {
    onCompleteStep(module.id, currentStepIndex);
    if (!isLastStep) {
      setCurrentStepIndex(prev => prev + 1);
      setShowTip(false);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      setShowTip(false);
    }
  };

  const handleExerciseComplete = (exerciseId: string, score: number) => {
    if (!completedExercises.includes(exerciseId)) {
      setCompletedExercises(prev => [...prev, exerciseId]);
    }
    onCompleteExercise(module.id, exerciseId, score);
  };

  const handleFinishModule = () => {
    onCompleteModule(module.id);
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-rose-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Zurück zur Übersicht</span>
            </button>
            <div className="text-sm text-gray-500">
              Modul {currentStepIndex + 1} von {module.steps.length}
            </div>
          </div>
          <div className="mt-3">
            <h1 className="text-xl font-bold text-gray-800">{module.title}</h1>
            <p className="text-sm text-gray-600">{module.subtitle}</p>
          </div>
          <div className="mt-3">
            <Progress 
              value={showExercises 
                ? 100 
                : ((currentStepIndex + 1) / module.steps.length) * 100
              } 
              className="h-2 bg-gray-200"
            />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Toggle between Learning and Exercises */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setShowExercises(false)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              !showExercises 
                ? 'bg-rose-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Lernen
          </button>
          <button
            onClick={() => setShowExercises(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              showExercises 
                ? 'bg-rose-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <PenTool className="w-4 h-4" />
            Übungen ({completedExercises.length}/{module.exercises.length})
          </button>
        </div>

        {!showExercises ? (
          /* Learning Content */
          <div className="space-y-6">
            {/* Step Navigation */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {module.steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => { setCurrentStepIndex(index); setShowTip(false); }}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                    index === currentStepIndex 
                      ? 'bg-rose-600 text-white' 
                      : index < moduleProgress.stepsCompleted 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-white text-gray-500'
                  }`}
                >
                  {index < moduleProgress.stepsCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Circle className="w-4 h-4" />
                  )}
                  {step.title}
                </button>
              ))}
            </div>

            {/* Step Content */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-rose-50 to-white">
                <CardTitle className="text-xl text-gray-800">{currentStep.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {currentStep.image && (
                  <div className="mb-6 rounded-xl overflow-hidden shadow-md bg-gray-50">
                    <img 
                      src={currentStep.image} 
                      alt={currentStep.title}
                      className="w-full max-h-96 object-contain"
                    />
                    <p className="text-xs text-gray-500 text-center py-2">
                      Abbildung: {currentStep.title}
                    </p>
                  </div>
                )}
                
                <div className="prose max-w-none">
                  {currentStep.content.split('\n').map((line, i) => {
                    if (line.startsWith('•')) {
                      return (
                        <li key={i} className="ml-6 text-gray-700 leading-relaxed">
                          {line.replace('• ', '')}
                        </li>
                      );
                    }
                    if (line.match(/^\d+\./)) {
                      return (
                        <div key={i} className="font-semibold text-gray-800 mt-4 mb-2">
                          {line}
                        </div>
                      );
                    }
                    if (line.trim() === '') return null;
                    return (
                      <p key={i} className="text-gray-700 leading-relaxed mb-3">
                        {line}
                      </p>
                    );
                  })}
                </div>

                {/* Tip */}
                {currentStep.tip && (
                  <div className="mt-6">
                    <button
                      onClick={() => setShowTip(!showTip)}
                      className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
                    >
                      <Lightbulb className="w-5 h-5" />
                      {showTip ? 'Tipp ausblenden' : 'Tipp anzeigen'}
                    </button>
                    {showTip && (
                      <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800">
                        {currentStep.tip}
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={handlePrevStep}
                    disabled={currentStepIndex === 0}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Zurück
                  </Button>
                  
                  {isLastStep ? (
                    <Button
                      onClick={() => setShowExercises(true)}
                      className="bg-rose-600 hover:bg-rose-700 flex items-center gap-2"
                    >
                      Zu den Übungen
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNextStep}
                      className="bg-rose-600 hover:bg-rose-700 flex items-center gap-2"
                    >
                      Weiter
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Exercises */
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Übungen</h2>
              {allExercisesCompleted && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">Alle Übungen abgeschlossen!</span>
                </div>
              )}
            </div>

            {module.exercises.map((exercise) => (
              <Card key={exercise.id} className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-white">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-gray-800">{exercise.title}</CardTitle>
                    {completedExercises.includes(exercise.id) && (
                      <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                        <CheckCircle2 className="w-4 h-4" />
                        Erledigt
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{exercise.instructions}</p>
                </CardHeader>
                <CardContent className="p-6">
                  {exercise.type === 'fillBlank' && exercise.blanks && (
                    <FillBlankExercise 
                      blanks={exercise.blanks}
                      onComplete={(score) => handleExerciseComplete(exercise.id, score)}
                      isCompleted={completedExercises.includes(exercise.id)}
                    />
                  )}
                  {exercise.type === 'quiz' && exercise.questions && (
                    <QuizExercise 
                      questions={exercise.questions}
                      onComplete={(score) => handleExerciseComplete(exercise.id, score)}
                      isCompleted={completedExercises.includes(exercise.id)}
                    />
                  )}
                  {exercise.type === 'matching' && exercise.pairs && (
                    <MatchingExercise 
                      pairs={exercise.pairs}
                      onComplete={(score) => handleExerciseComplete(exercise.id, score)}
                      isCompleted={completedExercises.includes(exercise.id)}
                    />
                  )}
                  {exercise.type === 'labeling' && exercise.labels && (
                    <LabelingExercise 
                      labels={exercise.labels}
                      onComplete={(score) => handleExerciseComplete(exercise.id, score)}
                      isCompleted={completedExercises.includes(exercise.id)}
                    />
                  )}
                  {exercise.type === 'ordering' && exercise.items && (
                    <OrderingExercise 
                      items={exercise.items}
                      onComplete={(score) => handleExerciseComplete(exercise.id, score)}
                      isCompleted={completedExercises.includes(exercise.id)}
                    />
                  )}
                </CardContent>
              </Card>
            ))}

            {/* Module Complete Button */}
            {allExercisesCompleted && (
              <div className="text-center py-8">
                <div className="mb-4 text-green-600">
                  <CheckCircle2 className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Modul abgeschlossen!
                </h3>
                <p className="text-gray-600 mb-6">
                  Du hast alle Lerninhalte und Übungen erfolgreich bearbeitet.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => { setShowExercises(false); setCurrentStepIndex(0); }}
                    className="flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Wiederholen
                  </Button>
                  <Button
                    onClick={handleFinishModule}
                    className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Modul abschließen
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
