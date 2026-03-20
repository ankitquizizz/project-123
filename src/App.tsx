import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Navigation, 
  CheckCircle2, 
  Sparkles,
  Flower2,
  Leaf,
  Info,
  UserCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import PhotoCarousel from './components/PhotoCarousel';
import ak1 from './assets/ak.jpeg';
import ak2 from './assets/ak2.jpeg';
import ak3 from './assets/ak3.jpeg';
import ak4 from './assets/ak4.jpeg';

// --- Types ---
type Tab = 'invitation' | 'events' | 'venue' | 'rsvp';

interface Event {
  id: string;
  name: string;
  date?: string;
  time?: string;
  description?: string;
  location?: string;
}

// --- Constants ---
const EVENTS: Event[] = [
  {
    id: 'tilak',
    name: 'Tilak Ceremony',
    date: 'Wednesday, 15th April 2026',
    time: '10:00 AM',
    description: 'A vibrant morning of turmeric and joy.',
    location: 'The Heritage Garden'
  },
  {
    id: 'matkor',
    name: 'Matkor',
    date: 'Friday, 17th April 2026',
    description: 'An evening of music, dance, and celebration.',
    location: 'Grand Ballroom'
  },
  {
    id: 'mehndi',
    name: 'Mehendi, Sangeet And Mandapam',
    date: 'Saturday, 18th April 2026',
    description: 'An evening of music, dance, and celebration.',
    location: 'Royal Palace Grounds'
  },
  {
    id: 'upanayanam',
    name: 'Upanayanam And Devpujan',
    date: 'Sunday, 19th April 2026',
  },
  {
    id: "wedding", 
    name: 'Wedding',
    date: 'Sunday, 20th April 2026',
  }
];

// --- Components ---

const Header = () => (
  <header className="sticky top-0 z-50 bg-brand-cream/80 backdrop-blur-md border-b border-black/5 px-6 py-4 flex items-center justify-center gap-3">
    <Flower2 className="w-5 h-5 text-brand-red" />
    <h1 className="text-xl font-bold italic text-brand-red">Our Eternal Bond</h1>
  </header>
);

const BottomNav = ({ activeTab, setActiveTab }: { activeTab: Tab, setActiveTab: (tab: Tab) => void }) => {
  const navItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'invitation', label: 'INVITATION', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'events', label: 'EVENTS', icon: <Calendar className="w-5 h-5" /> },
    { id: 'venue', label: 'VENUE', icon: <MapPin className="w-5 h-5" /> },
    { id: 'rsvp', label: 'RSVP', icon: <UserCheck className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-black/5 px-4 py-2 pb-6 flex justify-around items-center">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeTab === item.id ? 'text-brand-red' : 'text-gray-400'
          }`}
        >
          {item.icon}
          <span className="text-[10px] font-bold tracking-wider">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

const InvitationView = ({ onRsvpClick, onItineraryClick }: { onRsvpClick: () => void, onItineraryClick: () => void, key?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="pb-24"
  >
    {/* Hero Section */}
    <section className="flex flex-col items-center text-center px-6 pt-12 pb-16">
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-brand-red/5 rounded-full blur-3xl -z-10" />
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-red">
          <path d="M4 21V9L12 3L20 9V21H4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 21V14H15V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 3V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 7H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      
      <span className="text-xs font-bold tracking-[0.3em] text-brand-gold uppercase mb-4">Shubh Vivah</span>
      <h2 className="text-6xl italic mb-8">Eternal Union</h2>
      
      <p className="text-lg leading-relaxed text-gray-700 max-w-xs italic">
        Together with our families, we joyfully invite you to celebrate the beginning of our forever.
      </p>
      
      <div className="flex gap-4 mt-12">
        <Flower2 className="w-4 h-4 text-brand-gold" />
        <Flower2 className="w-4 h-4 text-brand-gold" />
        <Flower2 className="w-4 h-4 text-brand-gold" />
      </div>
    </section>

    {/* Couple Image */}
    <section className="px-4 mb-12">
      <PhotoCarousel
        images={[
          { src: ak1, alt: 'The Couple' },
          { src: ak2, alt: 'The Couple' },
          { src: ak3, alt: 'The Couple' },
          { src: ak4, alt: 'The Couple' },
        ]}
      />
    </section>

    {/* Date Section */}
    <section className="px-6 mb-12 text-center">
      <h3 className="text-3xl italic mb-6">The Auspicious Day</h3>
      <div className="space-y-2">
        <p className="text-xl text-gray-800">Sunday, the Twenty-Fourth of November</p>
        <p className="text-xs font-bold tracking-[0.2em] text-brand-gold uppercase">Two Thousand Twenty Four</p>
      </div>
    </section>

    {/* Venue Card */}
    <section className="px-4 mb-12">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-black/5 text-center relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-red/5 rounded-full blur-2xl" />
        
        <h3 className="text-2xl italic mb-6">The Sacred Venue</h3>
        <div className="space-y-4 mb-8">
          <p className="text-xl font-bold">The Heritage Grand Mandapam</p>
          <p className="text-gray-600 leading-relaxed">
            Royal Enclave, Heritage Drive<br />
            Udaipur, Rajasthan, India
          </p>
        </div>

        <button className="w-full bg-brand-red text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-900 transition-colors">
          <Navigation className="w-4 h-4" />
          GET DIRECTIONS
        </button>
      </div>
    </section>

    {/* Main Actions */}
    <section className="px-4 space-y-4 mb-16">
      <button 
        onClick={onRsvpClick}
        className="w-full bg-brand-red text-white py-5 rounded-xl font-bold text-sm tracking-wider shadow-lg shadow-brand-red/20"
      >
        CONFIRM ATTENDANCE
      </button>
      <button 
        onClick={onItineraryClick}
        className="w-full py-4 text-brand-red font-bold text-sm tracking-wider"
      >
        VIEW FULL ITINERARY
      </button>
      <div className="h-px bg-black/5 mx-8" />
    </section>

    {/* Footer Quote */}
    <footer className="px-8 text-center pb-12">
      <Leaf className="w-6 h-6 text-brand-gold mx-auto mb-6 rotate-45" />
      <p className="italic text-gray-600 leading-relaxed">
        "As the sacred fire witnesses our vows, your presence adds to the warmth of our new beginning."
      </p>
    </footer>
  </motion.div>
);

const EventsView = () => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="px-6 pt-8 pb-24"
  >
    <h2 className="text-4xl italic mb-8 text-center">Wedding Events</h2>
    <div className="space-y-6">
      {EVENTS.map((event, idx) => (
        <motion.div 
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-black/5"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="bg-brand-red/5 p-3 rounded-xl">
              <Clock className="w-5 h-5 text-brand-red" />
            </div>
            <span className="text-xs font-bold text-brand-gold tracking-widest uppercase">{event.time}</span>
          </div>
          <h3 className="text-xl font-bold mb-2">{event.name}</h3>
          <p className="text-sm text-gray-500 mb-4">{event.date}</p>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">{event.description}</p>
          <div className="flex items-center gap-2 text-xs font-bold text-brand-red">
            <MapPin className="w-3 h-3" />
            {event.location}
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const VenueView = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="px-6 pt-8 pb-24"
  >
    <h2 className="text-4xl italic mb-8 text-center">The Location</h2>
    
    <div className="rounded-2xl overflow-hidden shadow-lg mb-8 aspect-video relative">
      <img 
        src="https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?q=80&w=2021&auto=format&fit=crop" 
        alt="Venue" 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/20" />
    </div>

    <div className="bg-white rounded-2xl p-8 shadow-sm border border-black/5 mb-8">
      <h3 className="text-2xl italic mb-4">The Heritage Grand Mandapam</h3>
      <p className="text-gray-600 leading-relaxed mb-6">
        Nestled in the heart of Udaipur, our venue offers a blend of royal heritage and modern luxury, perfect for our sacred union.
      </p>
      
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="bg-brand-red/5 p-3 rounded-xl h-fit">
            <MapPin className="w-5 h-5 text-brand-red" />
          </div>
          <div>
            <p className="font-bold">Address</p>
            <p className="text-sm text-gray-500">Royal Enclave, Heritage Drive, Udaipur, Rajasthan 313001</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-brand-red/5 p-3 rounded-xl h-fit">
            <Info className="w-5 h-5 text-brand-red" />
          </div>
          <div>
            <p className="font-bold">Travel Tip</p>
            <p className="text-sm text-gray-500">The venue is 45 mins from Maharana Pratap Airport. Shuttle services will be available.</p>
          </div>
        </div>
      </div>
    </div>

    <button className="w-full bg-brand-red text-white py-5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-red/20">
      <Navigation className="w-5 h-5" />
      OPEN IN GOOGLE MAPS
    </button>
  </motion.div>
);

const RsvpView = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    guests: '1',
    attending: '',
    message: '',
    arrivalDate: '',
    arrivalTime: '',
    phone: '',
  });

  const handleSubmit = async(e: React.FormEvent) => {
    setSubmitting(true);
    e.preventDefault();
    await fetch('https://dummyjson.com/products', {
      method: 'GET',
    })

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="px-6 pt-20 pb-24 text-center"
      >
        <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl italic mb-4">Thank You!</h2>
        <p className="text-gray-600 leading-relaxed mb-8">
          Your response has been recorded. We can't wait to celebrate with you!
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="text-brand-red font-bold"
        >
          Edit Response
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="px-6 pt-8 pb-24"
    >
      <h2 className="text-4xl italic mb-4 text-center">RSVP</h2>
      <p className="text-center text-gray-500 mb-10">Kindly respond by April 7th, 2026</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 tracking-widest uppercase">Full Name</label>
          <input 
            type="text" 
            className="w-full bg-white border border-black/5 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all"
            placeholder="Enter your name"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 tracking-widest uppercase">Phone Number</label>
          <input 
            className="w-full bg-white border border-black/5 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all"
            type="number" 
            id="phone" 
            name="phone" 
            placeholder="9999999999"
            onChange={e => setFormData({...formData, phone: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 tracking-widest uppercase">No. of Guests</label>
            <select 
              className="w-full bg-white border border-black/5 rounded-xl px-4 py-4 focus:outline-none transition-all"
              value={formData.guests}
              onChange={e => setFormData({...formData, guests: e.target.value})}
            >
              {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 tracking-widest uppercase">Attending?</label>
            <select 
              className="w-full bg-white border border-black/5 rounded-xl px-4 py-4 focus:outline-none transition-all"
              value={formData.attending}
              onChange={e => {
                const attending = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  attending,
                  // If user declines, arrival details no longer apply.
                  arrivalDate: attending === 'yes' ? prev.arrivalDate : '',
                  arrivalTime: attending === 'yes' ? prev.arrivalTime : '',
                }));
              }}
            >
                <option value="" selected disabled>----</option>
              <option value="yes">Accept</option>
              <option value="no">Decline</option>
            </select>
          </div>
        </div>

        {formData.attending === 'yes' ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 tracking-widest uppercase">Date of Arrival</label>
              <input
                type="date"
                className="w-full bg-white border border-black/5 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all"
                value={formData.arrivalDate}
                onChange={e =>
                  setFormData((prev) => ({
                    ...prev,
                    arrivalDate: e.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 tracking-widest uppercase">Time of Arrival</label>
              <input
                type="time"
                className="w-full bg-white border border-black/5 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all"
                value={formData.arrivalTime}
                onChange={e =>
                  setFormData((prev) => ({
                    ...prev,
                    arrivalTime: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        ) : null}

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 tracking-widest uppercase">Message (Optional)</label>
          <textarea 
            rows={4}
            className="w-full bg-white border border-black/5 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all"
            placeholder="Wishes for the couple..."
            value={formData.message}
            onChange={e => setFormData({...formData, message: e.target.value})}
          />
        </div>

        <button 
          type="submit"
          disabled={submitting}
          className="w-full bg-brand-red text-white py-5 rounded-xl font-bold shadow-lg shadow-brand-red/20"
        >
          SUBMIT RESPONSE
        </button>
      </form>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('invitation');

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  return (
    <div className="min-h-screen max-w-md mx-auto bg-brand-cream relative" style={{background: 'beige'}}>
      <Header />
      
      <main className="relative">
        <AnimatePresence mode="wait">
          {activeTab === 'invitation' && (
            <InvitationView 
              key="invitation" 
              onRsvpClick={() => setActiveTab('rsvp')} 
              onItineraryClick={() => setActiveTab('events')}
            />
          )}
          {activeTab === 'events' && <EventsView key="events" />}
          {activeTab === 'venue' && <VenueView key="venue" />}
          {activeTab === 'rsvp' && <RsvpView key="rsvp" />}
        </AnimatePresence>
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
