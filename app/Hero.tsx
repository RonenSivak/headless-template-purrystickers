import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <header className="my-20">
      <div className="w-full">
        <div className="flex items-center justify-center w-full h-full py-12">
          <div className="text-center">
            <div className="container px-4 mx-auto">
              <div className="max-w-4xl mx-auto text-center">
                <span className="text-purple-700 font-semibold uppercase tracking-widest">
                  Get Your
                </span>
                <h2 className="mt-8 mb-6 text-4xl lg:text-5xl font-bold text-purple-700">
                  Purry Stickers
                </h2>
                <p className="max-w-3xl mx-auto mb-10 text-lg text-purple-500">
                  Trust me, they are purrfect! 🐱
                </p>
                <Link
                  className="inline-block w-full md:w-auto mb-4 md:mr-6 py-5 px-8 text-sm font-bold uppercase border-2 border-transparent bg-purple-100 rounded hover:bg-purple-400 text-gray-800 transition duration-200"
                  href="/collection"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-96 h-1 mx-auto my-4 bg-gray-200 border-0 rounded md:my-10" />
    </header>
  );
}
