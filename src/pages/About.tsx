
import React from "react";
import Header from "@/components/herohype/Header";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto py-12 px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-playfair font-bold mb-4">About HeroHype</h1>
          <div className="w-20 h-1 bg-[#3A5A40] mb-8"></div>
        </div>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg leading-relaxed mb-6">
            HeroHype is a community-driven platform showcasing the best hero sections from around the web. 
            We believe that a great hero section can make or break a website's first impression, 
            and we're passionate about collecting and curating exceptional examples to inspire designers and developers.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed mb-6">
            Our mission is to provide a central hub for design inspiration, specifically focused on hero sections. 
            Whether you're looking for minimalist designs, bold typography, or innovative layouts, 
            HeroHype offers a curated collection to spark your creativity.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">For Designers & Developers</h2>
          <p className="text-lg leading-relaxed mb-6">
            Whether you're a seasoned designer looking for fresh ideas or a developer seeking inspiration 
            for your next project, HeroHype is the perfect resource. Browse our gallery, filter by style, 
            and save your favorites to your personal moodboard.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Submit Your Work</h2>
          <p className="text-lg leading-relaxed mb-6">
            Are you proud of a hero section you've designed? Share it with our community! 
            Simply create an account and submit your work. Our curation team reviews submissions 
            and features the best examples in our gallery and curated collection.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Get in Touch</h2>
          <p className="text-lg leading-relaxed">
            Have questions, suggestions, or feedback? We'd love to hear from you. 
            Reach out to us at <a href="mailto:hello@herohype.com" className="text-[#3A5A40] hover:underline">hello@herohype.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
