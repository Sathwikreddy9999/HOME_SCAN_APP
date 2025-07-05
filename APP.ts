import React, { useState } from 'react';
import { AppView, UserProfile, Diagnosis, Professional, ServiceAppointment, ServiceStatus } from './types';
import Onboarding from './components/Onboarding';
import Scanner from './components/Scanner';
import Recommendations from './components/Recommendations';
import ServiceTracker from './components/ServiceTracker';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.Onboarding);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [appointment, setAppointment] = useState<ServiceAppointment | null>(null);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentView(AppView.Scanner);
  };

  const handleDiagnosisComplete = (diag: Diagnosis) => {
    setDiagnosis(diag);
    setCurrentView(AppView.Recommendations);
  };
  
  const handleSelectProfessional = (prof: Professional) => {
    setAppointment({ professional: prof, status: ServiceStatus.Booked });
    setCurrentView(AppView.ServiceTracker);
  }

  const handleReset = () => {
    setDiagnosis(null);
    setAppointment(null);
    setCurrentView(AppView.Scanner);
  }

  const renderView = () => {
    switch (currentView) {
      case AppView.Onboarding:
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case AppView.Scanner:
        return <Scanner onDiagnosisComplete={handleDiagnosisComplete} />;
      case AppView.Recommendations:
        if (!diagnosis) {
            handleReset(); // Should not happen, but as a fallback
            return null;
        }
        return <Recommendations diagnosis={diagnosis} onSelectProfessional={handleSelectProfessional} onScanAgain={handleReset} />;
      case AppView.ServiceTracker:
         if (!appointment) {
            handleReset(); // Should not happen, but as a fallback
            return null;
        }
        return <ServiceTracker appointment={appointment} onComplete={handleReset} />;
      default:
        return <Onboarding onComplete={handleOnboardingComplete} />;
    }
  };

  return <div className="min-h-screen bg-background">{renderView()}</div>;
};

export default App;