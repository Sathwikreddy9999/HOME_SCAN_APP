import { ServiceCategory, Professional } from './types';

export const SERVICE_CATEGORIES: ServiceCategory[] = Object.values(ServiceCategory);

export const MOCK_PROFESSIONALS: Record<ServiceCategory, Professional[]> = {
  [ServiceCategory.LawnAndGarden]: [
    { id: 1, name: "Green Thumb Landscapes", logo: "https://picsum.photos/seed/gtl/100", specialization: ServiceCategory.LawnAndGarden, rating: 4.8, reviews: 152, description: "Full-service lawn care and landscape design.", phone: "555-0101", email: "contact@gtlandscapes.com" },
    { id: 2, name: "Yard Masters", logo: "https://picsum.photos/seed/ym/100", specialization: ServiceCategory.LawnAndGarden, rating: 4.7, reviews: 98, description: "Reliable and affordable yard maintenance.", phone: "555-0102", email: "support@yardmasters.com" },
    { id: 3, name: "The Perfect Lawn", logo: "https://picsum.photos/seed/tpl/100", specialization: ServiceCategory.LawnAndGarden, rating: 4.9, reviews: 210, description: "Specialists in turf health and pest control.", phone: "555-0103", email: "info@theperfectlawn.com" },
  ],
  [ServiceCategory.HVAC]: [
    { id: 4, name: "Cool Breeze HVAC", logo: "https://picsum.photos/seed/cbh/100", specialization: ServiceCategory.HVAC, rating: 4.9, reviews: 320, description: "24/7 emergency HVAC services.", phone: "555-0104", email: "service@coolbreeze.com" },
    { id: 5, name: "Arctic Air Solutions", logo: "https://picsum.photos/seed/aas/100", specialization: ServiceCategory.HVAC, rating: 4.8, reviews: 250, description: "Installation, repair, and maintenance.", phone: "555-0105", email: "help@arcticair.com" },
    { id: 6, name: "Total Comfort Heating & Cooling", logo: "https://picsum.photos/seed/tch/100", specialization: ServiceCategory.HVAC, rating: 4.7, reviews: 180, description: "Keeping your home comfortable year-round.", phone: "555-0106", email: "contact@totalcomfort.com" },
  ],
  [ServiceCategory.Plumbing]: [
    { id: 7, name: "Pro Plumbers", logo: "https://picsum.photos/seed/pp/100", specialization: ServiceCategory.Plumbing, rating: 4.9, reviews: 410, description: "Leaky faucets, clogged drains, we do it all.", phone: "555-0107", email: "dispatch@proplumbers.com" },
    { id: 8, name: "Drain Doctors", logo: "https://picsum.photos/seed/dd/100", specialization: ServiceCategory.Plumbing, rating: 4.8, reviews: 350, description: "Your local drain and sewer experts.", phone: "555-0108", email: "info@draindoctors.com" },
    { id: 9, name: "Reliable Rooter", logo: "https://picsum.photos/seed/rr/100", specialization: ServiceCategory.Plumbing, rating: 4.7, reviews: 290, description: "Fast, friendly, and reliable service.", phone: "555-0109", email: "service@reliablerooter.com" },
  ],
   [ServiceCategory.Pool]: [
    { id: 10, name: "Crystal Clear Pools", logo: "https://picsum.photos/seed/ccp/100", specialization: ServiceCategory.Pool, rating: 4.9, reviews: 180, description: "Weekly maintenance and equipment repair.", phone: "555-0110", email: "contact@ccpools.com" },
    { id: 11, name: "Blue Wave Pool Service", logo: "https://picsum.photos/seed/bwp/100", specialization: ServiceCategory.Pool, rating: 4.8, reviews: 120, description: "Making pool ownership easy.", phone: "555-0111", email: "info@bluewave.com" },
    { id: 12, name: "Oasis Pool Care", logo: "https://picsum.photos/seed/opc/100", specialization: ServiceCategory.Pool, rating: 4.7, reviews: 95, description: "Expert cleaning and chemical balancing.", phone: "555-0112", email: "support@oasispoolcare.com" },
  ],
  [ServiceCategory.Painting]: [
    { id: 13, name: "Precision Painters", logo: "https://picsum.photos/seed/precp/100", specialization: ServiceCategory.Painting, rating: 4.9, reviews: 220, description: "Interior and exterior painting perfection.", phone: "555-0113", email: "quotes@precisionpainters.com" },
    { id: 14, name: "The Color Crew", logo: "https://picsum.photos/seed/tcc/100", specialization: ServiceCategory.Painting, rating: 4.8, reviews: 190, description: "Bringing color to your life.", phone: "555-0114", email: "contact@thecolorcrew.com" },
    { id: 15, name: "Fresh Coat Painters", logo: "https://picsum.photos/seed/fcp/100", specialization: ServiceCategory.Painting, rating: 4.8, reviews: 160, description: "Quality painting services, guaranteed.", phone: "555-0115", email: "info@freshcoat.com" },
  ],
  [ServiceCategory.Appliance]: [
    { id: 16, name: "Appliance MD", logo: "https://picsum.photos/seed/amd/100", specialization: ServiceCategory.Appliance, rating: 4.7, reviews: 300, description: "We fix all major brands of home appliances.", phone: "555-0116", email: "service@appliancemd.com" },
    { id: 17, name: "Same Day Repair", logo: "https://picsum.photos/seed/sdr/100", specialization: ServiceCategory.Appliance, rating: 4.9, reviews: 450, description: "Fast and reliable appliance repair.", phone: "555-0117", email: "help@sameday.com" },
    { id: 18, name: "The Fix-It Crew", logo: "https://picsum.photos/seed/fic/100", specialization: ServiceCategory.Appliance, rating: 4.6, reviews: 210, description: "Your friendly neighborhood repair experts.", phone: "555-0118", email: "crew@fixit.com" },
  ],
  [ServiceCategory.PestControl]: [
    { id: 19, name: "Bug Busters", logo: "https://picsum.photos/seed/bb/100", specialization: ServiceCategory.PestControl, rating: 4.8, reviews: 280, description: "Eco-friendly pest control solutions.", phone: "555-0119", email: "contact@bugbusters.com" },
    { id: 20, name: "Pest-Free Pros", logo: "https://picsum.photos/seed/pfp/100", specialization: ServiceCategory.PestControl, rating: 4.9, reviews: 310, description: "Protecting your home from unwanted guests.", phone: "555-0120", email: "service@pestfreepros.com" },
    { id: 21, name: "Guardian Pest Control", logo: "https://picsum.photos/seed/gpc/100", specialization: ServiceCategory.PestControl, rating: 4.7, reviews: 190, description: "Comprehensive pest management services.", phone: "555-0121", email: "info@guardianpest.com" },
  ],
  [ServiceCategory.Handyman]: [
    { id: 22, name: "Jack of All Trades", logo: "https://picsum.photos/seed/joat/100", specialization: ServiceCategory.Handyman, rating: 4.9, reviews: 500, description: "No job is too small. We do it all!", phone: "555-0122", email: "jack@alltrades.com" },
    { id: 23, name: "Honey-Do Helpers", logo: "https://picsum.photos/seed/hdh/100", specialization: ServiceCategory.Handyman, rating: 4.8, reviews: 420, description: "Let us tackle your to-do list.", phone: "555-0123", email: "help@honeydo.com" },
    { id: 24, name: "Mr. Fix-It", logo: "https://picsum.photos/seed/mfi/100", specialization: ServiceCategory.Handyman, rating: 4.8, reviews: 380, description: "Reliable handyman services for your home.", phone: "555-0124", email: "contact@mrfixit.com" },
  ],
  [ServiceCategory.TennisCourt]: [
    { id: 25, name: "Court Kings", logo: "https://picsum.photos/seed/ck/100", specialization: ServiceCategory.TennisCourt, rating: 4.9, reviews: 88, description: "Professional tennis court surfacing and repair.", phone: "555-0125", email: "contact@courtkings.com" },
    { id: 26, name: "Ace Court Maintenance", logo: "https://picsum.photos/seed/acm/100", specialization: ServiceCategory.TennisCourt, rating: 4.8, reviews: 65, description: "Keep your court in top playing condition.", phone: "555-0126", email: "service@acecourt.com" },
    { id: 27, name: "Net Results Courts", logo: "https://picsum.photos/seed/nrc/100", specialization: ServiceCategory.TennisCourt, rating: 4.7, reviews: 52, description: "Installation, cleaning, and line painting.", phone: "555-0127", email: "info@netresultscourts.com" },
  ],
};