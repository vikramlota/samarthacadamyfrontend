import React from 'react';
import { FaCheckCircle, FaPhoneAlt } from 'react-icons/fa';
import { SectionHeader, Card, Button, Badge } from '@/components/ui';
import { CONTACT } from '@/data/homeStaticContent';

export default function LandingCourseDetails({ details, examShortName, courseSlug }) {
  if (!details) return null;

  const { inclusions, fees } = details;

  const savePct = fees?.original && fees?.discounted
    ? Math.round(((fees.original - fees.discounted) / fees.original) * 100)
    : null;

  return (
    <section className="bg-white section-padding" aria-labelledby="details-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Course Details"
          title="What's Included"
          description={`Everything you get in the Samarth ${examShortName} programme.`}
          className="mb-10"
        />

        <div className="grid lg:grid-cols-[3fr_2fr] gap-10 items-start">

          {/* Left: Inclusions checklist */}
          {inclusions?.length > 0 && (
            <ul className="space-y-3">
              {inclusions.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 mt-1 shrink-0" aria-hidden="true" />
                  <span className="text-gray-700 leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Right: Fee card */}
          {fees && (
            <Card variant="elevated" hover={false} className="border-2 border-red-100 sticky top-24 p-6 md:p-8">
              <h3 className="heading-display text-xl font-semibold text-gray-900 mb-4">
                {examShortName} Course
              </h3>

              {fees.original && (
                <div className="flex items-center gap-3 mb-1">
                  <span className="line-through text-gray-400 text-lg">
                    {fees.currency || '₹'}{fees.original.toLocaleString('en-IN')}
                  </span>
                  {savePct && (
                    <Badge variant="orange" size="sm">Save {savePct}%</Badge>
                  )}
                </div>
              )}

              {fees.discounted && (
                <div className="text-4xl font-bold text-red-500 mb-4">
                  {fees.currency || '₹'}{fees.discounted.toLocaleString('en-IN')}
                </div>
              )}

              {fees.emiAvailable && fees.emiNote && (
                <p className="text-sm text-gray-600 mb-5 bg-orange-50 rounded-lg px-3 py-2">
                  {fees.emiNote}
                </p>
              )}

              <Button
                to={`/book-demo`}
                variant="primary"
                size="lg"
                className="w-full"
              >
                Enroll Now
              </Button>

              <a
                href={CONTACT.phoneTel}
                className="flex items-center justify-center gap-2 mt-3 text-sm text-gray-600 hover:text-red-500 transition-colors duration-150"
              >
                <FaPhoneAlt className="text-xs" aria-hidden="true" />
                Or call: {CONTACT.phone}
              </a>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
