import { useState } from 'react';
import { type QuizQuestion } from '@/data/learningData';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface QuizExerciseProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
  isCompleted: boolean;
}

export function QuizExercise({ questions, onComplete, isCompleted }: QuizExerciseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [finished, setFinished] = useState(isCompleted);

  const currentQuestion = questions[currentIndex];

  const handleSelectAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    
    setShowResult(true);
    setAnswers(prev => ({ ...prev, [currentIndex]: selectedAnswer }));
    
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      const finalCorrect = correctCount + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0);
      const score = Math.round((finalCorrect / questions.length) * 100);
      onComplete(score);
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCorrectCount(0);
    setAnswers({});
    setFinished(false);
  };

  if (finished) {
    const totalCorrect = Object.entries(answers).filter(([qIdx, aIdx]) => 
      questions[Number(qIdx)].correctAnswer === aIdx
    ).length;
    const score = Math.round((totalCorrect / questions.length) * 100);
    
    return (
      <div className="text-center py-6">
        <div className={`text-4xl font-bold mb-2 ${score >= 80 ? 'text-green-600' : score >= 60 ? 'text-amber-600' : 'text-red-600'}`}>
          {score}%
        </div>
        <p className="text-gray-600 mb-4">
          {totalCorrect} von {questions.length} Fragen richtig beantwortet
        </p>
        <Button 
          onClick={handleRestart}
          variant="outline"
          className="flex items-center gap-2 mx-auto"
        >
          <RotateCcw className="w-4 h-4" />
          Quiz wiederholen
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Frage {currentIndex + 1} von {questions.length}</span>
        <span>{correctCount} richtig bisher</span>
      </div>

      {/* Question */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          {currentQuestion.question}
        </h3>

        {/* Options */}
        <div className="space-y-2">
          {currentQuestion.options.map((option, index) => {
            let buttonClass = 'w-full text-left p-4 rounded-lg border-2 transition-all ';
            
            if (showResult) {
              if (index === currentQuestion.correctAnswer) {
                buttonClass += 'border-green-500 bg-green-50 text-green-800';
              } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
                buttonClass += 'border-red-500 bg-red-50 text-red-800';
              } else {
                buttonClass += 'border-gray-200 text-gray-600';
              }
            } else {
              if (index === selectedAnswer) {
                buttonClass += 'border-rose-500 bg-rose-50 text-rose-800';
              } else {
                buttonClass += 'border-gray-200 hover:border-rose-300 hover:bg-rose-50 text-gray-700';
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                className={buttonClass}
                disabled={showResult}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showResult && index === currentQuestion.correctAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  )}
                  {showResult && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showResult && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg text-blue-800 text-sm">
            <strong>Erklärung:</strong> {currentQuestion.explanation}
          </div>
        )}

        {/* Actions */}
        <div className="mt-6">
          {!showResult ? (
            <Button 
              onClick={handleCheck}
              disabled={selectedAnswer === null}
              className="bg-rose-600 hover:bg-rose-700"
            >
              Antwort prüfen
            </Button>
          ) : (
            <Button 
              onClick={handleNext}
              className="bg-rose-600 hover:bg-rose-700 flex items-center gap-2"
            >
              {currentIndex < questions.length - 1 ? 'Nächste Frage' : 'Ergebnis anzeigen'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
