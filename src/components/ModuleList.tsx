import { type LearningModule } from '@/data/learningData';
import { Progress } from '@/components/ui/progress';
import { Heart, BookOpen, Clock, ChevronRight, Award } from 'lucide-react';

interface ModuleListProps {
  modules: LearningModule[];
  onSelectModule: (module: LearningModule) => void;
  getModuleProgress: (moduleId: string) => { completed: boolean; stepsCompleted: number; exercisesCompleted: string[]; score: number };
}

export function ModuleList({ modules, onSelectModule, getModuleProgress }: ModuleListProps) {
  const totalCompleted = modules.filter(m => getModuleProgress(m.id).completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-600 to-red-700 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-10 h-10 animate-pulse" />
            <h1 className="text-4xl font-bold">Blutkreislauf Lernmodul</h1>
          </div>
          <p className="text-lg text-rose-100 max-w-2xl">
            Interaktives Lernmaterial zum menschlichen Blutkreislauf. 
            Lerne Schritt für Schritt mit Bildern, Übungen und Tests.
          </p>
          <div className="mt-6 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              <span>{modules.length} Lernmodule</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>ca. 2 Stunden</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span>{totalCompleted}/{modules.length} abgeschlossen</span>
            </div>
          </div>
          {totalCompleted > 0 && (
            <div className="mt-4 max-w-md">
              <Progress value={(totalCompleted / modules.length) * 100} className="h-3 bg-rose-300" />
              <p className="text-sm text-rose-100 mt-2">Gesamtfortschritt: {Math.round((totalCompleted / modules.length) * 100)}%</p>
            </div>
          )}
        </div>
      </div>

      {/* Modules Grid */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Deine Lernmodule</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => {
            const prog = getModuleProgress(module.id);
            const isCompleted = prog.completed;
            const hasStarted = prog.stepsCompleted > 0 || prog.exercisesCompleted.length > 0;

            return (
              <button
                key={module.id}
                onClick={() => onSelectModule(module)}
                className={`group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden text-left border-2 ${
                  isCompleted ? 'border-green-400' : hasStarted ? 'border-rose-400' : 'border-transparent'
                } hover:border-rose-400`}
              >
                {isCompleted && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white rounded-full p-1 z-10">
                    <Award className="w-5 h-5" />
                  </div>
                )}
                <div className="h-40 overflow-hidden">
                  <img 
                    src={module.image} 
                    alt={module.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold bg-rose-100 text-rose-700 px-2 py-1 rounded-full">
                      Modul {index + 1}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {module.duration}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{module.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{module.subtitle}</p>
                  <p className="text-sm text-gray-500 line-clamp-2">{module.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-rose-600 text-sm font-medium">
                      {isCompleted ? 'Abgeschlossen' : hasStarted ? 'Weitermachen' : 'Starten'}
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                    {hasStarted && !isCompleted && (
                      <div className="w-20">
                        <Progress 
                          value={(prog.stepsCompleted / module.steps.length) * 100} 
                          className="h-2 bg-gray-200"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-md p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">So lernst du am besten</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mb-3">
                <BookOpen className="w-7 h-7 text-rose-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">1. Lerne Schritt für Schritt</h4>
              <p className="text-sm text-gray-600">Arbeite jedes Modul in den vorgegebenen Schritten durch. Lies die Erklärungen aufmerksam.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <Heart className="w-7 h-7 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">2. Studiere die Bilder</h4>
              <p className="text-sm text-gray-600">Die anatomischen Bilder helfen dir, dir die Strukturen bildlich vorzustellen.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <Award className="w-7 h-7 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">3. Mache die Übungen</h4>
              <p className="text-sm text-gray-600">Teste dein Wissen mit Quizfragen, Lückentexten und Zuordnungsaufgaben.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
