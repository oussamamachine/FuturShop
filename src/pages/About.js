/**
 * About - Futur platform about page.
 * @component
 */

export default function About() {
  return (
    <section className="max-w-3xl mx-auto py-16 px-4" aria-labelledby="about-title">
      <h1 id="about-title" className="text-5xl font-extrabold mb-6 text-primary-500">About Futur</h1>
      <p className="text-lg text-gray-300 mb-6">
        Futur is a next-generation fashion platform blending AI, AR, and 3D technology to let you design, preview, and shop extraordinary apparel. Our mission is to empower your creativity and make futuristic fashion accessible to everyone.
      </p>
      <ul className="list-disc pl-6 text-gray-400 space-y-2">
        <li>AI-powered style wizard and virtual try-on</li>
        <li>Augmented reality previews in your space</li>
        <li>Real-time 3D customization and holograms</li>
        <li>Premium, sustainable materials</li>
      </ul>
      <div className="mt-10 text-gray-400 text-sm">
        <p>
          <span className="font-semibold">Contact:</span> <a href="mailto:hello@futurshop.com" className="underline hover:text-primary-400 focus-visible:ring-2 focus-visible:ring-primary-400" tabIndex={0}>hello@futurshop.com</a>
        </p>
        <p className="mt-2">
          <span className="font-semibold">Follow us:</span> <a href="https://twitter.com/futurshop" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary-400 ml-1 focus-visible:ring-2 focus-visible:ring-primary-400" tabIndex={0}>@futurshop</a>
        </p>
      </div>
    </section>
  );
}
