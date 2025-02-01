import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import BaulneLogo from '@/public/Baulne-Logo.webp';

const mockContractor = {
  name: 'Baulne',
  contactPerson: 'John Doe',
  phoneNumber: '+1 (555) 123-4567',
  email: 'john.doe@baulne.com',
};

interface ContactInfoProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-600 flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <div className="flex flex-col flex-1">
      <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{value}</span>
    </div>
  </div>
);

const ContractorCard: React.FC = () => {
  const [isContactVisible, setIsContactVisible] = useState(false);

  return (
    <Card className="overflow-hidden bg-white dark:bg-gray-700 shadow-md border-0">
      <CardHeader className="py-2 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <CardTitle className="text-md font-semibold text-gray-900 dark:text-white">Contractor</CardTitle>
          <Icons.hardHat className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="flex flex-col items-center gap-2 p-2">
          {/* Logo Section */}
          <div className="w-full h-10 flex items-center justify-center bg-white rounded-lg">
            <Image
              src={BaulneLogo}
              alt={mockContractor.name}
              width={100}
              // height={48}
              // layout="fill"
              objectFit="contain"
              className="invert"
            />
          </div>

          {/* Company Name */}
          {/*<h3 className="text-lg font-semibold text-gray-900 dark:text-white m-2">{mockContractor.name}</h3>*/}

          {/* Contact Button */}
          <button
            onClick={() => setIsContactVisible(!isContactVisible)}
            className="w-full flex items-center justify-center gap-2 p-2 rounded-lg
                            bg-blue-50 dark:bg-blue-600/20
                            text-blue-600 dark:text-blue-200
                            hover:bg-blue-100 dark:hover:bg-blue-900/30
                            transition-colors duration-200"
          >
            <Icons.phone className="w-4 h-4" />
            <span className="font-medium text-sm">{isContactVisible ? 'Hide Contact Info' : 'Contact Info'}</span>
            <Icons.chevronDown
              className={`w-4 h-4 transition-transform duration-200 
                            ${isContactVisible ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Contact Information */}
          <div
            className={`w-full overflow-hidden transition-all duration-200 ease-in-out
                        ${isContactVisible ? 'max-h-48 opacity-100  mt-2 space-y-2' : 'max-h-0 opacity-0'}`}
          >
            <ContactInfo
              icon={<Icons.user className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
              label="Contact Person"
              value={mockContractor.contactPerson}
            />
            <ContactInfo
              icon={<Icons.phone className="w-4 h-4 text-green-600 dark:text-green-400" />}
              label="Phone Number"
              value={mockContractor.phoneNumber}
            />
            <ContactInfo
              icon={<Icons.mail className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
              label="Email"
              value={mockContractor.email}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContractorCard;

// import React from 'react';
// import Image from 'next/image';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Icons } from "@/components/icons";
// import BaulneLogo from '@/public/Baulne-Logo.webp'
//
// const mockContractor = {
//     name: "Baulne",
//     contactPerson: "John Doe",
//     phoneNumber: "+1 (555) 123-4567",
// };
//
// interface ContractorDetailProps {
//     icon: React.ReactNode;
//     label: string;
//     value: string | number;
// }
//
// const ContractorDetail: React.FC<ContractorDetailProps> = ({ icon, label, value }) => (
//     <div className="flex items-center space-x-2">
//         <div className="w-4 flex-shrink-0">{icon}</div>
//         <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{label}:</span>
//         <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{value}</span>
//     </div>
// );
//
// const ContractorCard: React.FC = () => {
//     return (
//         <Card className="overflow-hidden bg-white dark:bg-gray-800 shadow-md">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b">
//                 <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Contractor</CardTitle>
//                 <Icons.hartHat className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
//             </CardHeader>
//             <CardContent className="flex flex-col items-center">
//                 <div className="w-full h-12 relative my-4">
//                     <Image
//                         src={BaulneLogo}
//                         alt={mockContractor.name}
//                         layout="fill"
//                         objectFit="contain"
//                         className="invert"
//                     />
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{mockContractor.name}</h3>
//                 <ContractorDetail
//                     icon={<Icons.user className="w-4 h-4 text-blue-600 dark:text-blue-400"/>}
//                     label="Contact"
//                     value={mockContractor.contactPerson}
//                 />
//                 <ContractorDetail
//                     icon={<Icons.phone className="w-4 h-4 text-green-600 dark:text-green-400"/>}
//                     label="Phone"
//                     value={mockContractor.phoneNumber}
//                 />
//             </CardContent>
//         </Card>
//     );
// };
//
// export default ContractorCard;
