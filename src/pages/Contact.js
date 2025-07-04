/**
 * Contact - Accessible contact form page for Futur.
 * @component
 */
import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.message) {
      setError('Please fill out all fields.');
      return;
    }
    // Simulate async send
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  return (
    <section className="max-w-2xl mx-auto py-16 px-4" aria-labelledby="contact-title">
      <h1 id="contact-title" className="text-5xl font-extrabold mb-6 text-primary-500">Contact Us</h1>
      {submitted ? (
        <div className="bg-green-900/40 border border-green-700 rounded-lg p-6 text-green-200 text-center" role="status" tabIndex={0}>
          <p className="text-2xl font-semibold mb-2">Thank you for reaching out!</p>
          <p>We'll get back to you soon.</p>
        </div>
      ) : (
        <form className="space-y-6" onSubmit={handleSubmit} noValidate aria-describedby={error ? 'contact-error' : undefined}>
          <div>
            <label htmlFor="name" className="block text-gray-300 mb-1 font-medium">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              autoComplete="name"
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-300 mb-1 font-medium">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              autoComplete="email"
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-300 mb-1 font-medium">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={form.message}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-required="true"
            />
          </div>
          {error && (
            <div id="contact-error" className="text-red-400 text-sm" role="alert" tabIndex={0}>{error}</div>
          )}
          <button
            type="submit"
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
            aria-label="Send message"
          >
            Send Message
          </button>
        </form>
      )}
    </section>
  );
}
