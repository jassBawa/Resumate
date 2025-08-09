export default function ContactPage() {
  const email = 'jaspreet@resumemateai.com';
  return (
    <main className="container mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-3 text-3xl font-bold">Contact ResuMate</h1>
      <p className="mb-8 text-gray-600 dark:text-gray-300">
        We d love to hear from you. For support, feedback, or partnership inquiries, reach us at:
      </p>

      <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-[#353945] dark:bg-[#23272f]">
        <p className="text-lg">
          Email:{' '}
          <a className="text-blue-600 underline" href={`mailto:${email}`}>
            {email}
          </a>
        </p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          We typically reply within a few business days.
        </p>
      </div>
    </main>
  );
}
