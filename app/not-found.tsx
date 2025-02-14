import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-full place-items-center  bg-white px-2 py-24 sm:py-6 lg:px-8">
      <div className="text-center mt-10">
        <p className="text-base font-semibold text-primary">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-gray-900">
          Page not found
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 lg:flex items-center justify-center lg:gap-x-6">
          <Link href={"#"} className="border-none">
            <p className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              Go back home
            </p>
          </Link>
          <Link href={"#"} className="mt-2 md:mt-0">
            <p className="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
