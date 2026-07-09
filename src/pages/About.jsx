import React from "react";
import { Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaShippingFast,
  FaShieldAlt,
  FaHeadset,
  FaBoxOpen,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="animate-in bg-white dark:bg-gray-900">
      {/* Hero */}
      <section className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            Ahoron Store সম্পর্কে
          </h1>
          <p className="mt-5 max-w-3xl mx-auto text-lg text-teal-100">
            Ahoron Store একটি বিশ্বস্ত অনলাইন শপিং প্ল্যাটফর্ম, যেখানে
            দৈনন্দিন প্রয়োজনীয় ও মানসম্মত পণ্য সহজে এবং সাশ্রয়ী মূল্যে পাওয়া
            যায়।
          </p>
        </div>
      </section>

      {/* About */}
      <section className="max-w-7xl mx-auto px-5 py-16 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-5">
            আমাদের লক্ষ্য
          </h2>

          <p className="text-gray-600 dark:text-gray-300 leading-8">
            আমাদের লক্ষ্য বাংলাদেশের মানুষের জন্য একটি নির্ভরযোগ্য এবং সহজ
            অনলাইন শপিং অভিজ্ঞতা তৈরি করা। আমরা বিভিন্ন ক্যাটাগরির মানসম্মত
            পণ্য সঠিক দামে এবং দ্রুত ডেলিভারির মাধ্যমে আপনার হাতে পৌঁছে দিতে
            প্রতিশ্রুতিবদ্ধ।
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-teal-600 text-xl" />
              <span>মানসম্মত ও বাছাইকৃত পণ্য</span>
            </div>

            <div className="flex items-center gap-3">
              <FaShippingFast className="text-teal-600 text-xl" />
              <span>দ্রুত সারা দেশে ডেলিভারি</span>
            </div>

            <div className="flex items-center gap-3">
              <FaShieldAlt className="text-teal-600 text-xl" />
              <span>নিরাপদ কেনাকাটা</span>
            </div>

            <div className="flex items-center gap-3">
              <FaHeadset className="text-teal-600 text-xl" />
              <span>বন্ধুসুলভ কাস্টমার সাপোর্ট</span>
            </div>
          </div>
        </div>

        <div className="bg-teal-50 dark:bg-gray-800 rounded-3xl p-10">
          <FaBoxOpen className="text-6xl text-teal-600 mb-5" />

          <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            কেন Ahoron Store?
          </h3>

          <ul className="space-y-4 text-gray-700 dark:text-gray-300">
            <li>✔ বিভিন্ন ক্যাটাগরির পণ্য</li>
            <li>✔ প্রতিযোগিতামূলক মূল্য</li>
            <li>✔ নিরাপদ অর্ডার প্রক্রিয়া</li>
            <li>✔ দ্রুত অর্ডার প্রসেসিং</li>
            <li>✔ গ্রাহক সন্তুষ্টিকে সর্বোচ্চ গুরুত্ব</li>
          </ul>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            আমাদের সেবাসমূহ
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "দ্রুত ডেলিভারি",
                desc: "সারা বাংলাদেশে দ্রুত ডেলিভারির সুবিধা।",
              },
              {
                title: "নিরাপদ পেমেন্ট",
                desc: "নিরাপদ এবং সহজ পেমেন্ট ব্যবস্থা।",
              },
              {
                title: "গুণগত মান",
                desc: "প্রতিটি পণ্য যাচাই করে সরবরাহ করা হয়।",
              },
              {
                title: "কাস্টমার সাপোর্ট",
                desc: "যেকোনো সমস্যায় দ্রুত সহায়তা।",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
              >
                <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            আজই আপনার কেনাকাটা শুরু করুন
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Ahoron Store-এর সাথে নিরাপদ, সহজ এবং আনন্দদায়ক অনলাইন শপিং
            উপভোগ করুন।
          </p>

          <Link
            to="/products"
            className="inline-block mt-8 bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-xl font-semibold transition"
          >
            এখনই কেনাকাটা করুন
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;