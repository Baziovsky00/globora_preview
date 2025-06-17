'use client'
import Hero from "./Hero/page";
import Introduction from "./Introduction/page";
import Navbar from "./Navbar/page";
import Introduction2 from "./Introduction2/page";
import Introduction3 from "./Introduction3/page";
import Contact from "./Contact/page";

const LandingPageClient = () => {
    // const [backgroundColor, setBackgroundColor] = useState<string>('white')
    return (
        <div style={{paddingBottom: 100}}>
            <Navbar />
            <Hero />
            <Introduction/>
            <Introduction2 />
            <Introduction3 />
            <Contact />
        </div>
    );
}

export default LandingPageClient;