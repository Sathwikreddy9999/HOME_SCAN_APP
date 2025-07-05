import { MOCK_PROFESSIONALS } from '../constants';
import { Professional, ServiceCategory } from '../types';

export const getLocalProfessionals = (category: ServiceCategory): Promise<Professional[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const professionals = MOCK_PROFESSIONALS[category] || MOCK_PROFESSIONALS[ServiceCategory.Handyman];
      resolve(professionals.slice(0, 3));
    }, 1000); // Simulate network delay
  });
};