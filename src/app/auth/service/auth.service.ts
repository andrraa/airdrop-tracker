import { inject, Injectable } from '@angular/core';
import {
  Session,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
  User,
} from '@supabase/supabase-js';
import { SupabaseService } from '../../services/supabase/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  supabase = inject(SupabaseService).client;

  async signUp(
    data: SignUpWithPasswordCredentials
  ): Promise<{ user: User | null; session: Session | null }> {
    const { data: result, error } = await this.supabase.auth.signUp(data);

    if (error) {
      throw error;
    }

    return result;
  }

  async signIn(
    data: SignInWithPasswordCredentials
  ): Promise<{ session: Session | null }> {
    const { data: result, error } = await this.supabase.auth.signInWithPassword(
      data
    );

    if (error) {
      throw error;
    }

    return result;
  }

  async session(): Promise<Session | null> {
    const { data, error } = await this.supabase.auth.getSession();

    if (error) {
      throw error;
    }

    return data.session;
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();

    if (error) {
      throw error;
    }
  }
}
