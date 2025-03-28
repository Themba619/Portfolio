
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import $ from 'jquery'

const ContactSection = () => {
  const serviceID=import.meta.env.VITE_EMAIL_JS_SERVICE_ID.trim();
  const templateID=import.meta.env.VITE_EMAIL_JS_TEMPLATE_ID.trim();
  const userID=import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY.trim();

  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [animationTriggered, setAnimationTriggered] = useState(false);
  
  // Handle scroll animation
  useState(() => {
    const handleScroll = () => {
      const section = document.getElementById('contact');
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
          setAnimationTriggered(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Handle form submission
    setTimeout(() => {
      var data = {
        service_id: serviceID.trim(),
        template_id: templateID.trim(),
        user_id: userID.trim(),
        template_params: {
          'user_name': formData.name,
          'user_email': formData.email,
          'message': formData.message
        }
      }

      $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json'
      }).done( () => {
        alert('Email sent');
      }).fail( (error: any) => {
        alert('Email has not been sent this issue will be fixed sent');
      });
    

      toast({
        title: "Message sent",
        description: "Thanks for reaching out! I'll get back to you soon.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      setIsSubmitting(false);
    }, 1500);

    
  };
  
  return (
    <section id="contact" className="bg-soft-gray section-padding">
      <div className="max-w-3xl mx-auto">
        <div className={`text-center mb-12 transition-opacity duration-1000 ${animationTriggered ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in" style={{ 
            animationDelay: '0.2s',
            animationPlayState: animationTriggered ? 'running' : 'paused' 
          }}>
            Get in Touch
          </h2>
          <p className="text-soft-dark/80 max-w-lg mx-auto animate-fade-in" style={{ 
            animationDelay: '0.3s',
            animationPlayState: animationTriggered ? 'running' : 'paused' 
          }}>
            Have a project in mind or just want to say hello? Feel free to reach out!
          </p>
        </div>
        
        {/* Contact Form */}
        <div className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-700 ${
          animationTriggered 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}>
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="space-y-6">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-soft-dark mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Your name"
                />
              </div>
              
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-soft-dark mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="ExampleEmail@gmail.com"
                />
              </div>
              
              {/* Message Input */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-soft-dark mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="form-input resize-none"
                  placeholder="Your message here..."
                />
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full relative overflow-hidden group"
              >
                <span className={`transition-opacity duration-300 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                  Send Message
                </span>
                
                {isSubmitting && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Social Links */}
        <div className={`mt-12 text-center transition-all duration-700 ${
          animationTriggered 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '0.3s' }}>
          <div className="flex justify-center space-x-6 mb-6">
            {/* Github */}
            <a href="https://github.com/Themba619?tab=repositories" target="_blank" className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm transition-transform duration-300 hover:transform hover:scale-110 hover:shadow-md">
            <svg
              className="w-5 h-5 text-soft-dark transition-colors duration-300 hover:text-soft-blue"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.724-4.043-1.607-4.043-1.607-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.085 1.838 1.236 1.838 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.306-5.467-1.332-5.467-5.931 0-1.311.468-2.381 1.236-3.221-.123-.306-.539-1.532.117-3.19 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02-.006 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.656 1.658.24 2.884.117 3.19.768.84 1.236 1.91 1.236 3.221 0 4.61-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
                clipRule="evenodd"
              />
            </svg>
            </a>
            
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/themba-biyela-a4567026a/" target="_blank" className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm transition-transform duration-300 hover:transform hover:scale-110 hover:shadow-md">
            <svg
              className="w-5 h-5 text-soft-dark transition-colors duration-300 hover:text-soft-blue"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            </a>
          </div>
          
          <p className="text-soft-dark/80 animate-fade-in" style={{ 
            animationDelay: '0.6s',
            animationPlayState: animationTriggered ? 'running' : 'paused' 
          }}>
            Or email me at: <a href="mailto:thembabiyela20@gmail.com" className="text-soft-blue hover:underline">thembabiyela20@gmail.com</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
