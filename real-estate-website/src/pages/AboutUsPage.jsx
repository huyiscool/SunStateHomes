// src/pages/AboutUsPage.jsx (or a new name like AboutAgentPage.jsx)
import React from 'react';
import './AboutUsPage.css'; // We'll reuse and adapt this CSS

const AboutUsPage = () => {
  const agentName = "Chau Nguyen"; // Replace with your actual name
  const startYear = 2015; // Year you started in real estate
  const yearsOfExperience = new Date().getFullYear() - startYear;
  const cityOfFocus = "San Jose, CA";
  //const tagline = `Your Dedicated ${cityOfFocus} Real Estate Expert`;

  const myExpertise = [
    `In-depth knowledge of diverse ${cityOfFocus} neighborhoods, from historic districts to modern developments.`,
    "Specializing in residential properties, including single-family homes, condos, and townhouses.",
    `Expert navigation of the competitive Silicon Valley housing market for both buyers and sellers.`,
    `Utilizing cutting-edge marketing strategies and data analytics to achieve optimal results as of ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.`,
    "Strong negotiation skills honed over years of successful transactions."
  ];

  const myValues = [
    "Client-First Mentality: Your goals and satisfaction are my absolute priority.",
    "Integrity & Honesty: Transparent and ethical practices in every interaction.",
    "Personalized Service: Tailoring my approach to your unique needs and circumstances.",
    `Local Expertise: A deep-rooted understanding and passion for the ${cityOfFocus} community.`,
    "Continuous Learning: Staying ahead of market trends and industry best practices."
  ];

  const AgentPhotoPath = '/ChauNguyen.png';


  return (
    <div className="about-us-page about-solo-agent"> {/* Added a specific class for solo agent styling if needed */}
      <section className="about-section my-story">
        <h2>My Journey in Real Estate</h2>
        <div className="content-flex">
          <div className="content-image agent-photo-container">
            <img src={AgentPhotoPath} alt={agentName} className="agent-photo" />
            {/* <div className="agent-photo-placeholder">Your Professional Photo</div> */}
          </div>
          <div className="content-text">
            <p>
              Welcome! I'm {agentName}, and for the past {yearsOfExperience} years, I've had the privilege of guiding clients through their real estate journeys right here in the heart of Silicon Valley, {cityOfFocus}. My passion for real estate isn't just about properties; it's about people and the vibrant communities we call home.
            </p>
            <p>
              I embarked on my real estate career in {startYear} with a singular mission: to provide a service that is not only highly effective but also genuinely personal and stress-free. Whether you're a first-time homebuyer feeling the excitement (and perhaps a bit of overwhelm!) of entering the {cityOfFocus} market, a seasoned investor looking for your next opportunity, or a homeowner ready to transition to a new chapter, I'm here to be your trusted advisor and advocate.
            </p>
            <p>
              Living and working in {cityOfFocus} has given me an intimate understanding of its unique charm, its diverse neighborhoods, and the intricacies of its dynamic market. My goal is to leverage this insight to your advantage.
            </p>
          </div>
        </div>
      </section>

      <section className="about-section my-expertise-section">
        <h2>My {cityOfFocus} Market Expertise</h2>
        <p>My commitment to you is backed by comprehensive knowledge and a proven track record in the local market. I specialize in:</p>
        <ul>
          {myExpertise.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </section>

      <section className="about-section my-approach-values">
        <h2>My Approach & Core Values</h2>
        <p>I believe that successful real estate transactions are built on a foundation of trust, clear communication, and a dedicated partnership. Here’s what you can expect when working with me:</p>
        <ul>
          {myValues.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
        <p>My approach is hands-on and proactive. I'm committed to being accessible and responsive, ensuring you're informed and confident from our initial consultation to closing day and beyond. (Current time in {cityOfFocus}: {new Date().toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles', hour: '2-digit', minute: '2-digit' })})</p>
      </section>

      <section className="about-section my-commitment-community">
        <h2>My Commitment to the {cityOfFocus} Community</h2>
        <p>
          {cityOfFocus} isn't just where I work—it's my community. I believe in giving back and am actively involved in [mention your specific local involvements, e.g., "volunteering at local school events," "supporting the San Jose Public Library Foundation," or "participating in neighborhood improvement projects"]. This connection to our area deepens my understanding of what makes each neighborhood special.
        </p>
      </section>

      <section className="about-section call-to-action-about">
        <h2>Ready to Achieve Your Real Estate Goals in {cityOfFocus}?</h2>
        <p>
          I'm excited to learn about your aspirations and discuss how I can help you navigate the {cityOfFocus} real estate market successfully.
          Let's connect for a complimentary, no-obligation consultation.
        </p>
      </section>
    </div>
  );
};

export default AboutUsPage;