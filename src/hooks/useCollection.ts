import { useState, useCallback, useEffect } from 'react';

export interface HasId { id: string; }

const API_BASE = 'http://localhost:5000/api';

export function useCollection<T extends HasId>(endpoint: string, initial: T[] = []) {
  const [items, setItems] = useState<T[]>(initial);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}${endpoint}`);
      if (!res.ok) throw new Error(`Failed to fetch items from ${endpoint}`);
      const data = await res.json();
      setItems(data);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const create = useCallback(async (item: Omit<T, 'id'>) => {
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (!res.ok) throw new Error('Failed to create item');
      const newItem = await res.json();
      setItems(prev => [newItem, ...prev]);
      return newItem;
    } catch (err) {
      console.error(err);
    }
  }, [endpoint]);

  const update = useCallback(async (id: string, patch: Partial<T>) => {
    try {
      const res = await fetch(`${API_BASE}${endpoint}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error('Failed to update item');
      const updatedItem = await res.json();
      setItems(prev => prev.map(it => (it.id === id ? updatedItem : it)));
      return updatedItem;
    } catch (err) {
      console.error(err);
    }
  }, [endpoint]);

  const remove = useCallback(async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}${endpoint}/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete item');
      setItems(prev => prev.filter(it => it.id !== id));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }, [endpoint]);

  return { items, create, update, remove, loading, error, setItems, refresh: fetchItems };
}
