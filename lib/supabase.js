import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Returns null if env vars aren't set — app falls back to localStorage
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

/*
  ─────────────────────────────────────────────────────────────────
  Supabase setup instructions (run once in your Supabase SQL editor)
  ─────────────────────────────────────────────────────────────────

  -- Cart items
  create table cart_items (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade,
    product_id text not null,
    quantity int not null default 1,
    created_at timestamptz default now(),
    unique(user_id, product_id)
  );

  -- Wishlists
  create table wishlist_items (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade,
    product_id text not null,
    created_at timestamptz default now(),
    unique(user_id, product_id)
  );

  -- Orders
  create table orders (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete set null,
    items jsonb not null,
    shipping jsonb not null,
    subtotal numeric not null,
    delivery_fee numeric not null,
    total numeric not null,
    status text not null default 'confirmed',
    created_at timestamptz default now()
  );

  -- Enable RLS on all tables
  alter table cart_items enable row level security;
  alter table wishlist_items enable row level security;
  alter table orders enable row level security;

  -- RLS policies (users can only see their own data)
  create policy "Own cart" on cart_items for all using (auth.uid() = user_id);
  create policy "Own wishlist" on wishlist_items for all using (auth.uid() = user_id);
  create policy "Own orders" on orders for all using (auth.uid() = user_id);

  ─────────────────────────────────────────────────────────────────
  Add to your .env.local:
    NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
  ─────────────────────────────────────────────────────────────────
*/
