import { createContext, useState, useEffect } from "react";
import logoicon from './assets/demo_images/40x40.jpg';
import slide4 from './assets/demo_images/slide4.jpg';
import FacebookIcon from './assets/demo_images/fb.png';
import InstagramIcon from './assets/demo_images/insta.png';
import TwitterIcon from './assets/demo_images/twitter.png';
import axios from 'axios';

const SocketContext = createContext();
const backendBaseUrl = 'http://localhost:8080';
const ContextProvider = ({ children }) => {

    //Header Data

    // const [logo, setLogo] = useState(logoicon);
    const [logo, setLogo] = useState(() => {
        const storedLogo = localStorage.getItem('logo');
        return storedLogo || logoicon;
    });

    const [slides, setSlides] = useState(() => {
        const storedSlides = localStorage.getItem('slides');
        return JSON.parse(storedSlides) || [
            {
                imageSrc: slide4,
                buttonText: "Explore",
                url: "/",
            },
            {
                imageSrc: slide4,
                buttonText: "Explore",
                url: "/",
            },
            {
                imageSrc: slide4,
                buttonText: "Explore",
                url: "/",
            },
        ]
    });

    // const [pages, setPages] = useState([{ title: "Home", url: '/' }, { title: "Products", url: '/products' }, { title: "Contact", url: '/contact-us' }, { title: "About US", url: "/about-us" }]);
    const [pages, setPages] = useState(() => {
        const storedPages = localStorage.getItem('navbar');
        return storedPages ? JSON.parse(storedPages) : [{ title: "Home", url: '/' }, { title: "Products", url: '/products' }, { title: "Contact", url: '/contact-us' }, { title: "About US", url: "/about-us" }];
    });

    // Footer data

    const [description, setDescription] = useState(() => {
        const storedDescription = localStorage.getItem('desc');
        return storedDescription || 'We are XYZ company, dedicated to providing the best service to our customers.'
    });


    const [quicklinks, setQuicklinks] = useState(() => {
        const storedQuick = localStorage.getItem('quick');
        return storedQuick ? JSON.parse(storedQuick) : [{ title: "Home", url: '/' }, { title: "Products", url: '/products' }, { title: "Contact", url: '/contact-us' }, { title: "About US", url: "/about-us" }];
    });

    const [contact, setContact] = useState(() => {
        const storedContact = localStorage.getItem('contact');
        return storedContact || '+1 234 567 8901';
    });

    const [email, setEmail] = useState(() => {
        const storedEmail = localStorage.getItem('email');
        return storedEmail || 'info@example.com'
    });

    const [sociallinks, setSociallinks] = useState(() => {
        const storedSocial = localStorage.getItem('social');
        return storedSocial ? JSON.parse(storedSocial) : [{ icon: FacebookIcon, url: 'https://www.facebook.com/' }, { icon: InstagramIcon, url: 'https://www.instagram.com/' }, { icon: TwitterIcon, url: 'https://www.twitter.com/' }];
    });

    const getNavbarData = () => {
        axios.get(`${backendBaseUrl}/getNavbar`)
            .then((response) => {
                const headerData = response.data;
                const formattedPages = headerData.map((item, index) => ({
                    title: item.title,
                    url: item.url,
                }));
                setPages(formattedPages);
                localStorage.setItem('navbar', JSON.stringify([...formattedPages]));
            })
            .catch((error) => {
                console.error('Error fetching header data:', error);
            });
    }

    const getCardData = () => {
        axios.get(`${backendBaseUrl}/getCard`)
            .then((response) => {
                const headerData = response.data;
                console.log("CARD: " + JSON.stringify(headerData));
                const formattedCard = headerData.map((item, index) => ({
                    imageSrc: item.cardImage,
                    buttonText: item.cardButtonText,
                    url: item.cardUrl,
                }));
                setSlides(formattedCard);
                console.log("FormatCARD: " + JSON.stringify(formattedCard));
                localStorage.setItem('slides', JSON.stringify([...formattedCard]));
            })
            .catch((error) => {
                console.error('Error fetching header data:', error);
            });
    }

    const getQuicklink = () => {
        axios.get(`${backendBaseUrl}/getQuicklink`)
            .then((response) => {
                const headerData = response.data;
                const formattedPages = headerData.map((item, index) => ({
                    title: item.quicklinkTitle,
                    url: item.quicklinkUrl,
                }));
                setQuicklinks(formattedPages);
                console.log("quickLINKS: " + formattedPages);
                localStorage.setItem('quick', JSON.stringify([...formattedPages]));
            })
            .catch((error) => {
                console.error('Error fetching quicklink data:', error);
            });
    }

    const getSociallink = () => {
        axios.get(`${backendBaseUrl}/getSociallink`)
            .then((response) => {
                const headerData = response.data;
                const formattedPages = headerData.map((item, index) => ({
                    icon: item.sociallinkIcon,
                    url: item.sociallinkUrl,
                }));
                setSociallinks(formattedPages);
                console.log("quickLINKS: " + formattedPages);
                localStorage.setItem('social', JSON.stringify([...formattedPages]));
            })
            .catch((error) => {
                console.error('Error fetching quicklink data:', error);
            });
    }

    const getFooterdata = () => {
        axios.get(`${backendBaseUrl}/getFooterData`)
            .then((response) => {
                const headerData = response.data;
                console.log("header: " + JSON.stringify(headerData));
                setDescription(headerData[0].footerDescription);
                setContact(headerData[0].footerContact);
                setEmail(headerData[0].footerEmail);
                console.log("description: " + headerData[0].footerDescription);
                console.log("contact: " + headerData[0].footerContact);
                console.log("email: " + headerData[0].footerEmail);
                localStorage.setItem('desc', headerData[0].footerDescription);
                localStorage.setItem('contact', headerData[0].footerContact);
                localStorage.setItem('email', headerData[0].footerEmail);
            })
            .catch((error) => {
                console.error('Error fetching quicklink data:', error);
            });
    }

    const updateNavBarData = (index, newNavTitle, newNavLinks) => {
        axios.post(`${backendBaseUrl}/updateNavBar`, {
            idnavBar: index,
            navTitle: newNavTitle,
            navLink: newNavLinks,
        })
            .then((response) => {
                console.log("Navbar data updated successfully:", response.data);
            })
            .catch((error) => {
                console.error('Error updating NavBar data:', error);
            });
    }
    const updateCardData = (index, newImage, newButtonText, newUrl) => {
        axios.post(`${backendBaseUrl}/updateCard`, {
            idcards: index,
            cardImage: newImage,
            cardButtonText: newButtonText,
            cardUrl: newUrl,
        })
            .then((response) => {
                console.log("Card data updated successfully:", response.data);
            })
            .catch((error) => {
                console.error('Error updating Card data:', error);
            });
    }
    const updateFooter = (Desc, Contact, Email) => {
        axios.post(`${backendBaseUrl}/updateFooterdata`, {
            description: Desc,
            contact: Contact,
            email: Email,
        })
            .then((response) => {
                console.log("Footer data updated successfully:", response.data);
            })
            .catch((error) => {
                console.error('Error updating Footer data:', error);
            });
    }

    const updateQuicklink = (index, title, url) => {
        axios.post(`${backendBaseUrl}/updateQuicklink`, {
            idquicklink: index,
            quicklinkTitle: title,
            quicklinkUrl: url,
        })
            .then((response) => {
                console.log("QuickLink data updated successfully:", response.data);
            })
            .catch((error) => {
                console.error('Error updating QuickLink data:', error);
            });
    }

    const updateSociallink = (index, icon, url) => {
        axios.post(`${backendBaseUrl}/updateSociallink`, {
            idsociallink: index,
            sociallinkIcon: icon,
            sociallinkUrl: url,
        })
            .then((response) => {
                console.log("SocialLink data updated successfully:", response.data);
            })
            .catch((error) => {
                console.error('Error updating SocialLink data:', error);
            });
    }

    const updateLogo = (newLogo) => {
        axios.post(`${backendBaseUrl}/updateLogo`, {
            logo: newLogo,
        })
            .then((response) => {
                console.log("logo data updated successfully:", response.data);
            })
            .catch((error) => {
                console.error('Error updating logo data:', error);
            });
    }

    const getLogo = () => {
        axios.get(`${backendBaseUrl}/getlogo`)
            .then((response) => {
                const logoData = response.data;
                console.log("response: " + JSON.stringify(logoData));
                const logoBlob = new Blob([logoData], { type: 'image/jpeg' });
                const logoUrl = URL.createObjectURL(logoBlob);
                // const reader = new FileReader();
                // reader.onload = () => {
                //     const logoBase64 = reader.result;
                //     setLogo(logoBase64);
                //     console.log('logo: ' + logoBase64);
                // };
                // reader.readAsDataURL(logoBlob);
                console.log("logoUrl: " + logoUrl);
                setLogo(logoUrl);
                // localStorage.setItem('logo', logoUrl);
            })
            .catch((error) => {
                console.error('Error fetching header data:', error);
            });
    }

    useEffect(() => {
        getLogo();
        getNavbarData();
        getQuicklink();
        getSociallink();
        getFooterdata();
        getCardData();
    }, []);

    return (
        <SocketContext.Provider
            value={{
                logo,
                setLogo,
                pages,
                setPages,
                description,
                setDescription,
                quicklinks,
                setQuicklinks,
                contact,
                setContact,
                email,
                setEmail,
                slides,
                setSlides,
                sociallinks,
                setSociallinks,
                updateNavBarData,
                updateCardData,
                updateFooter,
                updateQuicklink,
                updateSociallink,
                updateLogo,
                getLogo
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export { ContextProvider, SocketContext };
