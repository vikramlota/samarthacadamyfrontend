import React, { useState } from 'react';
import { FaWhatsapp, FaFacebookF, FaTwitter, FaLinkedinIn, FaLink, FaCheck } from 'react-icons/fa';
import { cn } from '@/lib/utils';

export default function BlogShareButtons({ post, url }) {
  const [copied, setCopied] = useState(false);

  const enc = s => encodeURIComponent(s);
  const shares = [
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      href: `https://wa.me/?text=${enc(post.title)}%20${enc(url)}`,
      bg:   'bg-green-500 hover:bg-green-600',
    },
    {
      name: 'Facebook',
      icon: FaFacebookF,
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
      bg:   'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      href: `https://twitter.com/intent/tweet?text=${enc(post.title)}&url=${enc(url)}`,
      bg:   'bg-sky-500 hover:bg-sky-600',
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedinIn,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
      bg:   'bg-blue-700 hover:bg-blue-800',
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section className="py-6">
      <div className="container-custom max-w-3xl">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-gray-700">Share this article:</span>

          {shares.map(s => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'w-10 h-10 rounded-full text-white flex items-center justify-center transition-transform hover:scale-110',
                s.bg,
              )}
              aria-label={`Share on ${s.name}`}
            >
              <s.icon className="text-sm" aria-hidden="true" />
            </a>
          ))}

          <button
            onClick={copyLink}
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110',
              copied
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
            )}
            aria-label={copied ? 'Link copied!' : 'Copy link'}
          >
            {copied
              ? <FaCheck className="text-sm" aria-hidden="true" />
              : <FaLink className="text-sm" aria-hidden="true" />}
          </button>
        </div>
      </div>
    </section>
  );
}
