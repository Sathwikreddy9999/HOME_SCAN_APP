export enum ServiceCategory {
  LawnAndGarden = "Lawn & Garden Care",
  HVAC = "HVAC & Air Conditioning",
  Plumbing = "Plumbing",
  Pool = "Pool Maintenance",
  Painting = "Painting & Renovation",
  Appliance = "Appliance Repair",
  PestControl = "Pest Control",
  Handyman = "General Handyman",
  TennisCourt = "Tennis Court Maintenance",
}

export interface UserProfile {
  email: string;
  address: string;
  preferences: ServiceCategory[];
}

export interface Diagnosis {
  problem: string;
  diy_solution: string;
  professional_service_needed: ServiceCategory;
}

export interface Professional {
  id: number;
  name: string;
  logo: string;
  specialization: ServiceCategory;
  rating: number;
  reviews: number;
  description: string;
  phone: string;
  email: string;
}

export enum ServiceStatus {
  Booked = "Booked",
  EnRoute = "Provider En Route",
  InProgress = "Work In Progress",
  Completed = "Job Completed",
  Rated = "Service Rated"
}

export interface ServiceAppointment {
  professional: Professional;
  status: ServiceStatus;
}

export enum AppView {
  Onboarding,
  Scanner,
  Recommendations,
  ServiceTracker,
}