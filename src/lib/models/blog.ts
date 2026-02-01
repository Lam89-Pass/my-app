import { supabase } from '../database/supabase';

export const BlogModel = {
  async getAll() {
    const { data, error } = await supabase
      .from('blogs') 
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Supabase Error:", error.message);
      return []; 
    }

    return data || []; 
  }
};