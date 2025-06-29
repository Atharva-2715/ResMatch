import './contactMe.css';
import { Mail, Github, Linkedin, MapPin } from 'lucide-react';


const contactMe = () => {


  const ContactCard = ({ icon: Icon, title, content, link, delay }) => (
    <div className="contact-card" style={{ animationDelay: `${delay}s` }}>
      <div className="contact-icon">
        <Icon size={24} />
      </div>
      <h3 className="contactme-title-">{title}</h3>
      <div className="contact-content">
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer">
            {content}
          </a>
        ) : (
          content
        )}
      </div>
    </div>
  );
    return ( 
        <section className="contact-me" id="contact">
            <div className='content'>
                <h1 className="contact-title">Contact Me</h1>

                <div className="subtitle">
                    Ready to <span className="highlight">collaborate</span> or just want to say hi? 
                    I'd love to hear from you! Whether it's about a project, an opportunity, 
                    or just a friendly chat about <span className="highlight">tech and innovation</span>.
                </div>

                <div className="contact-cards">
              <ContactCard 
                icon={Mail}
                title="Email"
                content="atharvasakpal2715@gmail.com"
                link=""
                delay={0.2}
              />
              <ContactCard 
                icon={Github}
                title="GitHub"
                content="github.com/Atharva-2715"
                link="https://github.com/Atharva-2715"
                delay={0.4}
              />
              <ContactCard 
                icon={Linkedin}
                title="LinkedIn"
                content="linkedin.com/in/Atharva-Sakpal"
                link="www.linkedin.com/in/atharva-sakpal-1215832a9"
                delay={0.6}
              />
              <ContactCard 
                icon={MapPin}
                title="Location"
                content="Pune, India"
                delay={0.8}
              />
            </div>
            </div>
        </section>
     );
}
 
export default contactMe;