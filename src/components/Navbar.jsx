import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Phone, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Astrologers", href: "/#astrologers" },
    { name: "Services", href: "/#services" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "Blog", href: "/#blog" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold cosmic-text">Astrotruth</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <>
                  <span className="text-sm text-gray-700">Welcome, {user.email.split('@')[0]}!</span>
                  <Button variant="outline" size="sm" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </Button>
                </>
              ) : (
                <>
                  {/* <Link to="/login">
                    <Button variant="ghost" className="text-gray-700 hover:text-primary">
                      User Login
                    </Button>
                  </Link>
                   <Link to="/astro-login">
                    <Button variant="ghost" className="text-gray-700 hover:text-primary">
                     Astro Login
                    </Button>
                  </Link> */}
                  <Link to="/user-register">
                    <Button className="cosmic-gradient text-white">
                      <User className="mr-2 h-4 w-4" /> User Register
                    </Button>
                  </Link>
                  <Link to="/astro-register" onClick={() => setIsOpen(false)}>
                   <Button className="cosmic-gradient text-white">
                    <User className="mr-2 h-4 w-4" /> Astro Register
                  </Button>
                </Link>
                </>
              )}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="cosmic-gradient text-white">
                    <Phone className="mr-2 h-4 w-4" /> Talk to Astrologer
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <div className="grid gap-4 py-4">
                    <h3 className="text-lg font-medium">Talk to an Astrologer Now</h3>
                    <p className="text-sm text-gray-500">Enter your phone number and we'll connect you with an expert astrologer.</p>
                    <Input placeholder="Enter your phone number" type="tel" />
                    <Button className="cosmic-gradient text-white w-full">Connect Now</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="mr-2">
                  <Phone className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <div className="grid gap-4 py-4">
                  <h3 className="text-lg font-medium">Talk to an Astrologer Now</h3>
                  <p className="text-sm text-gray-500">Enter your phone number and we'll connect you with an expert astrologer.</p>
                  <Input placeholder="Enter your phone number" type="tel" />
                  <Button className="cosmic-gradient text-white w-full">Connect Now</Button>
                </div>
              </DialogContent>
            </Dialog>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white shadow-lg"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-gray-700 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <>
                <span className="text-gray-700 block px-3 py-2 rounded-md text-base font-medium">Welcome, {user.email.split('@')[0]}!</span>
                <Button variant="outline" className="w-full mt-2" onClick={() => { logout(); setIsOpen(false); }}>
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/user-login" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="text-gray-700 hover:text-primary w-full justify-start px-3 py-2">
                     User Login
                  </Button>
                </Link>
                <Link to="/user-register" onClick={() => setIsOpen(false)}>
                  <Button className="cosmic-gradient text-white w-full mt-2">
                    <User className="mr-2 h-4 w-4" /> User Register
                  </Button>
                </Link>
                <Link to="/astro-register" onClick={() => setIsOpen(false)} className="hide-btn-mobile">
                  <Button className="cosmic-gradient text-white w-full mt-2">
                    <User className="mr-2 h-4 w-4" /> Astro Register
                  </Button> 
                </Link>
              </>
            )}
            <Button className="cosmic-gradient text-white w-full mt-4">
              <Phone className="mr-2 h-4 w-4" /> Talk to Astrologer
            </Button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;