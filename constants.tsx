
import React from 'react';
import { Module } from './types';

const BookOpenIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6-2.292m0 0V21M12 6.042A8.967 8.967 0 0 1 18 3.75m-6 2.292V3.75m0 2.292A8.966 8.966 0 0 0 6 3.75m-3 5.112a8.986 8.986 0 0 1 3-2.612m3 2.612a8.986 8.986 0 0 0 3 2.612m0 0v1.042a8.986 8.986 0 0 1-3-2.612m3 2.612a8.986 8.986 0 0 0-3-2.612" />
  </svg>
);

const ScaleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52v16.5m-13.5-16.5v16.5m13.5-16.5c-1.01.143-2.01.317-3 .52m-10.5-1.106A48.354 48.354 0 0 1 12 4.5c2.291 0 4.545.16 6.75.47m-13.5 0V1.5" />
  </svg>
);

const DocumentTextIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
  </svg>
);

const CalculatorIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 3h.008v.008H8.25v-.008Zm0 3h.008v.008H8.25v-.008Zm3-6h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm3-6h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm-7.5-6h.008v.008H8.25v-.008Zm0 3h.008v.008H8.25v-.008Zm0 3h.008v.008H8.25v-.008ZM8.25 6.75h.008v.008H8.25V6.75Zm3 0h.008v.008h-.008V6.75Zm3 0h.008v.008h-.008V6.75Zm-3 3h.008v.008h-.008V9.75Zm-3 0h.008v.008H8.25V9.75ZM12 9.75h.008v.008H12V9.75ZM8.25 12h.008v.008H8.25V12Zm3 0h.008v.008h-.008V12Zm3 0h.008v.008h-.008V12Zm-7.5 3h.008v.008H8.25V15Zm3 0h.008v.008h-.008V15Zm-6.75-9A1.875 1.875 0 0 0 4.5 8.25v7.5A1.875 1.875 0 0 0 6.375 18h11.25A1.875 1.875 0 0 0 19.5 15.75v-7.5A1.875 1.875 0 0 0 17.625 6H6.375Z" />
  </svg>
);


export const LEARNING_MODULES: Module[] = [
  {
    id: 'nevada-law',
    title: 'Nevada Law & Regulations',
    description: 'Master the specific laws, statutes, and administrative codes governing real estate in Nevada.',
    icon: <ScaleIcon className="w-8 h-8 text-brand-blue-light" />,
    prompt: 'Start a lesson on Nevada-specific real estate laws and regulations for an aspiring agent.'
  },
  {
    id: 'contracts',
    title: 'Contracts & Agency',
    description: 'Understand listing agreements, purchase contracts, and the nuances of agent representation.',
    icon: <DocumentTextIcon className="w-8 h-8 text-brand-blue-light" />,
    prompt: 'Begin a lesson on real estate contracts and agency relationships, focusing on what a new Nevada agent needs to know.'
  },
  {
    id: 'property-ownership',
    title: 'Property Ownership',
    description: 'Learn about types of ownership, titles, deeds, and public records.',
    icon: <BookOpenIcon className="w-8 h-8 text-brand-blue-light" />,
    prompt: 'Teach me about the principles of property ownership as it pertains to the Nevada real estate exam.'
  },
  {
    id: 'real-estate-math',
    title: 'Real Estate Math',
    description: 'Practice calculations for commissions, property taxes, loan qualifications, and more.',
    icon: <CalculatorIcon className="w-8 h-8 text-brand-blue-light" />,
    prompt: 'Let\'s start a lesson on the essential real estate math concepts I need to know for the Nevada licensing exam.'
  },
];
