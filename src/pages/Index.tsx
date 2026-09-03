import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Mission from '@/components/Mission';
import Fundraisers from '@/components/Fundraisers';
import Projects from '@/components/Projects';
import Catalog from '@/components/Catalog';
import News from '@/components/News';
import VkCommunity from '@/components/VkCommunity';
import VkFeed from '@/components/VkFeed';
import About from '@/components/About';
import Documents from '@/components/Documents';
import HowToHelp from '@/components/HowToHelp';
import GetHelp from '@/components/GetHelp';
import Partners from '@/components/Partners';
import Contacts from '@/components/Contacts';
import Footer from '@/components/Footer';
import DonateDialog from '@/components/DonateDialog';
import useReveal from '@/hooks/use-reveal';

const Index = () => {
  const [donateOpen, setDonateOpen] = useState(false);
  useReveal();

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onDonate={() => setDonateOpen(true)} />

      <main>
        <Hero onDonate={() => setDonateOpen(true)} onRequestHelp={() => scrollTo('#gethelp')} />
        <Mission />
        <Fundraisers onDonate={() => setDonateOpen(true)} />
        <Projects />
        <Catalog onDonate={() => setDonateOpen(true)} />
        <News />
        <VkFeed />
        <VkCommunity />
        <About />
        <Documents />
        <HowToHelp onDonate={() => setDonateOpen(true)} onVolunteer={() => scrollTo('#contacts')} />
        <GetHelp />
        <Partners />
        <Contacts />
      </main>

      <Footer />

      <DonateDialog open={donateOpen} onOpenChange={setDonateOpen} />
    </div>
  );
};

export default Index;