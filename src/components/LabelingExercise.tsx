import { useState } from 'react';
import { type Label } from '@/data/learningData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle2, Lightbulb } from 'lucide-react';

interface LabelingExerciseProps {
  labels: Label[];
  onComplete: (score: number) => void;
  isCompleted: boolean;
}

export function LabelingExercise({ labels, onComplete, isCompleted }: LabelingExerciseProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});

  const handleAnswerChange = (labelId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [labelId]: value }));
  };

  const checkAnswers = () => {
    setChecked(true);
    const correct = labels.filter(l => 
      answers[l.id]?.toLowerCase().trim() === l.answer.toLowerCase()
    ).length;
    const score = Math.round((correct / labels.length) * 100);
    onComplete(score);
  };

  const toggleHint = (labelId: string) => {
    setShowHints(prev => ({ ...prev, [labelId]: !prev[labelId] }));
  };

  const isCorrect = (label: Label) => {
    return answers[label.id]?.toLowerCase().trim() === label.answer.toLowerCase();
  };

  return (
    <div className="space-y-4">
      {labels.map((label, index) => (
        <div key={label.id} className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 bg-rose-100 text-rose-700 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
              {index + 1}
            </span>
            <div className="flex-1">
              <p className="text-gray-700 mb-3">{label.text}</p>
              
              {checked ? (
                <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg font-medium ${
                  isCorrect(label) 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {answers[label.id] || 'Keine Antwort'}
                  {isCorrect(label) ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <span className="text-sm">(Richtig: {label.answer})</span>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Input
                    value={answers[label.id] || ''}
                    onChange={(e) => handleAnswerChange(label.id, e.target.value)}
                    className="max-w-xs"
                    placeholder="Deine Antwort..."
                    disabled={isCompleted}
                  />
                  <button
                    onClick={() => toggleHint(label.id)}
                    className="text-amber-600 hover:text-amber-700"
                  >
                    <Lightbulb className="w-5 h-5" />
                  </button>
                </div>
              )}

              {showHints[label.id] && !checked && (
                <div className="mt-2 text-sm text-amber-700 bg-amber-50 p-2 rounded">
                  Tipp: Die Antwort hat {label.answer.length} Buchstaben und beginnt mit "{label.answer[0]}".
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {!isCompleted && !checked && (
        <Button 
          onClick={checkAnswers}
          className="bg-rose-600 hover:bg-rose-700"
          disabled={Object.keys(answers).length < labels.length}
        >
          Antworten überprüfen
        </Button>
      )}

      {isCompleted && (
        <div className="flex items-center gap-2 text-green-600 font-medium">
          <CheckCircle2 className="w-5 h-5" />
          Bereits abgeschlossen
        </div>
      )}
    </div>
  );
}
