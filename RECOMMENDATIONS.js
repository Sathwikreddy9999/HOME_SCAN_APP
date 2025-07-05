import React, { useState, useEffect } from 'react';
import { Diagnosis, Professional } from '../types';
import { getLocalProfessionals } from '../services/mockApi';
import LoadingSpinner from './LoadingSpinner';
import { StarIcon, PhoneIcon, MailIcon } from './icons';

interface RecommendationsProps {
  diagnosis: Diagnosis;
  onSelectProfessional: (professional: Professional) => void;
  onScanAgain: () => void;
}

const ProfessionalCard: React.FC<{ professional: Professional, onSelect: () => void }> = ({ professional, onSelect }) => {
  return (
    <div className="bg-surface border border-border-color rounded-xl shadow-lg p-5 flex flex-col space-y-4 transition-all duration-300 transform hover:scale-105 hover:shadow-primary/20 hover:border-primary/50">
      <div className="flex items-start space-x-4">
        <img src={professional.logo} alt={`${professional.name} logo`} className="w-16 h-16 rounded-full border-2 border-primary" />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-text-primary">{professional.name}</h3>
          <div className="flex items-center text-yellow-400 mt-1">
            <StarIcon className="w-5 h-5" />
            <span className="ml-1 text-text-primary font-semibold">{professional.rating}</span>
            <span className="text-text-secondary ml-2">({professional.reviews} reviews)</span>
          </div>
        </div>
      </div>
      <p className="text-text-secondary text-sm flex-grow">{professional.description}</p>
      <div className="flex items-center justify-between pt-4 border-t border-border-color">
        <div className="flex space-x-3">
          <a href={`tel:${professional.phone}`} className="p-2 rounded-full bg-slate-100 hover:bg-primary hover:text-white transition-colors">
            <PhoneIcon className="w-5 h-5" />
          </a>
          <a href={`mailto:${professional.email}`} className="p-2 rounded-full bg-slate-100 hover:bg-primary hover:text-white transition-colors">
            <MailIcon className="w-5 h-5" />
          </a>
        </div>
        <button onClick={onSelect} className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-focus transition-colors">
          Select
        </button>
      </div>
    </div>
  );
};

const Recommendations: React.FC<RecommendationsProps> = ({ diagnosis, onSelectProfessional, onScanAgain }) => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getLocalProfessionals(diagnosis.professional_service_needed)
      .then(data => {
        setProfessionals(data);
        setIsLoading(false);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diagnosis]);

  return (
    <div className="min-h-screen text-text-primary p-4 md:p-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="bg-surface border border-border-color rounded-xl shadow-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-2">Diagnosis Result</h2>
          <p className="font-semibold text-text-primary">Problem Identified:</p>
          <p className="mb-4 text-text-secondary">{diagnosis.problem}</p>
          <p className="font-semibold text-text-primary">DIY Suggestion:</p>
          <p className="text-text-secondary">{diagnosis.diy_solution}</p>
        </div>

        <h2 className="text-3xl font-bold text-center mb-6">
          Top 3 <span className="text-primary">{diagnosis.professional_service_needed}</span> Pros
        </h2>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
             <LoadingSpinner text="Finding local pros..." />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {professionals.map(pro => (
              <ProfessionalCard key={pro.id} professional={pro} onSelect={() => onSelectProfessional(pro)} />
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center">
            <button 
                onClick={onScanAgain}
                className="bg-slate-200 text-text-secondary font-bold py-3 px-8 rounded-lg hover:bg-slate-300 transition-colors"
            >
                Scan Another Issue
            </button>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;