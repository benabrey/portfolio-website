import "../styles/privacy.css";

export const metadata = {
  title: "Privacy Policy | wURLd Web Design",
};

export default function PrivacyPolicy() {
  return (
    <main className="privacy-page">
      <div className="privacy-inner">
        <h1>Privacy Policy</h1>
        <p className="privacy-date">Last updated: June 28, 2026</p>

        <section>
          <h2>Who we are</h2>
          <p>
            wURLd Web Design is a web design business based in Kelowna, BC,
            operated by Ben Abrey.
          </p>
        </section>

        <section>
          <h2>What information we collect</h2>
          <p>
            The only personal information we collect is what you voluntarily
            submit through our contact form — your name, email address, and
            message. This is processed through Web3Forms, a third-party form
            service.
          </p>
        </section>

        <section>
          <h2>How we use your information</h2>
          <p>
            Your information is used solely to respond to your inquiry. We do
            not sell, share, or distribute your data to any third parties beyond
            Web3Forms, which is used only to deliver your message to us.
          </p>
        </section>

        <section>
          <h2>Third party services</h2>
          <p>
            Our contact form is powered by Web3Forms. You can review their
            privacy policy at web3forms.com.
          </p>
        </section>

        <section>
          <h2>Cookies</h2>
          <p>This website does not use cookies or any tracking technology.</p>
        </section>

        <section>
          <h2>Analytics</h2>
          <p>This website does not use any analytics or tracking software.</p>
        </section>

        <section>
          <h2>Data retention</h2>
          <p>
            We do not store your personal information beyond what is needed to
            respond to your message.
          </p>
        </section>

        <section>
          <h2>Your rights</h2>
          <p>
            If you are a resident of British Columbia or Canada, you have the
            right to request access to or deletion of any personal information
            we hold about you. Contact us via the contact form on this site.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            For any privacy-related questions, reach out via the contact form on
            this site.
          </p>
        </section>
      </div>
    </main>
  );
}
