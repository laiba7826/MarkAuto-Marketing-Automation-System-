import React, { useState } from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Label, Input, Textarea } from '../../components/ui/Field';

export const SiteContentPage = () => {
  const [saved, setSaved] = useState(false);
  return (
    <div className="space-y-8 max-w-2xl">
      <PageHeader title="Site Content" subtitle="Edit public-facing landing page content." />
      <div className="card space-y-5">
        <div><Label>Hero headline</Label><Input defaultValue="Automate your Marketing ROI." /></div>
        <div><Label>Hero subtitle</Label><Textarea rows={2} defaultValue="The all-in-one platform to plan, launch and measure campaigns." /></div>
        <div><Label>Call to action</Label><Input defaultValue="Get Started" /></div>
        <div className="pt-2"><button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 1500); }} className="btn-action">{saved ? 'Published!' : 'Publish Changes'}</button></div>
      </div>
    </div>
  );
};
