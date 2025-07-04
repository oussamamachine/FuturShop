/**
 * Legal - Legal and privacy policy page for Futur.
 * @component
 */

export default function Legal() {
  return (
    <section className="max-w-3xl mx-auto py-16 px-4" aria-labelledby="legal-title">
      <h1 id="legal-title" className="text-4xl font-extrabold mb-6 text-primary-500">Legal & Privacy</h1>
      <p className="text-gray-300 mb-4">We value your privacy and are committed to protecting your data. Please review our terms and privacy policy below.</p>
      <h2 className="text-2xl font-bold mt-8 mb-2">Terms of Service</h2>
      <p className="text-gray-400 mb-6">
        By using Futur, you agree to our terms and conditions. All content and technology is protected by copyright and may not be reproduced without permission.
      </p>
      <h2 className="text-2xl font-bold mt-8 mb-2">Privacy Policy</h2>
      <p className="text-gray-400 mb-2">
        We collect only the data necessary to provide our services. Your information is never sold or shared with third parties. You may request deletion of your data at any time.
      </p>
      <ul className="list-disc pl-6 text-gray-500 text-sm space-y-1">
        <li>We use cookies only for essential site functionality.</li>
        <li>All payment data is processed securely by third-party providers.</li>
        <li>You may contact us at <a href="mailto:privacy@futurshop.com" className="underline hover:text-primary-400 focus-visible:ring-2 focus-visible:ring-primary-400">privacy@futurshop.com</a> for any privacy concerns.</li>
      </ul>
    </section>
  );
}
