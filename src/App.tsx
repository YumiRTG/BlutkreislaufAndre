import { useState } from 'react';
import { learningModules, type LearningModule } from '@/data/learningData';
import { useProgress } from '@/hooks/useProgress';
import { ModuleList } from '@/components/ModuleList';
import { ModuleDetail } from '@/components/ModuleDetail';
import './App.css';

function App() {
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const { 
    getModuleProgress, 
    completeStep, 
    completeExercise, 
    completeModule
  } = useProgress();

  const handleSelectModule = (module: LearningModule) => {
    setSelectedModule(module);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setSelectedModule(null);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {selectedModule ? (
        <ModuleDetail
          module={selectedModule}
          onBack={handleBack}
          onCompleteModule={completeModule}
          onCompleteStep={completeStep}
          onCompleteExercise={completeExercise}
          moduleProgress={getModuleProgress(selectedModule.id)}
        />
      ) : (
        <ModuleList
          modules={learningModules}
          onSelectModule={handleSelectModule}
          getModuleProgress={getModuleProgress}
        />
      )}
    </div>
  );
}

export default App;
