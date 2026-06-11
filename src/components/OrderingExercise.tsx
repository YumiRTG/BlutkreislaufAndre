import { useState } from 'react';
import { type OrderItem } from '@/data/learningData';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, CheckCircle2, XCircle } from 'lucide-react';

interface OrderingExerciseProps {
  items: OrderItem[];
  onComplete: (score: number) => void;
  isCompleted: boolean;
}

export function OrderingExercise({ items, onComplete, isCompleted }: OrderingExerciseProps) {
  const [order, setOrder] = useState<OrderItem[]>(() => shuffleArray([...items]));
  const [checked, setChecked] = useState(false);

  function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  const moveUp = (index: number) => {
    if (index === 0 || checked || isCompleted) return;
    setOrder(prev => {
      const newOrder = [...prev];
      [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
      return newOrder;
    });
  };

  const moveDown = (index: number) => {
    if (index === order.length - 1 || checked || isCompleted) return;
    setOrder(prev => {
      const newOrder = [...prev];
      [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
      return newOrder;
    });
  };

  const checkAnswers = () => {
    setChecked(true);
    const correct = order.filter((item, index) => item.correctPosition === index + 1).length;
    const score = Math.round((correct / items.length) * 100);
    onComplete(score);
  };

  const reset = () => {
    setOrder(shuffleArray([...items]));
    setChecked(false);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        Ordne die Schritte in die richtige Reihenfolge! Verwende die Pfeile, um Elemente nach oben oder unten zu verschieben.
      </p>

      <div className="space-y-2">
        {order.map((item, index) => {
          const isInCorrectPosition = item.correctPosition === index + 1;
          
          return (
            <div 
              key={item.id}
              className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                checked 
                  ? isInCorrectPosition 
                    ? 'border-green-300 bg-green-50' 
                    : 'border-red-300 bg-red-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                checked 
                  ? isInCorrectPosition 
                    ? 'bg-green-200 text-green-800' 
                    : 'bg-red-200 text-red-800'
                  : 'bg-gray-200 text-gray-700'
              }`}>
                {checked && isInCorrectPosition ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : checked ? (
                  <XCircle className="w-5 h-5" />
                ) : (
                  index + 1
                )}
              </span>
              
              <span className="flex-1 text-gray-700">{item.text}</span>
              
              {checked && !isInCorrectPosition && (
                <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">
                  Sollte an Position {item.correctPosition} sein
                </span>
              )}
              
              {!checked && !isCompleted && (
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ArrowUp className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => moveDown(index)}
                    disabled={index === order.length - 1}
                    className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ArrowDown className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!isCompleted && (
        <div className="flex gap-4">
          {!checked ? (
            <Button 
              onClick={checkAnswers}
              className="bg-rose-600 hover:bg-rose-700"
            >
              Reihenfolge prüfen
            </Button>
          ) : (
            <Button onClick={reset} variant="outline">
              Neu ordnen
            </Button>
          )}
        </div>
      )}

      {isCompleted && !checked && (
        <Button 
          onClick={checkAnswers}
          className="bg-rose-600 hover:bg-rose-700"
        >
          Reihenfolge prüfen
        </Button>
      )}

      {isCompleted && checked && (
        <div className="flex items-center gap-2 text-green-600 font-medium">
          <CheckCircle2 className="w-5 h-5" />
          Bereits abgeschlossen
        </div>
      )}
    </div>
  );
}
