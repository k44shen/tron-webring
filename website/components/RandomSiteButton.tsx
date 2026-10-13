'use client';

import members from '@/data/members.json';

export default function RandomSiteButton() {
  const handleClick = () => {
    const sites = members.sites;
    const random = sites[Math.floor(Math.random() * sites.length)];
    window.open(random.website, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="w-fit text-left text-light underline underline-offset-4 decoration-brass/50 hover:decoration-brass transition-colors cursor-pointer"
    >
      Visit a random website &rarr;
    </button>
  );
}
