import React, { useState, useEffect } from 'react';
import { ServiceAppointment, ServiceStatus } from '../types';
import { CheckCircleIcon, StarIcon } from './icons';

interface ServiceTrackerProps {
  appointment: ServiceAppointment;
  onComplete: () => void;
}

const ServiceTracker: React.FC<ServiceTrackerProps> = ({ appointment, onComplete }) => {
  const [status, setStatus] = useState<ServiceStatus>(ServiceStatus.Booked);
  const [rating, setRating] = useState(0);

  const statuses = [
    ServiceStatus.Booked,
    ServiceStatus.EnRoute,
    ServiceStatus.InProgress,
    ServiceStatus.Completed,
    ServiceStatus.Rated
  ];
  
  const currentStatusIndex = statuses.indexOf(status);

  useEffect(() => {
    if(status === ServiceStatus.Rated || status === ServiceStatus.Completed) return;

    const interval = setInterval(() => {
      setStatus(prevStatus => {
        const currentIndex = statuses.indexOf(prevStatus);
        if (currentIndex < statuses.indexOf(ServiceStatus.Completed)) {
          return statuses[currentIndex + 1];
        }
        clearInterval(interval);
        return prevStatus;
      });
    }, 3000); // Advance status every 3 seconds

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleRateService = () => {
      if(rating > 0) {
        setStatus(ServiceStatus.Rated);
        // In a real app, submit rating to backend
        setTimeout(() => onComplete(), 2000);
      } else {
        alert("Please select a rating.");
      }
  }

  const TimelineItem: React.FC<{ stepStatus: ServiceStatus, title: string, isLast?: boolean }> = ({ stepStatus, title, isLast }) => {
    const stepIndex = statuses.indexOf(stepStatus);
    const isActive = stepIndex <= currentStatusIndex;
    const isCompleted = currentStatusIndex > stepIndex;

    return (
      <div className="flex">
        <div className="flex flex-col items-center mr-4">
          <div>
            <div className={`flex items-center justify-center w-10 h-10 border-2 rounded-full transition-colors duration-500 ${isActive ? 'bg-primary border-primary' : 'bg-surface border-slate-300'}`}>
              {isActive && <CheckCircleIcon className="w-6 h-6 text-white" />}
            </div>
          </div>
          {!isLast && <div className={`w-px h-full transition-colors duration-500 ${isCompleted ? 'bg-primary' : 'bg-slate-300'}`}></div>}
        </div>
        <div className={`pt-1 pb-8 transition-colors duration-500 ${isActive ? 'text-text-primary' : 'text-slate-400'}`}>
          <p className="mb-2 text-lg font-bold">{title}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen text-text-primary p-4 md:p-8 animate-fade-in">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">Service Tracker</h1>
        <div className="bg-surface border border-border-color rounded-xl shadow-lg p-6 mb-8 text-center">
            <img src={appointment.professional.logo} alt="professional logo" className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-primary"/>
            <h2 className="text-2xl font-bold">{appointment.professional.name}</h2>
            <p className="text-text-secondary">{appointment.professional.specialization}</p>
        </div>

        <div>
            <TimelineItem stepStatus={ServiceStatus.Booked} title="Service Booked" />
            <TimelineItem stepStatus={ServiceStatus.EnRoute} title="Provider En Route" />
            <TimelineItem stepStatus={ServiceStatus.InProgress} title="Work In Progress" />
            <TimelineItem stepStatus={ServiceStatus.Completed} title="Job Completed" isLast={true}/>
        </div>

        {status === ServiceStatus.Completed && (
            <div className="bg-surface border border-border-color rounded-xl p-6 mt-8 text-center animate-fade-in shadow-lg">
                <h3 className="text-xl font-bold mb-4">How was your service?</h3>
                <div className="flex justify-center space-x-2 mb-4">
                    {[1,2,3,4,5].map(star => (
                        <button key={star} onClick={() => setRating(star)}>
                           <StarIcon className={`w-10 h-10 transition-colors ${rating >= star ? 'text-yellow-400' : 'text-slate-300 hover:text-yellow-400'}`}/>
                        </button>
                    ))}
                </div>
                <button onClick={handleRateService} className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary-focus transition-colors">
                    Submit Rating
                </button>
            </div>
        )}
        
        {status === ServiceStatus.Rated && (
             <div className="bg-surface border border-border-color rounded-xl p-6 mt-8 text-center animate-fade-in shadow-lg">
                <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4"/>
                <h3 className="text-xl font-bold">Thank you for your feedback!</h3>
             </div>
        )}
      </div>
    </div>
  );
};

export default ServiceTracker;