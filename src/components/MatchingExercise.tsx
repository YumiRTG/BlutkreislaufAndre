import { useState } from 'react';
import { type MatchingPair } from '@/data/learningData';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Shuffle } from 'lucide-react';

interface MatchingExerciseProps {
  pairs: MatchingPair[];
  onComplete: (score: number) => void;
  isCompleted: boolean;
}

export function MatchingExercise({ pairs, onComplete, isCompleted }: MatchingExerciseProps) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [shuffledLeft, setShuffledLeft] = useState(() => shuffleArray([...pairs]));
  const [shuffledRight, setShuffledRight] = useState(() => shuffleArray([...pairs]));

  function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  const handleLeftClick = (id: string) => {
    if (checked || isCompleted) return;
    if (matches[id]) return;
    setSelectedLeft(id);
    
    if (selectedRight) {
      setMatches(prev => ({ ...prev, [id]: selectedRight }));
      setSelectedLeft(null);
      setSelectedRight(null);
    }
  };

  const handleRightClick = (id: string) => {
    if (checked || isCompleted) return;
    setSelectedRight(id);
    
    if (selectedLeft) {
      setMatches(prev => ({ ...prev, [selectedLeft]: id }));
      setSelectedLeft(null);
      setSelectedRight(null);
    }
  };

  const removeMatch = (leftId: string) => {
    if (checked || isCompleted) return;
    const newMatches = { ...matches };
    delete newMatches[leftId];
    setMatches(newMatches);
  };

  const checkAnswers = () => {
    setChecked(true);
    const correct = Object.entries(matches).filter(([leftId, rightId]) => {
      const leftPair = pairs.find(p => p.id === leftId);
      const rightPair = pairs.find(p => p.id === rightId);
      return leftPair && rightPair && leftPair.right === rightPair.right;
    }).length;
    const score = Math.round((correct / pairs.length) * 100);
    onComplete(score);
  };

  const getMatchStatus = (leftId: string) => {
    const rightId = matches[leftId];
    if (!rightId) return null;
    const leftPair = pairs.find(p => p.id === leftId);
    const rightPair = pairs.find(p => p.id === rightId);
    return leftPair && rightPair && leftPair.right === rightPair.right;
  };

  const reset = () => {
    setMatches({});
    setChecked(false);
    setSelectedLeft(null);
    setSelectedRight(null);
    setShuffledLeft(shuffleArray([...pairs]));
    setShuffledRight(shuffleArray([...pairs]));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Klicke zuerst einen Begriff links an, dann die passende Definition rechts.
        </p>
        {!isCompleted && (
          <button
            onClick={reset}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-rose-600"
          >
            <Shuffle className="w-4 h-4" />
            Neu mischen
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-500 mb-3">BEGRIFFE</h4>
          {shuffledLeft.map((pair) => {
            const isMatched = matches[pair.id];
            const isSelected = selectedLeft === pair.id;
            
            return (
              <button
                key={pair.id}
                onClick={() => handleLeftClick(pair.id)}
                disabled={!!isMatched || checked || isCompleted}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                  isMatched 
                    ? checked 
                      ? getMatchStatus(pair.id) 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-red-500 bg-red-50'
                      : 'border-blue-300 bg-blue-50'
                    : isSelected 
                      ? 'border-rose-500 bg-rose-50' 
                      : 'border-gray-200 hover:border-rose-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={isMatched ? 'line-through opacity-60' : ''}>{pair.left}</span>
                  {checked && isMatched && (
                    getMatchStatus(pair.id) 
                      ? <CheckCircle2 className="w-5 h-5 text-green-600" />
                      : <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-500 mb-3">ZUGEORDNET ZU</h4>
          {shuffledRight.map((pair) => {
            const matchedBy = Object.entries(matches).find(([_, v]) => v === pair.id);
            const isSelected = selectedRight === pair.id;
            const matchedLeftId = matchedBy?.[0];
            const isCorrect = matchedLeftId ? getMatchStatus(matchedLeftId) : null;
            
            return (
              <button
                key={pair.id}
                onClick={() => handleRightClick(pair.id)}
                disabled={Object.values(matches).includes(pair.id) || checked || isCompleted}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                  Object.values(matches).includes(pair.id)
                    ? checked 
                      ? isCorrect 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-red-500 bg-red-50'
                      : 'border-blue-300 bg-blue-50'
                    : isSelected 
                      ? 'border-rose-500 bg-rose-50' 
                      : 'border-gray-200 hover:border-rose-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{pair.right}</span>
                  {matchedLeftId && (
                    <span className="text-xs text-gray-400 ml-2">
                      ({shuffledLeft.find(l => l.id === matchedLeftId)?.left})
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Matched Pairs Summary */}
      {Object.keys(matches).length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-600 mb-2">Deine Zuordnungen:</h4>
          <div className="space-y-1">
            {Object.entries(matches).map(([leftId, rightId]) => {
              const leftPair = pairs.find(p => p.id === leftId);
              const rightPair = pairs.find(p => p.id === rightId);
              if (!leftPair || !rightPair) return null;
              
              const isCorrect = leftPair.right === rightPair.right;
              
              return (
                <div 
                  key={leftId} 
                  onClick={() => !checked && !isCompleted && removeMatch(leftId)}
                  className={`flex items-center gap-2 text-sm p-2 rounded cursor-pointer ${
                    checked 
                      ? isCorrect ? 'bg-green-100' : 'bg-red-100'
                      : 'bg-white hover:bg-gray-100'
                  }`}
                >
                  <span className="font-medium">{leftPair.left}</span>
                  <span className="text-gray-400">→</span>
                  <span>{rightPair.right}</span>
                  {checked && (
                    isCorrect 
                      ? <CheckCircle2 className="w-4 h-4 text-green-600 ml-auto" />
                      : <XCircle className="w-4 h-4 text-red-600 ml-auto" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {!isCompleted && (
        <div className="flex gap-4">
          {Object.keys(matches).length === pairs.length && !checked && (
            <Button 
              onClick={checkAnswers}
              className="bg-rose-600 hover:bg-rose-700"
            >
              Antworten prüfen
            </Button>
          )}
          {checked && (
            <Button onClick={reset} variant="outline">
              <Rotate className="w-4 h-4 mr-2" />
              Nochmal versuchen
            </Button>
          )}
        </div>
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

function Rotate({ className }: { className?: string }) {
  return <RotateCcw className={className} />;
}

import { RotateCcw } from 'lucide-react';
