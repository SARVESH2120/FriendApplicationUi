import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-black border-t border-white/10 py-6 px-4 fixed bottom-0 w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Branding */}
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-amber-500"
          >
            <path d="M12 2L4 12l8 10 8-10-8-10zm0 2.5L18.5 12 12 19.5 5.5 12 12 4.5z" />
            <path d="M12 7.5L9.5 12l2.5 4.5 2.5-4.5-2.5-4.5zm0 2.5L13.5 12 12 14.5 10.5 12 12 10z" />
          </svg>
          <div>
            <p className="text-sm text-white/80">
              © {new Date().getFullYear()}{" "}
              <span className="text-amber-400 font-medium">EliteConnect</span>
            </p>
            <p className="text-xs text-white/50">
              For visionaries and disruptors
            </p>
          </div>
        </div>

        {/* Links */}
        <nav className="flex space-x-6">
          <a
            href="#"
            className="text-white/60 hover:text-amber-400 transition-colors text-sm"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-white/60 hover:text-amber-400 transition-colors text-sm"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-white/60 hover:text-amber-400 transition-colors text-sm"
          >
            Careers
          </a>
          <a
            href="#"
            className="text-white/60 hover:text-amber-400 transition-colors text-sm"
          >
            Contact
          </a>
        </nav>

        {/* Social Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white/10 transition-all group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              className="fill-white/60 group-hover:fill-amber-400 transition-colors"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </a>
          <a className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white/10 transition-all group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              className="fill-white/60 group-hover:fill-amber-400 transition-colors"
            >
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
            </svg>
          </a>
          <a className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white/10 transition-all group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              className="fill-white/60 group-hover:fill-amber-400 transition-colors"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
