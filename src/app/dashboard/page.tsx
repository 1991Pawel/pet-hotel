import { getMembers } from "../actions/memberActions";

import HotelCard from "@/app/components/HotelCard";

export default async function Dashboard() {
  // const members = await getMembers();

  return (
    <div className=" to-yellow-100 p-8">
      <h1 className="text-4xl font-bold text-center text-orange-600">
        Hotele dla Psów 🐶
      </h1>
      {/* 
      {members && (
        <div className="container mx-auto px-4  m-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 auto-rows-auto ">
            {members.map((member) => (
              <HotelCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
}
