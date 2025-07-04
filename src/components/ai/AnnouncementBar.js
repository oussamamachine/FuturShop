
export default function AnnouncementBar() {
  return (
    <div
      className="bg-primary-800 text-white text-center py-2 px-4 text-sm font-medium tracking-wide shadow-md w-full"
      role="status"
      aria-live="polite"
      tabIndex={0}
    >
      <span className="sr-only">Announcement: </span>
      Free shipping on all orders over $50!
    </div>
  );
}