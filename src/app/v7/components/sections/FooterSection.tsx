export default function FooterSection() {
  return (
    <footer className="v7-site-footer" aria-label="Website footer preview">
      <div className="v7-site-shell v7-site-footer-inner">
        <p>© 2025 Your Company. All rights reserved.</p>
        <nav aria-label="Social links">
          <ul className="v7-social-links">
            <li>
              <a href="#" aria-label="Twitter">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.6 7.2c.01.2.01.4.01.6A8.8 8.8 0 0 1 6.1 15.7a6.4 6.4 0 0 0 4.6-1.3 3.1 3.1 0 0 1-2.9-2.2c.2 0 .4.1.6.1.3 0 .6 0 .9-.1a3.1 3.1 0 0 1-2.5-3v-.1c.4.2.8.3 1.2.3a3.1 3.1 0 0 1-1-4.1A8.8 8.8 0 0 0 13.4 8a3.1 3.1 0 0 1 5.2-2.8c.8-.1 1.5-.4 2.1-.8-.3.8-.8 1.4-1.5 1.8.7-.1 1.3-.3 1.8-.5-.4.7-.9 1.2-1.4 1.6Z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="#" aria-label="GitHub">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.4 2.4 1 2.9.8.1-.7.4-1 .7-1.3-2.3-.3-4.6-1.1-4.6-4.9 0-1.1.4-2 1-2.8-.1-.3-.4-1.3.1-2.8 0 0 .8-.3 2.8 1a9.8 9.8 0 0 1 5 0c2-1.3 2.8-1 2.8-1 .5 1.5.2 2.5.1 2.8.6.8 1 1.7 1 2.8 0 3.8-2.3 4.6-4.6 4.9.4.3.8 1 .8 2v3c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="#" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 8a1.8 1.8 0 1 1 0-3.6A1.8 1.8 0 0 1 6 8Zm-1.6 2.2h3.2V20H4.4v-9.8Zm5.2 0h3.1v1.3h.1c.5-.9 1.6-1.7 3.3-1.7 3.5 0 4.1 2.1 4.1 4.9V20H17v-4.6c0-1.1 0-2.5-1.8-2.5s-2 1.3-2 2.4V20H9.6v-9.8Z" />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}