import { supabase } from '../database/supabase';

export const ContactModel = {
  async saveMessage(messageData: { name: string; email: string; message: string }) {
    const { data, error } = await supabase
      .from('contacts')
      .insert([messageData])
      .select();
    if (error) throw error;
    return data;
  },

  async getMessages() {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }
};