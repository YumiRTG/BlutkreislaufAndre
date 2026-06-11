import { useState } from 'react';
import { type FillBlank } from '@/data/learningData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle2, XCircle, Lightbulb } from 'lucide-react';

interface FillBlankExerciseProps {
  blanks: FillBlank[];
  onComplete: (score: number) => void;
  isCompleted: boolean;
}

export function FillBlankExercise({ blanks, onComplete, isCompleted }: FillBlankExerciseProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});

  const handleAnswerChange = (blankId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [blankId]: value }));
  };

  const checkAnswers = () => {
    setChecked(true);
    const correct = blanks.filter(b => 
      answers[b.id]?.toLowerCase().trim() === b.answer.toLowerCase()
    ).length;
    const score = Math.round((correct / blanks.length) * 100);
    onComplete(score);
  };

  const toggleHint = (blankId: string) => {
    setShowHints(prev => ({ ...prev, [blankId]: !prev[blankId] }));
  };

  const isCorrect = (blank: FillBlank) => {
    return answers[blank.id]?.toLowerCase().trim() === blank.answer.toLowerCase();
  };

  return (
    <div className="space-y-4">
      {blanks.map((blank) => (
        <div key={blank.id} className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-start gap-3 flex-wrap">
            <span className="text-gray-700 flex-1">
              {blank.text.split('___').map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className="inline-block mx-1">
                      {checked ? (
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded font-medium ${
                          isCorrect(blank) 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {answers[blank.id] || '___'}
                          {isCorrect(blank) ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <XCircle className="w-4 h-4" />
                          )}
                        </span>
                      ) : (
                        <Input
                          value={answers[blank.id] || ''}
                          onChange={(e) => handleAnswerChange(blank.id, e.target.value)}
                          className="w-40 inline-block"
                          placeholder="..."
                          disabled={isCompleted}
                        />
                      )}
                    </span>
                  )}
                </span>
              ))}
            </span>
          </div>
          
          {checked && !isCorrect(blank) && (
            <div className="mt-2 text-sm text-green-700 font-medium">
              Richtige Antwort: {blank.answer}
            </div>
          )}

          {!checked && !isCompleted && (
            <button
              onClick={() => toggleHint(blank.id)}
              className="mt-2 flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700"
            >
              <Lightbulb className="w-4 h-4" />
              {showHints[blank.id] ? 'Tipp ausblenden' : 'Tipp anzeigen'}
            </button>
          )}
          
          {showHints[blank.id] && !checked && (
            <div className="mt-2 text-sm text-amber-700 bg-amber-50 p-2 rounded">
              {blank.hint}
            </div>
          )}
        </div>
      ))}

      {!isCompleted && (
        <Button 
          onClick={checkAnswers}
          className="bg-rose-600 hover:bg-rose-700"
          disabled={Object.keys(answers).length < blanks.length}
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
