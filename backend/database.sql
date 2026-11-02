-- ============================================================================
-- DUM — Biryani & Bar  |  Supabase schema
-- Run this in the Supabase SQL Editor (https://app.supabase.com/project/_/sql)
-- ============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ---------------------------------------------------------------------------
-- menu_items
-- ---------------------------------------------------------------------------
create table if not exists menu_items (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  price numeric(10, 2) not null check (price >= 0),
  category text check (category in ('biryani','kebab','curry','bread','rice','drink','dessert')),
  image_url text default '',
  is_available boolean default true,
  is_veg boolean default false,
  is_spicy boolean default false,
  preparation_time integer default 20 check (preparation_time >= 0),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- orders
-- ---------------------------------------------------------------------------
create table if not exists orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete set null,
  total_amount numeric(10, 2) not null check (total_amount >= 0),
  status text check (status in ('pending','confirmed','preparing','ready','delivered','cancelled')) default 'pending',
  delivery_address jsonb default '{}'::jsonb,
  payment_status text check (payment_status in ('pending','paid','failed','refunded')) default 'pending',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- order_items
-- ---------------------------------------------------------------------------
create table if not exists order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references orders(id) on delete cascade,
  menu_item_id uuid references menu_items(id) on delete set null,
  name text not null,
  price numeric(10, 2) not null,
  quantity integer not null default 1 check (quantity >= 1),
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------
create index if not exists idx_menu_items_category on menu_items(category);
create index if not exists idx_menu_items_available on menu_items(is_available);
create index if not exists idx_orders_user_id on orders(user_id);
create index if not exists idx_orders_status on orders(status);
create index if not exists idx_order_items_order_id on order_items(order_id);

-- ---------------------------------------------------------------------------
-- Row Level Security (RLS)
-- ---------------------------------------------------------------------------
alter table menu_items enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

-- Menu: public read, service role writes (server-side Express app)
create policy "Menu items are viewable by everyone"
  on menu_items for select using (true);

create policy "Menu items are manageable by service role"
  on menu_items for all using (true) with check (true);

-- Orders: users see their own; service role manages all
create policy "Users can view their own orders"
  on orders for select using (auth.uid() = user_id);

create policy "Users can insert their own orders"
  on orders for insert with check (auth.uid() = user_id);

create policy "Service role can manage all orders"
  on orders for all using (true) with check (true);

-- Order items: users see items on their own orders; service role manages all
create policy "Users can view their own order items"
  on order_items for select using (
    exists (
      select 1 from orders
      where id = order_items.order_id
        and user_id = auth.uid()
    )
  );

create policy "Users can insert their own order items"
  on order_items for insert with check (
    exists (
      select 1 from orders
      where id = order_items.order_id
        and user_id = auth.uid()
    )
  );

create policy "Service role can manage all order items"
  on order_items for all using (true) with check (true);

-- ---------------------------------------------------------------------------
-- Realtime (optional) — enable replication for live updates
-- ---------------------------------------------------------------------------
alter publication supabase_realtime add table menu_items;
alter publication supabase_realtime add table orders;
alter publication supabase_realtime add table order_items;

-- ============================================================================
-- Done. Next steps:
-- 1. Copy .env.example to .env and add your Supabase URL + keys
-- 2. Run `npm run seed` to populate menu items + create test users
-- ============================================================================
