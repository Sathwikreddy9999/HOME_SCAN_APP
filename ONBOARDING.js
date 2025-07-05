import React, { useState } from 'react';
import { ServiceCategory, UserProfile } from '../types';
import { SERVICE_CATEGORIES } from '../constants';
import { HomeScanIcon } from './icons';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<ServiceCategory[]>([]);

  const handleTogglePreference = (category: ServiceCategory) => {
    setPreferences((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleEmailNext = () => {
    if (email.includes('@') && email.length > 3) {
      setStep(2);
    } else {
      alert("Please enter a valid email address.");
    }
  };

  const handleAddressNext = () => {
    if (address.trim().length > 5) { // Simple validation
        setStep(3);
    } else {
        alert("Please enter a valid home address.");
    }
  }

  const handleFinish = () => {
    onComplete({ email, address, preferences });
  };

  const getStepTitle = () => {
     switch (step) {
        case 1: return "Let's get started";
        case 2: return "What's your home address?";
        case 3: return "Tell us about your home";
        default: return "Welcome";
    }
  }
  
  const getStepDescription = () => {
     switch (step) {
        case 1: return "Enter your email to sign up or log in.";
        case 2: return "This helps us find the best local pros for you.";
        case 3: return "Select the features relevant to your property.";
        default: return "";
    }
  }

  return (
    <div className="min-h-screen text-text-primary flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-surface border border-border-color rounded-2xl shadow-xl p-8 space-y-6">
        <div className="flex flex-col items-center space-y-4">
            <HomeScanIcon className="w-24 h-24 text-primary" />
            <div className="text-center">
                <h1 className="text-3xl font-bold">Welcome to Home Scan</h1>
                <p className="text-text-secondary">Your personal home health expert.</p>
            </div>
        </div>

        <div className="animate-fade-in">
          <h2 className="text-xl font-semibold text-center">{getStepTitle()}</h2>
          <p className="text-center text-sm text-text-secondary mb-4">{getStepDescription()}</p>
        
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 bg-background border border-border-color rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition-colors"
                />
              </div>
              <button
                onClick={handleEmailNext}
                className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-focus transition duration-300"
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="address" className="sr-only">
                  Home Address
                </label>
                <input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Main St, Anytown, USA"
                  className="w-full px-4 py-2 bg-background border border-border-color rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition-colors"
                />
              </div>
              <button
                onClick={handleAddressNext}
                className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-focus transition duration-300"
              >
                Continue
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto p-1 bg-background rounded-lg">
                {SERVICE_CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleTogglePreference(category)}
                    className={`px-4 py-3 rounded-lg text-xs md:text-sm font-medium transition duration-200 ${
                      preferences.includes(category)
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-slate-200 text-text-secondary hover:bg-slate-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <button
                onClick={handleFinish}
                className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-focus transition duration-300"
              >
                Finish Setup
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;