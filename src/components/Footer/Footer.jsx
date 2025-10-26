function Footer() {
  return (
    <footer className=" flex-ato bg-white text-black border-t border-b border-[#DEDEDE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <section>
            <h4 className="mb-3 border-b border-[#DEDEDE] pb-2 text-base font-medium">
              About
            </h4>
            <p className="text-sm leading-relaxed">
              A trusted platform to find and review the best YouTube programming
              courses.
            </p>
          </section>

          {/* Quick Links */}
          <section>
            <h4 className="mb-3 border-b border-[#DEDEDE] pb-2 text-base font-medium">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm [&_a:hover]:text-gray-500 transition">
              <li><a href="/">Home</a></li>
              <li><a href="/free">Free Course</a></li>
              <li><a href="/paid">Paid Course</a></li>
              <li><a href="/review">Write a Review</a></li>
              <li><a href="/roadmaps">Roadmaps</a></li>
            </ul>
          </section>

          {/* Legal */}
          <section>
            <h4 className="mb-3 border-b border-[#DEDEDE] pb-2 text-base font-medium">
              Legal
            </h4>
            <ul className="space-y-2 text-sm [&_a:hover]:text-gray-500 transition">
              <li><a href="/terms">Terms & Conditions</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </section>

          {/* Follow Us */}
          <section>
            <h4 className="mb-3 border-b border-[#DEDEDE] pb-2 text-base font-medium">
              Follow Us
            </h4>
            <div className="flex items-center space-x-1 mt-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform transform hover:scale-110 hover:opacity-80 duration-200"
              >
                <img src="/linkedin.png" alt="LinkedIn" className="w-8 h-7" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform transform hover:scale-110 hover:opacity-80 duration-200"
              >
                <img src="/github.png" alt="GitHub" className="w-8 h-7" />
              </a>
            </div>
          </section>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-xs sm:text-sm py-4 border-t border-[#DEDEDE]">
        © 2025 Harsh Patel. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer
