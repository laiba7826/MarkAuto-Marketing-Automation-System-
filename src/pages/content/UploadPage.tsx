import React, { useState, useRef } from 'react';
import { UploadCloud, Trash2, FileImage, FileVideo } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { useCollection } from '../../hooks/useCollection';
import type { MediaAsset } from '../../types';

export const UploadPage = () => {
  const { items, create, remove } = useCollection<MediaAsset>('/assets');
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const addFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach(f => {
      const isVideo = f.type.startsWith('video');
      create({ fileName: f.name, type: isVideo ? 'video' : 'image', sizeKb: Math.round(f.size / 1024) || 100, uploadedAt: new Date().toISOString().slice(0, 10) });
    });
  };
  return (
    <div className="space-y-8">
      <PageHeader title="Upload Media" subtitle="Upload and manage media assets for your posts." />
      <div onDragOver={e => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)}
        onDrop={e => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        className={`card border-2 border-dashed cursor-pointer flex flex-col items-center justify-center py-16 transition-colors ${drag ? 'border-cyan-500 bg-cyan-500/10' : 'border-blue-700/50 hover:border-cyan-500/50'}`}>
        <UploadCloud size={48} className="text-blue-400 mb-4" />
        <p className="font-bold">Drag & drop files here, or click to browse</p>
        <p className="text-sm section-muted font-medium mt-1">Images and video up to configured limits</p>
        <input ref={inputRef} type="file" multiple className="hidden" onChange={e => addFiles(e.target.files)} />
      </div>
      <div className="card !p-0 overflow-hidden">
        <table className="data-table">
          <thead><tr>
            <th>File</th><th>Type</th><th>Size</th><th>Uploaded</th><th className="text-right">Actions</th>
          </tr></thead>
          <tbody>
            {items.map(a => (
              <tr key={a.id}>
                <td><div className="flex items-center gap-2 cell-strong">{a.type === 'video' ? <FileVideo size={16} className="text-violet-400" /> : <FileImage size={16} className="text-cyan-400" />}{a.fileName}</div></td>
                <td className="capitalize">{a.type}</td>
                <td>{(a.sizeKb / 1024).toFixed(1)} MB</td>
                <td>{a.uploadedAt}</td>
                <td className="text-right"><button onClick={() => remove(a.id)} className="p-2 text-blue-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 size={16} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
