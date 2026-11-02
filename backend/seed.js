require('dotenv').config();
const { supabase } = require('./src/config/supabase');

const menuItems = [
  {
    name: 'Hyderabadi Kacchi Biryani',
    description: 'Mutton dum biryani in an open brass handi, lid set aside. Kachchi style with saffron.',
    price: 360,
    category: 'biryani',
    image_url: '',
    is_available: true,
    is_veg: false,
    is_spicy: true,
    preparation_time: 30,
  },
  {
    name: 'Lucknowi Awadhi Biryani',
    description: 'Awadhi biryani in a copper handi with the brass lid set aside. Mutton, kewra, ittar.',
    price: 380,
    category: 'biryani',
    image_url: '',
    is_available: true,
    is_veg: false,
    is_spicy: false,
    preparation_time: 28,
  },
  {
    name: 'Kolkata Biryani',
    description: 'Kolkata mutton biryani on a steel plate with potato and egg.',
    price: 340,
    category: 'biryani',
    image_url: '',
    is_available: true,
    is_veg: false,
    is_spicy: false,
    preparation_time: 25,
  },
  {
    name: 'Ambur Biryani',
    description: 'Ambur-style biryani served on a fresh banana leaf. Short grain, red chilli.',
    price: 320,
    category: 'biryani',
    image_url: '',
    is_available: true,
    is_veg: false,
    is_spicy: true,
    preparation_time: 26,
  },
  {
    name: 'Kathal Biryani',
    description: 'Vegetable biryani with jackfruit and cashews in a copper bowl.',
    price: 280,
    category: 'biryani',
    image_url: '',
    is_available: true,
    is_veg: true,
    is_spicy: false,
    preparation_time: 22,
  },
  {
    name: 'Murgh Biryani',
    description: 'Chicken biryani with a leg piece on a steel plate.',
    price: 310,
    category: 'biryani',
    image_url: '',
    is_available: true,
    is_veg: false,
    is_spicy: true,
    preparation_time: 24,
  },
  {
    name: 'Seekh Kebab',
    description: 'Mutton seekh kebab, six pieces, onion, lemon.',
    price: 320,
    category: 'kebab',
    image_url: '',
    is_available: true,
    is_veg: false,
    is_spicy: true,
    preparation_time: 15,
  },
  {
    name: 'Galouti Kebab',
    description: 'Mutton mince galouti on sheermal underneath.',
    price: 380,
    category: 'kebab',
    image_url: '',
    is_available: true,
    is_veg: false,
    is_spicy: false,
    preparation_time: 18,
  },
  {
    name: 'Nihari',
    description: 'Sunday only, six hours, nalli. Slow-cooked mutton stew.',
    price: 420,
    category: 'curry',
    image_url: '',
    is_available: true,
    is_veg: false,
    is_spicy: true,
    preparation_time: 40,
  },
  {
    name: 'Roomali Roti',
    description: 'Thin enough to read through.',
    price: 40,
    category: 'bread',
    image_url: '',
    is_available: true,
    is_veg: true,
    is_spicy: false,
    preparation_time: 5,
  },
  {
    name: 'Kadak Chai',
    description: 'Cutting chai, in a glass.',
    price: 40,
    category: 'drink',
    image_url: '',
    is_available: true,
    is_veg: true,
    is_spicy: false,
    preparation_time: 3,
  },
  {
    name: 'Shahi Tukda',
    description: 'Rabri, pistachio, cold.',
    price: 220,
    category: 'dessert',
    image_url: '',
    is_available: true,
    is_veg: true,
    is_spicy: false,
    preparation_time: 8,
  },
];

const seed = async () => {
  try {
    // 1. Insert menu items
    await supabase.from('menu_items').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    const { error: menuError } = await supabase.from('menu_items').insert(menuItems);
    if (menuError) throw menuError;
    console.log(`Inserted ${menuItems.length} menu items`);

    // 2. Create admin user via Supabase Auth admin API
    const { data: adminUser, error: adminError } = await supabase.auth.admin.createUser({
      email: 'admin@dum.delhi',
      password: 'Admin123!',
      user_metadata: { name: 'Admin', role: 'admin' },
      email_confirm: true,
    });
    if (adminError) {
      // If already exists, that's fine
      if (!adminError.message.includes('already registered')) throw adminError;
      console.log('Admin user already exists');
    } else {
      console.log('Admin user created:', adminUser.user.id);
    }

    // 3. Create customer user
    const { data: custUser, error: custError } = await supabase.auth.admin.createUser({
      email: 'customer@dum.delhi',
      password: 'Customer123!',
      user_metadata: { name: 'Customer', role: 'customer' },
      email_confirm: true,
    });
    if (custError) {
      if (!custError.message.includes('already registered')) throw custError;
      console.log('Customer user already exists');
    } else {
      console.log('Customer user created:', custUser.user.id);
    }

    console.log('Database seeded successfully');
    console.log('Admin:    admin@dum.delhi   / Admin123!');
    console.log('Customer: customer@dum.delhi / Customer123!');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
};

seed();
