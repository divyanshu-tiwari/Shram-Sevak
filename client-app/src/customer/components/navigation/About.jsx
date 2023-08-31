import React from "react";

function TeamMember({ name, email }) {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-6 px-4">
      <div className="bg-white shadow-lg p-4">
        <div className="container">
          <h2 className="text-lg font-bold">{name}</h2>
          <a href={`mailto:${email}`} className="text-blue-500">{email}</a>
        </div>
      </div>
    </div>
  );
}

function OurTeam() {
  return (
    <div>
      <h2 className="text-4xl mt-4 mb-8 font-bold text-center">Our Team</h2>
      <div className="flex flex-wrap -mx-2">
        <TeamMember name="Pranay Gudekar" email="gudekarpranay@gmail.com" />
        <TeamMember name="Divyanshu Tiwari" email="divtiwari@gmail.com" />
        <TeamMember name="Jayesh Sinnarkar" email="jayesh@gmail.com" />
        <TeamMember name="Tarjan Sahu" email="tarjan@gmail.com" />
        <TeamMember name="Ashish Thattikota" email="ashish@gmail.com" />
      </div>
    </div>
  );
}
function About() {
  return (
    <div className="bg-primary text-blue">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl mt-10 mb-10 font-bold text-center">
          About Us
        </h1>
        <p className="leading-8 text-xl text-center">
          
 
The Shram Sevak platform is an online marketplace designed to connect workers and customers, providing a streamlined process for uploading, accepting, and completing work tasks. This scope document outlines the requirements for the development and implementation of the Kam Khojo platform.


The primary objective of our platform is to create an efficient and convenient ecosystem for  to upload work tasks and for workers to browse and accept tasks that match their skills and preferences. 

        </p>
       
      </div>
      <OurTeam />
    </div>
  );
}



export default About;
