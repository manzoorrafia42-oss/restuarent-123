/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  UtensilsCrossed,
  Sparkles,
  ShoppingBag,
  Clock,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Flame,
  Volume2,
  VolumeX,
  X,
  Check,
  Star,
  Calendar,
  Users,
  Eye,
  Plus,
  Minus,
  ArrowRight,
  Phone,
  Mail,
  Award,
  ChefHat,
  Search,
  Instagram,
  Facebook,
  Twitter,
  ArrowUpRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Category Types
type MenuCategory = 'All' | 'Mains' | 'Soups & Noodles' | 'Dim Sum' | 'Desserts' | 'Drinks';

interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  rating: number;
  reviewsCount: number;
  calories?: string;
  badge?: string;
  description: string;
  story: string;
  ingredients: string[];
  image: string;
  isSpicy?: boolean;
}

const MENU_ITEMS: MenuItem[] = [
  // ================= MAINS =================
  {
    id: 'sichuan-wagyu-bowl',
    name: 'Sichuan Wagyu Wok Bowl',
    category: 'Mains',
    price: 28.50,
    rating: 5.0,
    reviewsCount: 189,
    calories: '620 kcal',
    badge: 'Trending',
    description: 'A5 Miyazaki Wagyu beef cubes flash-seared with lantern chili pods, roasted golden peanuts, and numbing Sichuan glaze.',
    story: 'Intense wok hei heat exceeding 700°F locks in the marbling sweetness of Wagyu, paired with tingling Sichuan pepper aromatics.',
    ingredients: ['A5 Miyazaki Wagyu', 'Lantern Chilis', 'Roasted Peanuts', 'Sichuan Peppercorns', 'Lotus Root'],
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=85',
    isSpicy: true
  },
  {
    id: 'dragon-eel-roll',
    name: 'Flamed Dragon Eel Roll',
    category: 'Mains',
    price: 24.00,
    rating: 4.9,
    reviewsCount: 165,
    calories: '480 kcal',
    badge: 'Popular',
    description: 'Crispy tempura prawn and creamy avocado draped with torched unagi eel, sweet kabayaki glaze, and flying fish roe.',
    story: 'Lightly charred tableside over binchotan charcoal for an unforgettable smoky umami fragrance.',
    ingredients: ['Freshwater Eel', 'Tempura Prawn', 'Avocado', 'Tobiko Caviar', 'Kabayaki Glaze'],
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },
  {
    id: 'kung-pao-cashew-chicken',
    name: 'Kung Pao Crispy Chicken',
    category: 'Mains',
    price: 22.00,
    rating: 4.9,
    reviewsCount: 146,
    calories: '550 kcal',
    badge: "Chef's Pick",
    description: 'Crisp free-range chicken wok-tossed with dried red peppers, toasted whole cashews, scallions, and tangy brown sauce.',
    story: 'A classic dynasty recipe balancing sweet vinegar notes with gentle lantern chili heat and roasted crunch.',
    ingredients: ['Free-Range Chicken', 'Toasted Cashews', 'Dry Red Chilis', 'Sichuan Pepper', 'Scallions'],
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=85',
    isSpicy: true
  },
  {
    id: 'beijing-roast-duck',
    name: 'Crispy Imperial Roast Duck',
    category: 'Mains',
    price: 32.00,
    rating: 5.0,
    reviewsCount: 210,
    calories: '680 kcal',
    badge: 'Signature',
    description: 'Dry-aged roasted duck breast with honey-glazed crackling skin, served with paper-thin handmade crepes and hoisin glaze.',
    story: 'Air-dried for 48 hours and slow-roasted in fruitwood ovens for the crispiest aromatic skin imaginable.',
    ingredients: ['Dry-Aged Duck Breast', 'Handmade Crepes', 'Sweet Hoisin', 'Cucumber Ribbons', 'Spring Onions'],
    image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },
  {
    id: 'teriyaki-atlantic-salmon',
    name: 'Glazed Atlantic Salmon Wok',
    category: 'Mains',
    price: 26.50,
    rating: 4.8,
    reviewsCount: 104,
    calories: '510 kcal',
    description: 'Pan-seared Atlantic salmon fillet glazed with ginger-mirin teriyaki sauce over steamed jasmine rice and baby bok choy.',
    story: 'Wild-caught salmon seared skin-down for optimal crispness, finished with aged 5-year sweet mirin reduction.',
    ingredients: ['Atlantic Salmon', 'House Teriyaki', 'Baby Bok Choy', 'Sesame Seeds', 'Jasmine Rice'],
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },
  {
    id: 'korean-bulgogi-ribs',
    name: 'Korean BBQ Bulgogi Short Ribs',
    category: 'Mains',
    price: 29.00,
    rating: 4.9,
    reviewsCount: 138,
    calories: '670 kcal',
    badge: 'Trending',
    description: 'Prime marinated flanken-cut short ribs char-grilled with sweet pear soy marinade, sesame oil, and house-made kimchi.',
    story: 'Tenderized naturally with Korean Asian pears and charred over white charcoal for a sweet smoky bark.',
    ingredients: ['Prime Beef Short Ribs', 'Asian Pear Soy', 'Toasted Sesame', 'Charred Garlic', 'Aged Kimchi'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },
  {
    id: 'sweet-sour-seabass',
    name: 'Crispy Skin Sweet & Sour Seabass',
    category: 'Mains',
    price: 27.00,
    rating: 4.8,
    reviewsCount: 89,
    calories: '490 kcal',
    description: 'Fresh Chilean seabass fillet lightly tempura-battered, coated in natural pineapple reduction, lotus crisps, and bell peppers.',
    story: 'Traditional squirrel fish technique that creates a blossoming floral texture, bursting with balanced tang.',
    ingredients: ['Chilean Seabass', 'Pineapple Puree', 'Lotus Root', 'Tangerine Peel', 'Bell Peppers'],
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },
  {
    id: 'stirred-egg-greens',
    name: 'Stirred Egg & Garden Greens',
    category: 'Mains',
    price: 14.50,
    rating: 4.9,
    reviewsCount: 95,
    calories: '320 kcal',
    description: 'Pasture-raised eggs folded with vine tomatoes, snow peas, scallion oil, and tender wok-tossed bok choy greens.',
    story: 'A timeless comfort classic celebrating pure, honest farm ingredients and delicate wok control.',
    ingredients: ['Pasture Eggs', 'Vine Tomatoes', 'Scallion Oil', 'Snow Peas', 'Bok Choy'],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },
  {
    id: 'crispy-glazed-chops',
    name: 'Glazed Imperial Pork Chops',
    category: 'Mains',
    price: 25.50,
    rating: 4.8,
    reviewsCount: 114,
    calories: '590 kcal',
    description: 'Crisp Berkshire chops caramelized with 10-year aged Chinkiang vinegar, blossom honey, and toasted sesame crunch.',
    story: 'Slow-braised for six hours then flash-crisped to create an unctuous, glossy sweet-and-sour glaze.',
    ingredients: ['Berkshire Pork Chops', 'Chinkiang Aged Vinegar', 'Wild Honey', 'Fried Garlic', 'Toasted Sesame'],
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },
  {
    id: 'crispy-orange-beef',
    name: 'Crispy Tangerine Peel Prime Beef',
    category: 'Mains',
    price: 26.00,
    rating: 4.9,
    reviewsCount: 142,
    calories: '590 kcal',
    badge: "Chef's Pick",
    description: 'Crisp hand-cut prime flank steak caramelized in sun-dried aged tangerine peel glaze, toasted sesame, and chili pods.',
    story: 'Tossed with 15-year aged Xinhui chenpi tangerine peels for an extraordinary aromatic citrus perfume.',
    ingredients: ['Prime Flank Steak', '15-Year Sun-Dried Chenpi', 'Chili Pods', 'Sweet Ginger Glaze', 'Scallions'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85',
    isSpicy: true
  },
  {
    id: 'char-siu-bbq-pork',
    name: 'Honey Glazed Berkshire Char Siu',
    category: 'Mains',
    price: 25.00,
    rating: 5.0,
    reviewsCount: 168,
    calories: '610 kcal',
    badge: 'Signature',
    description: 'Tender Berkshire pork collar marinated in fermented red bean curd, aged soy, and basted with raw wild flower honey.',
    story: 'Roasted over red fruitwood until mahogany char forms at the edges while the interior stays succulent.',
    ingredients: ['Berkshire Pork Collar', 'Fermented Red Beancurd', 'Raw Wild Honey', 'Five Spice', 'Maltose Glaze'],
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },
  {
    id: 'mongolian-sizzling-lamb',
    name: 'Sizzling Mongolian Cumin Lamb',
    category: 'Mains',
    price: 27.50,
    rating: 4.8,
    reviewsCount: 119,
    calories: '640 kcal',
    badge: 'Popular',
    description: 'Thinly sliced tender lamb shoulder flash-tossed on high fire with roasted Xinjiang cumin, scallions, and crushed chilies.',
    story: 'Inspired by Silk Road trade routes, combining fragrant toasted cumin seeds with the natural richness of grass-fed lamb.',
    ingredients: ['Grass-Fed Lamb', 'Whole Xinjiang Cumin', 'Leek Ribbons', 'Crushed Chili', 'Shaoxing Wine'],
    image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=800&q=85',
    isSpicy: true
  },
  {
    id: 'general-tso-chicken',
    name: 'Imperial General Tso Chicken',
    category: 'Mains',
    price: 21.50,
    rating: 4.9,
    reviewsCount: 184,
    calories: '530 kcal',
    badge: 'Trending',
    description: 'Golden shatter-crisp chicken thigh tossed in tangy ginger-garlic reduction with toasted sesame seeds and fresh broccoli crowns.',
    story: 'Double-fried for the ultimate crunch that holds the glossy sweet-savory glaze without becoming soggy.',
    ingredients: ['Free-Range Chicken Thighs', 'Aged Chinkiang Glaze', 'Steamed Broccoli', 'Fresh Ginger', 'Sesame'],
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=85',
    isSpicy: true
  },
  {
    id: 'golden-claypot-tofu',
    name: 'Golden Wild Mushroom Claypot Tofu',
    category: 'Mains',
    price: 18.00,
    rating: 4.8,
    reviewsCount: 97,
    calories: '380 kcal',
    badge: 'Vegetarian',
    description: 'Silken egg tofu pillows braised in rich savory mushroom jus with fresh king oyster, shiitake, and tender snow peas.',
    story: 'Slow-simmered in earthen clay pots that retain gentle bubbling heat, infusing forest mushroom aroma into soft tofu.',
    ingredients: ['Silken Egg Tofu', 'King Oyster Mushrooms', 'Wild Shiitake', 'Snow Peas', 'Vegetarian Oyster Sauce'],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },

  // ================= SOUPS & NOODLES =================
  {
    id: 'dan-dan-noodles',
    name: 'Heritage Dan Dan Noodles',
    category: 'Soups & Noodles',
    price: 19.00,
    rating: 4.8,
    reviewsCount: 120,
    calories: '530 kcal',
    badge: "Chef's Pick",
    description: 'Springy hand-pulled noodles tossed in toasted sesame paste, crispy spiced pork mince, and pickled mustard greens.',
    story: 'A legendary Chengdu street delicacy, balancing savory nutty sesame with handcrafted 14-spice chili oil.',
    ingredients: ['Hand-Pulled Noodles', 'Minced Berkshire Pork', 'Sesame Puree', 'Sui Mi Ya Cai', 'Chili Crisp'],
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=85',
    isSpicy: true
  },
  {
    id: 'tokyo-shoyu-ramen',
    name: 'Slow-Simmered Tonkotsu Ramen',
    category: 'Soups & Noodles',
    price: 21.50,
    rating: 4.9,
    reviewsCount: 178,
    calories: '610 kcal',
    badge: 'Trending',
    description: '20-hour rich pork marrow broth with rolled chashu pork belly, marinated ramen egg, menma bamboo shoots, and nori.',
    story: 'Simmered continuously overnight for a velvety collagen-rich broth that coats every strand of artisanal noodle.',
    ingredients: ['Tonkotsu Broth', 'Rolled Chashu', 'Ajitsuke Tamago', 'Menma', 'Spring Onions', 'Black Garlic Oil'],
    image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },
  {
    id: 'spicy-seafood-udon',
    name: 'Spicy Seafood Udon Wok',
    category: 'Soups & Noodles',
    price: 23.00,
    rating: 4.9,
    reviewsCount: 112,
    calories: '540 kcal',
    badge: 'Popular',
    description: 'Thick Sanuki udon noodles bathed in fiery red dashi broth with jumbo tiger prawns, blue crab, and fresh calamari.',
    story: 'Handcrafted Japanese wheat noodles with signature springy chew, soaked in sweet seafood broth.',
    ingredients: ['Sanuki Udon', 'Tiger Prawns', 'Calamari', 'Red Miso', 'Shiitake Mushrooms', 'Bok Choy'],
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=85',
    isSpicy: true
  },
  {
    id: 'taiwanese-beef-noodle',
    name: 'Taiwanese Braised Beef Soup',
    category: 'Soups & Noodles',
    price: 20.50,
    rating: 5.0,
    reviewsCount: 164,
    calories: '580 kcal',
    badge: 'Signature',
    description: 'Melt-in-your-mouth beef shank and tendon slow-stewed with star anise, Sichuan bean paste, and hand-cut wide wheat noodles.',
    story: 'Cooked with eight aromatic medicinal spices for 12 hours until the beef shank breaks with a spoon.',
    ingredients: ['Braised Beef Shank', 'Beef Tendon', 'Star Anise Broth', 'Pickled Mustard Greens', 'Wide Noodles'],
    image: 'https://images.unsplash.com/photo-1594998893017-36147cbcae05?auto=format&fit=crop&w=800&q=85',
    isSpicy: true
  },
  {
    id: 'hong-kong-wonton-soup',
    name: 'Hong Kong Prawn Wonton Soup',
    category: 'Soups & Noodles',
    price: 17.50,
    rating: 4.8,
    reviewsCount: 98,
    calories: '390 kcal',
    description: 'Thin egg noodles in fragrant dried flounder broth, topped with plump whole-shrimp wontons and yellow chives.',
    story: 'Traditional Canton staple: bouncy egg noodles boiled in mineral water and plunged into ice water for crisp snap.',
    ingredients: ['Handmade Prawn Wontons', 'Duck Egg Noodles', 'Flounder Broth', 'Yellow Garlic Chives', 'Sesame Oil'],
    image: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },
  {
    id: 'singapore-laksa',
    name: 'Spicy Singapore Coconut Laksa',
    category: 'Soups & Noodles',
    price: 19.50,
    rating: 4.9,
    reviewsCount: 129,
    calories: '560 kcal',
    description: 'Rich spiced coconut curry soup with rice vermicelli, lemongrass chicken, fried tofu puffs, and quail eggs.',
    story: 'Peranakan culinary triumph fusing Malay rempah spices with creamy coconut milk and fresh laksa leaves.',
    ingredients: ['Coconut Curry Broth', 'Rice Vermicelli', 'Lemongrass Chicken', 'Tofu Puffs', 'Boiled Eggs', 'Chili Sambal'],
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=85',
    isSpicy: true
  },
  {
    id: 'pad-thai-wok',
    name: 'Artisanal Tamarind Tiger Prawn Pad Thai',
    category: 'Soups & Noodles',
    price: 22.50,
    rating: 4.9,
    reviewsCount: 156,
    calories: '560 kcal',
    badge: 'Popular',
    description: 'Chewy rice noodles wok-charred with wild jumbo prawns, pressed organic tofu, garlic chives, crushed peanuts, and tart tamarind pulp.',
    story: 'Balanced around the four cornerstones of Thai flavor: salty fish sauce, sweet palm sugar, tart tamarind, and spicy chili.',
    ingredients: ['Jumbo Tiger Prawns', 'Chanthaburi Rice Noodles', 'Fresh Tamarind Puree', 'Roasted Peanuts', 'Garlic Chives'],
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=85',
    isSpicy: true
  },
  {
    id: 'tom-yum-goong',
    name: 'Royal Lemongrass Tom Yum Goong',
    category: 'Soups & Noodles',
    price: 20.00,
    rating: 5.0,
    reviewsCount: 172,
    calories: '390 kcal',
    badge: 'Signature',
    description: 'Aromatic spicy and sour prawn broth infused with crushed lemongrass stalks, fresh galangal, kaffir lime leaves, and straw mushrooms.',
    story: 'Simmered with roasted prawn heads for deep coral oil, finished with freshly squeezed lime juice right before serving.',
    ingredients: ['Head-On Prawns', 'Bruised Lemongrass', 'Fresh Galangal', 'Kaffir Lime Leaves', 'Chili Jam'],
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=85',
    isSpicy: true
  },
  {
    id: 'scallion-oil-noodles',
    name: 'Shanghainese Scallion Oil Tossed Noodles',
    category: 'Soups & Noodles',
    price: 15.50,
    rating: 4.8,
    reviewsCount: 104,
    calories: '420 kcal',
    description: 'Artisanal hand-pulled noodles coated in slow-caramelized scallion aroma oil, toasted dried shrimp, and sweet dark soy.',
    story: 'Whole bunches of young green scallions are gently rendered in oil until golden crispy, creating an irreplaceable umami depth.',
    ingredients: ['Fresh Wheat Noodles', 'Crisp Caramelized Scallions', 'Golden Scallion Oil', 'Aged Soy', 'Dried Baby Shrimp'],
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },
  {
    id: 'kimchi-seafood-ramen',
    name: 'Spicy Kimchi Seafood Claypot Ramen',
    category: 'Soups & Noodles',
    price: 21.00,
    rating: 4.9,
    reviewsCount: 133,
    calories: '530 kcal',
    description: 'Fiery aged kimchi broth with chewy wavy noodles, Manila clams, squid rings, and soft-poached pasture egg.',
    story: 'Features 6-month naturally fermented napa cabbage kimchi cooked with gochugaru pepper for hearty, revitalizing warmth.',
    ingredients: ['Aged Napa Kimchi', 'Manila Clams', 'Tender Calamari', 'Gochugaru Broth', 'Wavy Ramen Noodles'],
    image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=85',
    isSpicy: true
  },

  // ================= DIM SUM =================
  {
    id: 'truffle-dim-sum',
    name: '19-Pleat Truffle Dim Sum',
    category: 'Dim Sum',
    price: 18.50,
    rating: 4.9,
    reviewsCount: 142,
    calories: '360 kcal',
    badge: "Chef's Pick",
    description: 'Silky dough parcels filled with Kurobuta pork, wild black truffle, and rich ginger bone broth, pleated by master hands.',
    story: 'Crafted with master folding technique passed down three generations, infused with fragrant Périgord truffle essence.',
    ingredients: ['Kurobuta Pork', 'Black Truffle', 'Ginger Broth', 'Water Chestnut', 'Spring Onions'],
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },
  {
    id: 'emerald-har-gow',
    name: 'Crystal Emerald Har Gow',
    category: 'Dim Sum',
    price: 16.00,
    rating: 4.9,
    reviewsCount: 88,
    calories: '280 kcal',
    badge: 'Popular',
    description: 'Translucent tapioca wrappers enfolding plump tiger prawns, bamboo shoots, and fragrant white pepper oil.',
    story: 'Master dim sum test: delicate translucent pleated skins that remain tender without tearing.',
    ingredients: ['Tiger Prawns', 'Bamboo Shoots', 'Sesame Oil', 'Wheat Starch Wrapper', 'Ginger Wine'],
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },
  {
    id: 'char-siu-bao',
    name: 'Steamed Honey Char Siu Bao',
    category: 'Dim Sum',
    price: 14.00,
    rating: 4.8,
    reviewsCount: 110,
    calories: '340 kcal',
    description: 'Pillow-soft steamed yeast buns stuffed with sweet caramelized barbecue pork and aged dark soy glaze.',
    story: 'Fluffy cloud texture achieved by double-fermenting wheat flour, bursting open at the top with fragrant filling.',
    ingredients: ['Berkshire Pork Char Siu', 'Oyster Glaze', 'Fermented Dough', 'Shallots', 'Honey'],
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },
  {
    id: 'crispy-spring-rolls',
    name: 'Crispy Crab & Shiitake Spring Rolls',
    category: 'Dim Sum',
    price: 13.50,
    rating: 4.8,
    reviewsCount: 94,
    calories: '290 kcal',
    description: 'Golden shatter-crisp pastry rolled with sweet lump crab meat, wild shiitake mushrooms, and glass noodles.',
    story: 'Hand-rolled in wafer-thin pastry sheets and flash-fried to golden perfection, served with sweet plum dipping glaze.',
    ingredients: ['Lump Crab Meat', 'Shiitake Mushrooms', 'Glass Noodles', 'Carrots', 'Plum Dip'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },
  {
    id: 'xiao-long-bao-soup',
    name: 'Shanghai Heritage Xiao Long Bao',
    category: 'Dim Sum',
    price: 17.00,
    rating: 5.0,
    reviewsCount: 220,
    badge: 'Signature',
    description: 'Delicate soup dumplings filled with seasoned pork and piping hot golden chicken broth, dipped in black vinegar and ginger.',
    story: 'The soup is folded inside as chilled gelatin broth that melts into rich liquid upon steaming in bamboo baskets.',
    ingredients: ['Pork Mince', 'Rich Chicken Collagen Broth', 'Fresh Ginger', 'Chinkiang Black Vinegar'],
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },
  {
    id: 'pan-fried-gyoza',
    name: 'Pan-Fried Crispy Potstickers',
    category: 'Dim Sum',
    price: 15.00,
    rating: 4.9,
    reviewsCount: 130,
    description: 'Golden-crusted gyoza with crispy lace lattice skirts, filled with garlic chives, minced pork, and sesame.',
    story: 'Steamed and pan-crisped simultaneously with cornstarch slurry to create an intricate web-like crunchy lattice.',
    ingredients: ['Berkshire Pork', 'Garlic Chives', 'Sesame Oil', 'Crispy Lace Skirt', 'Spicy Soy Vinegar'],
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },
  {
    id: 'siu-mai-golden',
    name: 'Golden Roe Pork & Prawn Siu Mai',
    category: 'Dim Sum',
    price: 15.50,
    rating: 4.9,
    reviewsCount: 160,
    badge: 'Popular',
    description: 'Open-topped steamed dumplings crammed with hand-diced Berkshire pork, sweet wild shrimp, and crowned with orange tobiko caviar.',
    story: 'Hand-chopped instead of ground to retain a vibrant, juicy bounce in every single bite.',
    ingredients: ['Berkshire Pork Belly', 'Wild Tiger Prawns', 'Shiitake Caps', 'Tobiko Caviar', 'Yellow Wonton Skin'],
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },
  {
    id: 'crispy-cheung-fun',
    name: 'Crispy Net Prawn Rice Roll (Cheung Fun)',
    category: 'Dim Sum',
    price: 16.50,
    rating: 4.9,
    reviewsCount: 114,
    badge: "Chef's Pick",
    description: 'Silky smooth steamed rice sheet wrapped around a crunchy golden netted roll of shrimp, drizzled with sweet seasoned soy.',
    story: 'The ultimate contrast: feather-soft steamed rice rolls on the outside with explosive shatter-crunch inside.',
    ingredients: ['Stone-Ground Rice Batter', 'Crispy Golden Netting', 'Whole Tiger Prawns', 'Sweet Dim Sum Soy'],
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },
  {
    id: 'lo-mai-gai',
    name: 'Lotus Leaf Wrapped Sticky Rice (Lo Mai Gai)',
    category: 'Dim Sum',
    price: 14.50,
    rating: 4.8,
    reviewsCount: 96,
    description: 'Fragrant glutinous rice steamed inside natural lotus leaves with marinated chicken, salted egg yolk, lap cheong sausage, and shiitake.',
    story: 'Infused with the distinct herbal tea aroma of sun-cured lotus leaves as it steams in bamboo baskets for hours.',
    ingredients: ['Sweet Glutinous Rice', 'Salted Duck Egg Yolk', 'Lap Cheong Sausage', 'Chicken Thigh', 'Cured Lotus Leaf'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },
  {
    id: 'scallop-chive-dumpling',
    name: 'Pan-Seared Scallop & Emerald Chive Dumplings',
    category: 'Dim Sum',
    price: 17.50,
    rating: 5.0,
    reviewsCount: 108,
    badge: 'Signature',
    description: 'Plump Hokkaido sea scallops and vibrant flat chives pan-crisped to golden translucency with garlic dipping oil.',
    story: 'Sashimi-grade sweet scallops folded in handmade crystal dough and seared on cast iron.',
    ingredients: ['Hokkaido Scallops', 'Emerald Chinese Chives', 'Sesame Pepper Oil', 'Crystal Tapioca Skin'],
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },

  // ================= DESSERTS =================
  {
    id: 'matcha-lava-fondant',
    name: 'Matcha Lava & Sesame Fondant',
    category: 'Desserts',
    price: 14.00,
    rating: 5.0,
    reviewsCount: 153,
    calories: '340 kcal',
    badge: "Chef's Pick",
    description: 'Uji ceremonial green tea cake with flowing warm white chocolate core and roasted black sesame gelato.',
    story: 'Made with first-harvest Kyoto Uji matcha, delivering gentle vegetal bitterness balanced by velvety cream.',
    ingredients: ['Uji Matcha', 'Valrhona White Chocolate', 'Black Sesame Gelato', 'Honey Tuile', 'Edible Gold'],
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },
  {
    id: 'mango-pomelo-sago',
    name: 'Chilled Mango Pomelo Sago',
    category: 'Desserts',
    price: 12.50,
    rating: 4.8,
    reviewsCount: 92,
    calories: '260 kcal',
    badge: 'Popular',
    description: 'Fresh Alfonso mango purée layered with chewy tapioca pearls, sweet coconut nectar, and Ruby Red pomelo sacs.',
    story: 'Hong Kong summer staple: creamy, vibrant, and cooling after a multi-course banquet.',
    ingredients: ['Alfonso Mango', 'Coconut Milk', 'Sago Pearls', 'Ruby Pomelo', 'Cane Sugar'],
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },
  {
    id: 'japanese-souffle-cheesecake',
    name: 'Japanese Cotton Soufflé Cake',
    category: 'Desserts',
    price: 13.50,
    rating: 4.9,
    reviewsCount: 115,
    description: 'Airy, melt-in-your-mouth cloud cheesecake served with yuzu berry compote and powdered sugar dusting.',
    story: 'Whipped egg whites folded gently into Hokkaido cream cheese, baked in water baths for an angelic wobble.',
    ingredients: ['Hokkaido Cream Cheese', 'Pasture Eggs', 'Yuzu Berry Coulis', 'Fresh Raspberries'],
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },
  {
    id: 'sesame-jian-dui',
    name: 'Golden Sesame Red Bean Balls',
    category: 'Desserts',
    price: 10.50,
    rating: 4.7,
    reviewsCount: 78,
    description: 'Crisp glutinous rice dough balls encrusted with toasted white sesame, filled with warm velvety red bean paste.',
    story: 'Traditional celebratory dessert puffed in hot oil until expanding into hollow golden spheres with chewy centers.',
    ingredients: ['Glutinous Rice Flour', 'Red Adzuki Bean Paste', 'Toasted Sesame', 'Brown Cane Sugar'],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },
  {
    id: 'mango-sticky-rice',
    name: 'Coconut Pandan Mango Sticky Rice',
    category: 'Desserts',
    price: 13.00,
    rating: 4.9,
    reviewsCount: 134,
    calories: '320 kcal',
    description: 'Pandan-infused sweet coconut sticky rice topped with sliced golden Thai mango and roasted mung beans.',
    story: 'Fragrant pandan leaf juice steamed into sweet glutinous rice, drizzled with salty-sweet salted coconut cream.',
    ingredients: ['Thai Sweet Mango', 'Pandan Sticky Rice', 'Warm Coconut Cream', 'Crispy Mung Beans'],
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },
  {
    id: 'hk-egg-tarts',
    name: 'Dan Tat Cantonese Baked Egg Tarts',
    category: 'Desserts',
    price: 11.00,
    rating: 4.9,
    reviewsCount: 140,
    calories: '290 kcal',
    badge: 'Trending',
    description: 'Flaky 64-layer laminated puff pastry shells holding silky, wobbly sweet golden egg custard served piping warm.',
    story: 'Our pastry masters fold chilled butter and dough sixteen times to produce gossamer-crisp layers that melt instantly.',
    ingredients: ['Pasture Egg Custard', 'Laminated Puff Pastry', 'Whole Milk', 'Pure Cane Sugar', 'Madagascar Vanilla'],
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },
  {
    id: 'matcha-crepe-cake',
    name: 'Mille Crêpe Uji Matcha Layer Cake',
    category: 'Desserts',
    price: 14.50,
    rating: 5.0,
    reviewsCount: 165,
    calories: '360 kcal',
    badge: "Chef's Pick",
    description: 'Twenty paper-thin green tea crêpes layered with light Uji matcha pastry cream, dusted with ceremonial matcha snow.',
    story: 'Each delicate crêpe is hand-swirled in non-stick copper pans and assembled into twenty harmonious layers.',
    ingredients: ['Uji Ceremonial Matcha', 'French Pastry Cream', 'Handmade Thin Crêpes', 'Vanilla Bean'],
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },
  {
    id: 'taiyaki-waffles',
    name: 'Crispy Hokkaido Taiyaki Fish Waffles',
    category: 'Desserts',
    price: 11.50,
    rating: 4.8,
    reviewsCount: 88,
    calories: '280 kcal',
    description: 'Warm sea-bream shaped crisp waffles stuffed with silky sweet red adzuki bean paste and drizzled with warm condensed milk.',
    story: 'Baked in traditional iron taiyaki molds until exterior is crispy and golden, hiding steaming sweet bean paste within.',
    ingredients: ['Cast-Iron Waffle Batter', 'Sweet Red Bean Paste', 'Sweet Condensed Milk', 'Roasted Sesame'],
    image: 'https://images.unsplash.com/photo-1587888637140-849b25d80ef9?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },
  {
    id: 'taro-coconut-mochi',
    name: 'Purple Taro Coconut Soup with Mini Mochi',
    category: 'Desserts',
    price: 12.00,
    rating: 4.8,
    reviewsCount: 76,
    calories: '290 kcal',
    description: 'Velvety sweet purple taro and sweet potato soup dotted with chewy miniature pandan mochi pearls.',
    story: 'Slow-simmered fragrant Taiwanese Dajia taro blended with rich coconut nectar for a comforting warm finish.',
    ingredients: ['Dajia Purple Taro', 'Rich Coconut Milk', 'Handmade Pandan Mochi', 'Rock Sugar'],
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },

  // ================= DRINKS =================
  {
    id: 'yuzu-blossom-cooler',
    name: 'Sparkling Yuzu Blossom Cooler',
    category: 'Drinks',
    price: 9.50,
    rating: 4.8,
    reviewsCount: 77,
    calories: '110 kcal',
    badge: 'Trending',
    description: 'Fresh Kochi yuzu citrus, crushed dragonfruit, purple shiso leaf syrup, and sparkling mountain spring water.',
    story: 'Invigorating pairing for rich dishes, infused with hand-picked Japanese purple shiso leaves.',
    ingredients: ['Kochi Yuzu Juice', 'Pink Dragonfruit', 'Purple Shiso Leaves', 'Sparkling Mineral Water', 'Agave'],
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },
  {
    id: 'brown-sugar-boba',
    name: 'Roasted Brown Sugar Boba Milk',
    category: 'Drinks',
    price: 8.50,
    rating: 4.9,
    reviewsCount: 160,
    calories: '280 kcal',
    badge: 'Popular',
    description: 'Warm brown sugar caramelized tapioca boba pearls tiger-striped in chilled organic farm milk with cheese foam crown.',
    story: 'Slow-simmered in Okinawan dark muscovado sugar for 3 hours to achieve the ultimate chewy boba texture.',
    ingredients: ['Okinawa Brown Sugar', 'Handmade Tapioca Pearls', 'Fresh Organic Milk', 'Light Sea Salt Cream'],
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },
  {
    id: 'iced-matcha-latte',
    name: 'Ceremonial Uji Matcha Latte',
    category: 'Drinks',
    price: 8.00,
    rating: 4.9,
    reviewsCount: 105,
    calories: '140 kcal',
    description: 'First-harvest Kyoto Uji ceremonial matcha whisked with bamboo chasen, layered with oat milk and honey.',
    story: 'Whisked fresh to order for vibrant jade green color, rich natural umami, and velvety foam.',
    ingredients: ['Ceremonial Uji Matcha', 'Oat Milk', 'Wild Honey', 'Ice'],
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },
  {
    id: 'dragonfruit-lychee-spritz',
    name: 'Dragonfruit Lychee Mint Spritz',
    category: 'Drinks',
    price: 9.00,
    rating: 4.8,
    reviewsCount: 86,
    calories: '120 kcal',
    description: 'Crushed sweet lychee fruit, fresh red dragonfruit, garden mint leaves, and effervescent tonic water.',
    story: 'Naturally pink and floral mocktail balancing tropical sweetness with fresh garden herbal lift.',
    ingredients: ['Sweet Lychee', 'Red Dragonfruit', 'Fresh Mint', 'Sparkling Tonic', 'Lime Juice'],
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },
  {
    id: 'cold-brew-peach-oolong',
    name: 'Cold-Brewed White Peach Oolong',
    category: 'Drinks',
    price: 7.50,
    rating: 4.8,
    reviewsCount: 72,
    calories: '85 kcal',
    description: 'High-mountain Taiwanese Alishan oolong tea cold-steeped for 16 hours with juicy white peach slices.',
    story: 'Slow cold-brewing eliminates tannins, highlighting natural honey and stone fruit notes of the tea leaf.',
    ingredients: ['Alishan Oolong Tea', 'White Peach Essence', 'Filtered Spring Water', 'Peach Puree'],
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },
  {
    id: 'passionfruit-green-tea',
    name: 'Passionfruit Jasmine Green Tea Sparkler',
    category: 'Drinks',
    price: 8.50,
    rating: 4.9,
    reviewsCount: 94,
    calories: '105 kcal',
    badge: 'Popular',
    description: 'Fragrant high-mountain jasmine green tea shaken with fresh passionfruit pulp, lime juice, and aloe vera jelly cubes.',
    story: 'Bright, zesty, and highly refreshing with natural crunchy passionfruit seeds and succulent aloe vera.',
    ingredients: ['Jasmine Green Tea', 'Fresh Passionfruit Pulp', 'Aloe Vera Jelly', 'Key Lime', 'Cane Nectar'],
    image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },
  {
    id: 'royal-thai-iced-tea',
    name: 'Royal Spiced Thai Iced Milk Tea',
    category: 'Drinks',
    price: 8.00,
    rating: 4.9,
    reviewsCount: 147,
    calories: '240 kcal',
    badge: 'Trending',
    description: 'Rich Ceylon black tea brewed with star anise and crushed cardamom, poured over crushed ice and topped with evaporated milk.',
    story: 'The classic amber street drink with warm holiday spice undertones and indulgent silky creaminess.',
    ingredients: ['Ceylon Black Tea', 'Star Anise', 'Crushed Cardamom Pods', 'Sweet Condensed Milk', 'Evaporated Milk'],
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },
  {
    id: 'smoked-plum-soda',
    name: 'Imperial Smoked Plum & Mint Soda',
    category: 'Drinks',
    price: 7.50,
    rating: 4.7,
    reviewsCount: 65,
    calories: '95 kcal',
    description: 'Traditional Chinese Suanmeitang reduction made from smoked plums and hawthorn berries, topped with fizzing soda and fresh mint.',
    story: 'Dynasty summer palace cooler renowned for centuries for soothing the palate and aiding digestion after rich feasts.',
    ingredients: ['Smoked Wumei Plums', 'Hawthorn Berries', 'Sweet Osmanthus Flowers', 'Sparkling Soda Water', 'Mint'],
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  },
  {
    id: 'osmanthus-jasmine-tea',
    name: 'Artisan Osmanthus Golden Jasmine Tea',
    category: 'Drinks',
    price: 7.00,
    rating: 4.8,
    reviewsCount: 82,
    calories: '15 kcal',
    description: 'Steeped silver-needle jasmine blossoms layered with sweet golden osmanthus florets, served hot in clear glass pot.',
    story: 'Harvested in autumn when osmanthus fragrance fills ancient gardens with notes of ripe apricots and wild honey.',
    ingredients: ['Silver Needle Jasmine Tea', 'Golden Osmanthus Florets', 'Pure Mountain Spring Water'],
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=85',
    isSpicy: false
  }
];

// Testimonials
interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  dishLoved: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'paula-abdul',
    name: 'Paula Abdul',
    role: 'Music Artist & Performer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    quote: "While performing in town, TasteCraft was our culinary haven. The 19-Pleat Truffle Dim Sum and Wagyu wok bowls are pure magic. We can't wait to return next week!",
    dishLoved: '19-Pleat Truffle Dim Sum',
    rating: 5
  },
  {
    id: 'chef-raymond',
    name: 'Raymond Blanc',
    role: 'Michelin Star Chef & Restaurateur',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    quote: "The wok hei in their Wagyu bowl and the sheer artistry of their pleated dumplings match the finest dining rooms in Kyoto and Hong Kong. The interplay of vinegar, heat, and aromatics is pure culinary mastery.",
    dishLoved: 'Sichuan Wagyu Wok Bowl',
    rating: 5
  },
  {
    id: 'mia-chen',
    name: 'Mia Chen',
    role: 'Senior Food Editor, Epicurean',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    quote: "Every plate tells a sacred heritage story with modern elegance. The Flamed Dragon Eel Roll has this sublime smokiness that stays with you. The atmosphere sets a new benchmark for Asian fine dining.",
    dishLoved: 'Flamed Dragon Eel Roll',
    rating: 5
  }
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Cart Drawer
  const [cartItems, setCartItems] = useState<{ dish: MenuItem; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Table Reservation Modal
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [reservationForm, setReservationForm] = useState({
    name: '',
    phone: '',
    email: '',
    guests: '2',
    date: '2026-10-15',
    time: '19:30',
    notes: ''
  });
  const [reservationSuccess, setReservationSuccess] = useState(false);

  // Newsletter
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterDone, setNewsletterDone] = useState(false);

  // Zen Sound synthesizer
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioTimerRef = useRef<number | null>(null);

  // Hero plate rotation ref
  const heroPlateRef = useRef<HTMLDivElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);

  // Filtered menu
  const filteredDishes = MENU_ITEMS.filter((item) => {
    const matchCat = activeCategory === 'All' || item.category === activeCategory;
    const matchSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  // Category counts
  const categoryCounts: Record<MenuCategory, number> = {
    'All': MENU_ITEMS.length,
    'Mains': MENU_ITEMS.filter(d => d.category === 'Mains').length,
    'Soups & Noodles': MENU_ITEMS.filter(d => d.category === 'Soups & Noodles').length,
    'Dim Sum': MENU_ITEMS.filter(d => d.category === 'Dim Sum').length,
    'Desserts': MENU_ITEMS.filter(d => d.category === 'Desserts').length,
    'Drinks': MENU_ITEMS.filter(d => d.category === 'Drinks').length,
  };

  // Cart operations
  const addToCart = (dish: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.dish.id === dish.id);
      if (existing) {
        return prev.map((i) =>
          i.dish.id === dish.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { dish, quantity: 1 }];
    });
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.85, x: 0.9 },
      colors: ['#E63946', '#FF5722', '#F4A261']
    });
  };

  const updateQuantity = (dishId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.dish.id === dishId) {
            const nextQ = item.quantity + delta;
            return nextQ > 0 ? { ...item, quantity: nextQ } : null;
          }
          return item;
        })
        .filter(Boolean) as { dish: MenuItem; quantity: number }[]
    );
  };

  const cartTotal = cartItems.reduce(
    (acc, curr) => acc + curr.dish.price * curr.quantity,
    0
  );

  // Hero Plate Mouse Move 3D Tilt Effect
  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroPlateRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const tiltX = (y / (rect.height / 2)) * -12;
    const tiltY = (x / (rect.width / 2)) * 12;

    gsap.to(heroPlateRef.current, {
      rotateX: tiltX,
      rotateY: tiltY,
      duration: 0.6,
      ease: 'power2.out',
      transformPerspective: 1000
    });
  };

  const handleHeroMouseLeave = () => {
    if (!heroPlateRef.current) return;
    gsap.to(heroPlateRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  };

  // Toggle ambient zen harmonics
  const toggleZenAudio = () => {
    if (isAudioPlaying) {
      if (audioTimerRef.current) clearInterval(audioTimerRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      setIsAudioPlaying(false);
    } else {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const pentatonic = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25];
        const playChime = () => {
          if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const note = pentatonic[Math.floor(Math.random() * pentatonic.length)];

          osc.type = 'sine';
          osc.frequency.setValueAtTime(note, ctx.currentTime);

          gain.gain.setValueAtTime(0.001, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 0.3);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.5);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + 3.8);
        };

        playChime();
        audioTimerRef.current = window.setInterval(playChime, 2800);
        setIsAudioPlaying(true);
      } catch (err) {
        console.warn('Audio blocked', err);
      }
    }
  };

  // Table reservation submit
  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReservationSuccess(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#E63946', '#FF5722', '#2A9D8F']
    });
    setTimeout(() => {
      setReservationSuccess(false);
      setIsReserveModalOpen(false);
    }, 3000);
  };

  // Newsletter submit
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.includes('@')) return;
    setNewsletterDone(true);
    confetti({
      particleCount: 60,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#E63946', '#FF5722', '#FFB703']
    });
    setTimeout(() => {
      setNewsletterDone(false);
      setNewsletterEmail('');
    }, 3500);
  };

  // GSAP SCROLL ANIMATIONS & HERO PLATE CONTINUOUS ROTATION
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero text staggered reveal
      gsap.fromTo(
        '.hero-reveal-element',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.16,
          ease: 'power3.out',
          delay: 0.15
        }
      );

      // 2. Hero Plate Slow Continuous Ambient Rotation
      if (heroPlateRef.current) {
        gsap.to('.hero-plate-image-inner', {
          rotation: 360,
          duration: 48,
          repeat: -1,
          ease: 'none'
        });

        gsap.fromTo(
          heroPlateRef.current,
          { opacity: 0, scale: 0.85 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.3,
            ease: 'power3.out',
            delay: 0.2
          }
        );
      }

      // 3. Section Headers Smooth ScrollTrigger Fade-in + Slide-up
      const sections = document.querySelectorAll('.scroll-animated-section');
      sections.forEach((sec) => {
        gsap.fromTo(
          sec,
          { opacity: 0, y: 45 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      // 4. Chef Special Plate Smooth Scroll Rotation Scrub
      const specialPlate = document.getElementById('chef-special-rotating-plate');
      if (specialPlate) {
        gsap.to(specialPlate, {
          rotation: 120,
          ease: 'none',
          scrollTrigger: {
            trigger: specialPlate,
            start: 'top 85%',
            end: 'bottom 15%',
            scrub: 1.5
          }
        });
      }
    });

    return () => {
      ctx.revert();
      if (audioTimerRef.current) clearInterval(audioTimerRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1A1A1A] selection:bg-[#E63946] selection:text-white relative overflow-x-hidden font-sans">
      
      {/* =========================================================================
          1. STICKY NAVBAR
         ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-stone-200/70 transition-all shadow-xs">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[#E63946] flex items-center justify-center text-white shadow-md shadow-[#E63946]/25 group-hover:scale-105 transition-transform duration-300">
              <span className="font-serif text-lg font-bold">味</span>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-stone-900 block leading-none">
                TasteCraft
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#E63946] font-semibold">
                Asian Fine Dining
              </span>
            </div>
          </a>

          {/* Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-700">
            <a href="#hero" className="hover:text-[#E63946] transition-colors py-1">Home</a>
            <a href="#menu" className="hover:text-[#E63946] transition-colors py-1">Menu</a>
            <a href="#special" className="hover:text-[#E63946] transition-colors py-1">Chef's Special</a>
            <a href="#about" className="hover:text-[#E63946] transition-colors py-1">Our Story</a>
            <a href="#testimonials" className="hover:text-[#E63946] transition-colors py-1">Reviews</a>
            <a href="#contact" className="hover:text-[#E63946] transition-colors py-1">Book Table</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Ambient Sound */}
            <button
              onClick={toggleZenAudio}
              title={isAudioPlaying ? "Mute Zen Harmonics" : "Play Bistro Zen Ambiance"}
              className="p-2.5 rounded-full border border-stone-300 hover:border-[#E63946] hover:bg-white text-stone-600 hover:text-[#E63946] transition-all cursor-pointer flex items-center gap-1.5 text-xs font-medium"
            >
              {isAudioPlaying ? (
                <>
                  <Volume2 className="w-4 h-4 text-[#E63946] animate-pulse" />
                  <span className="hidden sm:inline text-xs text-[#E63946]">Zen On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span className="hidden sm:inline text-xs">Ambiance</span>
                </>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full border border-stone-300 hover:border-[#E63946] hover:bg-white text-stone-700 hover:text-[#E63946] transition-all cursor-pointer"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#E63946] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
                </span>
              )}
            </button>

            {/* Book Table Button */}
            <button
              onClick={() => setIsReserveModalOpen(true)}
              className="bg-[#1C1917] hover:bg-[#E63946] text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all shadow-md hover:shadow-[#E63946]/25 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Table</span>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          2. HERO SECTION
         ========================================================================= */}
      <section id="hero" className="relative min-h-[90vh] flex items-center pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Reveal Text */}
          <div className="lg:col-span-6 space-y-6 max-w-xl">
            <div className="hero-reveal-element inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#E63946] bg-[#E63946]/10 px-3.5 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-[#E63946]" />
              Authentic Asian Culinary Arts
            </div>

            <div className="space-y-2">
              <h1 className="hero-reveal-element text-5xl sm:text-6xl lg:text-7xl font-bold font-serif tracking-tight text-stone-900 leading-[1.08]">
                Take a taste <br />
                <span className="text-[#E63946]">Come join us.</span>
              </h1>
              <p className="hero-reveal-element text-xl sm:text-2xl font-serif text-stone-700 font-medium italic pt-2">
                Life is so endlessly delicious.
              </p>
            </div>

            <p className="hero-reveal-element text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
              Indulge in modern Asian gastronomy where master-pleated dumplings, flash-seared A5 Wagyu,
              and artisanal noodles come alive with binchotan coals and fiery wok hei precision.
            </p>

            {/* CTAs */}
            <div className="hero-reveal-element pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#menu"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#E63946] to-[#FF5722] hover:from-[#D62828] hover:to-[#E64A19] text-white font-medium text-sm sm:text-base px-8 py-4 rounded-full shadow-lg shadow-[#E63946]/30 hover:shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all cursor-pointer group"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </a>

              <button
                onClick={() => setIsReserveModalOpen(true)}
                className="inline-flex items-center gap-2 border border-stone-300 hover:border-stone-800 text-stone-800 font-medium text-sm sm:text-base px-6 py-3.5 rounded-full hover:bg-stone-100 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#E63946]" />
                Book a Table
              </button>
            </div>

            {/* Trust Proof */}
            <div className="hero-reveal-element pt-6 border-t border-stone-200/80 flex items-center gap-8 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-stone-900">4.9/5 Rating (1.8k+ Reviews)</span>
              </div>
              <span className="text-stone-300">|</span>
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#E63946]" />
                <span>100% Farm-Fresh Ingredients</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Plate with Smooth Rotation & 3D Interactive Tilt */}
          <div
            ref={heroContainerRef}
            onMouseMove={handleHeroMouseMove}
            onMouseLeave={handleHeroMouseLeave}
            className="lg:col-span-6 relative flex items-center justify-center min-h-[440px] sm:min-h-[500px] cursor-grab active:cursor-grabbing"
          >
            <div className="absolute w-[360px] sm:w-[460px] h-[360px] sm:h-[460px] rounded-full border border-stone-200/80 bg-stone-100/40 pointer-events-none" />

            <div
              ref={heroPlateRef}
              className="relative z-20 w-[300px] sm:w-[410px] md:w-[450px] aspect-square rounded-full plate-shadow-lg transition-transform duration-150 ease-out"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-white shadow-2xl bg-amber-950/10">
                <img
                  src="https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=900&q=85"
                  alt="Steamed Dim Sum Dumplings"
                  className="hero-plate-image-inner w-full h-full object-cover object-center scale-110 pointer-events-none select-none"
                />
              </div>

              {/* Wooden Chopsticks */}
              <div className="absolute -top-6 -left-8 sm:-left-12 w-[130%] h-6 pointer-events-none transform rotate-[28deg] z-30 drop-shadow-xl">
                <div className="w-full h-2.5 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 rounded-full shadow-md" />
                <div className="w-[95%] h-2.5 bg-gradient-to-r from-amber-850 via-amber-700 to-amber-900 rounded-full shadow-md mt-1.5 ml-2" />
              </div>
            </div>

            {/* Dipping Sauce */}
            <div className="absolute -bottom-2 left-6 sm:left-12 z-30 w-24 sm:w-28 h-24 sm:h-28 rounded-full plate-shadow border-4 border-white bg-[#C62828] p-1.5 pointer-events-none">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#E53935] via-[#C62828] to-[#B71C1C] flex items-center justify-center relative shadow-inner overflow-hidden">
                <div className="relative w-8 h-8 flex items-center justify-center transform -rotate-12">
                  <div className="absolute w-5 h-7 rounded-full bg-emerald-500 transform -rotate-25 shadow-sm" />
                  <div className="absolute w-5 h-6 rounded-full bg-emerald-600 transform rotate-35 shadow-sm" />
                </div>
                <div className="absolute top-2 left-3 w-4 h-2 rounded-full bg-white/40 blur-[1px]" />
              </div>
            </div>

            {/* Chef Badge */}
            <div className="absolute -top-2 right-4 sm:right-10 z-30 bg-white px-4 py-2.5 rounded-2xl shadow-xl border border-stone-200/80 flex items-center gap-3 pointer-events-none">
              <div className="w-8 h-8 rounded-full bg-[#E63946]/10 flex items-center justify-center text-[#E63946]">
                <ChefHat className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Truffle Dim Sum</p>
                <p className="text-xs font-serif font-bold text-stone-900">19-Pleat Technique</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. EXPANDED FOOD MENU SECTION (30+ Diverse Dishes Across Categories)
         ========================================================================= */}
      <section id="menu" className="scroll-animated-section relative py-24 border-t border-stone-200/70 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#E63946] bg-[#E63946]/10 px-3 py-1 rounded-full">
              Handcrafted Culinary Art
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold font-serif text-stone-900 tracking-tight">
              Our Premium Dishes
            </h2>
            <p className="text-stone-600 text-sm sm:text-base">
              Explore authentic flavors, seasonal Asian specialties, and fine dining creations. Featuring {MENU_ITEMS.length} handcrafted specialties.
            </p>
          </div>

          {/* Search & Category Filter Tabs */}
          <div className="space-y-6 mb-12">
            {/* Search Input */}
            <div className="max-w-md mx-auto relative">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search by dish name, broth, or ingredients (e.g., Wagyu, Truffle, Udon)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white pl-11 pr-4 py-3 rounded-full border border-stone-300 text-sm focus:outline-none focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/15 shadow-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Tabs with Item Count Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {(['All', 'Mains', 'Soups & Noodles', 'Dim Sum', 'Desserts', 'Drinks'] as MenuCategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                    activeCategory === cat
                      ? 'bg-[#E63946] text-white shadow-md shadow-[#E63946]/25 scale-105'
                      : 'text-stone-600 hover:text-stone-900 bg-white hover:bg-stone-50 border border-stone-200'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                      activeCategory === cat
                        ? 'bg-white/20 text-white'
                        : 'bg-stone-100 text-stone-500'
                    }`}
                  >
                    {categoryCounts[cat]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Animated Filter Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-2"
          >
            <AnimatePresence mode="popLayout">
              {filteredDishes.map((dish) => (
                <motion.div
                  layout
                  key={dish.id}
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  onClick={() => setSelectedDish(dish)}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-xs hover:shadow-2xl hover:-translate-y-2.5 transition-all duration-300 ease-out flex flex-col justify-between group cursor-pointer relative"
                >
                  {/* Badge */}
                  {dish.badge && (
                    <div className="absolute top-5 left-5 z-20">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-[#E63946] px-3 py-1 rounded-full shadow-sm">
                        {dish.badge}
                      </span>
                    </div>
                  )}

                  {/* Circular Image Container with Smooth Zoom on Hover */}
                  <div className="relative mx-auto w-48 sm:w-52 h-48 sm:h-52 my-3 overflow-hidden rounded-full border-4 border-stone-100 plate-shadow group-hover:shadow-2xl transition-all duration-500">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=85';
                      }}
                      className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    />

                    {/* Price Tag */}
                    <div className="absolute bottom-2 right-2 bg-stone-900 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md group-hover:bg-[#E63946] transition-colors duration-300">
                      ${dish.price.toFixed(2)}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="text-center pt-4 space-y-2 flex-grow">
                    <div className="flex items-center justify-center gap-1.5 text-xs text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-bold text-stone-800">{dish.rating}</span>
                      <span className="text-stone-400">({dish.reviewsCount})</span>
                      {dish.isSpicy && (
                        <span className="text-xs ml-1" title="Spicy">🌶️</span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 group-hover:text-[#E63946] transition-colors duration-300">
                      {dish.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  {/* Bottom Actions */}
                  <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-stone-500">
                      <Flame className="w-3.5 h-3.5 text-[#E63946]" />
                      <span>{dish.calories || '380 kcal'}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDish(dish);
                        }}
                        className="p-2 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
                        title="Quick View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(dish);
                        }}
                        className="flex items-center gap-1.5 text-xs font-semibold bg-[#E63946] hover:bg-[#D62828] text-white px-4 py-2 rounded-full shadow-md shadow-[#E63946]/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredDishes.length === 0 && (
            <div className="text-center py-16 text-stone-500 space-y-3">
              <UtensilsCrossed className="w-10 h-10 mx-auto text-stone-300" />
              <p className="text-base font-semibold text-stone-700">No dishes match your selection.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                className="text-xs text-[#E63946] font-bold hover:underline cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          4. CHEF'S SPECIAL & STORY SECTION
         ========================================================================= */}
      <section id="special" className="scroll-animated-section relative py-28 border-t border-stone-200/70 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Scroll-Rotating Bowl */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div
                id="chef-special-rotating-plate"
                className="relative w-[300px] sm:w-[420px] md:w-[460px] aspect-square rounded-full plate-shadow-lg"
              >
                <div className="w-full h-full rounded-full overflow-hidden border-8 border-white shadow-2xl bg-amber-950">
                  <img
                    src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=85"
                    alt="Chef Special Heritage Dan Dan Noodles"
                    className="w-full h-full object-cover object-center scale-105"
                  />
                </div>
                <div className="absolute top-1/4 -right-6 sm:-right-10 w-[110%] h-4 pointer-events-none transform -rotate-[32deg] z-30 drop-shadow-lg">
                  <div className="w-full h-2 bg-gradient-to-r from-amber-700 via-amber-800 to-amber-950 rounded-full" />
                </div>
              </div>
            </div>

            {/* Right: Copy & Heritage */}
            <div className="lg:col-span-6 space-y-6 max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E63946] bg-[#E63946]/10 px-3.5 py-1.5 rounded-full">
                <Award className="w-3.5 h-3.5 text-[#E63946]" />
                Chef's Master Specialty
              </div>

              <h2 className="text-4xl sm:text-5xl font-bold font-serif text-stone-900 tracking-tight leading-tight">
                Slow-Braised Sichuan <br />
                <span className="text-[#E63946]">Heritage Dan Dan Noodles</span>
              </h2>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Pulled fresh every morning before sunrise, bathed in 14-spice botanical chili oil
                and aged roasted sesame puree. Finished with crispy Kurobuta pork mince and fermented
                Chengdu Sui Mi Ya Cai.
              </p>

              {/* Feature Points */}
              <div className="grid grid-cols-2 gap-4 pt-2 text-xs sm:text-sm text-stone-700">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span>100% Hand-Pulled Daily</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span>14-Spice Botanical Chili Oil</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span>Wok-Seared Kurobuta Pork</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span>Authentic Sichuan Heritage</span>
                </div>
              </div>

              {/* Order Button */}
              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={() => {
                    const dish = MENU_ITEMS.find((d) => d.id === 'dan-dan-noodles');
                    if (dish) addToCart(dish);
                  }}
                  className="bg-[#E63946] hover:bg-[#D62828] text-white font-medium text-sm px-7 py-3.5 rounded-full shadow-lg shadow-[#E63946]/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Order Chef's Specialty ($19.00)</span>
                </button>

                <button
                  onClick={() => {
                    const dish = MENU_ITEMS.find((d) => d.id === 'dan-dan-noodles');
                    if (dish) setSelectedDish(dish);
                  }}
                  className="text-stone-700 hover:text-stone-900 text-sm font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>View Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. ABOUT US / STORY & STATS SECTION
         ========================================================================= */}
      <section id="about" className="scroll-animated-section relative py-28 border-t border-stone-200/70 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Story Text */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E63946] bg-[#E63946]/10 px-3.5 py-1.5 rounded-full">
                <ChefHat className="w-3.5 h-3.5 text-[#E63946]" />
                Our Story & Heritage
              </div>

              <h2 className="text-4xl sm:text-5xl font-bold font-serif text-stone-900 tracking-tight leading-tight">
                Where Ancient Wok Craft Meets Contemporary Elegance
              </h2>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Founded over two decades ago by Master Chef Kenji Sato, TasteCraft began with a single mission:
                to honor the sacred nuances of regional Asian gastronomy while elevating every dish into
                modern fine-dining art.
              </p>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Every dumpling is pleated with nineteen precise folds, every broth is simmered for eighteen hours,
                and every wok is fired on raw binchotan charcoal to achieve that signature smoky wok hei.
              </p>

              {/* Chef Signature */}
              <div className="pt-2 flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=160&q=80"
                  alt="Executive Chef Kenji Sato"
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#E63946]"
                />
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-base">Kenji Sato</h4>
                  <p className="text-xs text-stone-500">Executive Culinary Director & Founder</p>
                </div>
              </div>
            </div>

            {/* Banner */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden plate-shadow border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=85"
                  alt="TasteCraft Dining Room Ambiance"
                  className="w-full h-[380px] sm:h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
                  <div className="text-white space-y-1">
                    <p className="text-xs font-semibold tracking-widest uppercase text-[#FF5722]">Award-Winning Dining</p>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold">Michelin Selected 2024–2026</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grounded Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 mt-16 border-t border-stone-200">
            <div className="text-center p-6 bg-white rounded-2xl border border-stone-200 shadow-xs hover:-translate-y-1 transition-transform">
              <span className="text-4xl sm:text-5xl font-bold font-serif text-[#E63946] block">50+</span>
              <p className="text-xs uppercase tracking-wider text-stone-500 font-semibold pt-1">Artisanal Dishes</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl border border-stone-200 shadow-xs hover:-translate-y-1 transition-transform">
              <span className="text-4xl sm:text-5xl font-bold font-serif text-[#E63946] block">25+</span>
              <p className="text-xs uppercase tracking-wider text-stone-500 font-semibold pt-1">Years Legacy</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl border border-stone-200 shadow-xs hover:-translate-y-1 transition-transform">
              <span className="text-4xl sm:text-5xl font-bold font-serif text-[#E63946] block">15+</span>
              <p className="text-xs uppercase tracking-wider text-stone-500 font-semibold pt-1">Master Chefs</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl border border-stone-200 shadow-xs hover:-translate-y-1 transition-transform">
              <span className="text-4xl sm:text-5xl font-bold font-serif text-[#E63946] block">28k+</span>
              <p className="text-xs uppercase tracking-wider text-stone-500 font-semibold pt-1">Delighted Guests</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. REVIEWS & TESTIMONIALS SLIDER
         ========================================================================= */}
      <section id="testimonials" className="scroll-animated-section relative py-28 border-t border-stone-200/70 bg-[#FAF7F2] text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-10">
          
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#E63946] bg-[#E63946]/10 px-3 py-1 rounded-full">
              Guest Testimonials
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold font-serif text-stone-900 tracking-tight">
              What Our Guests Say
            </h2>
            <p className="text-stone-600 text-sm sm:text-base">
              Voices of food critics, world travelers, and beloved diners.
            </p>
          </div>

          {/* Testimonial Card */}
          <div className="relative bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-md">
            <span className="font-serif text-7xl text-[#E63946]/25 leading-none block select-none -mt-4 mb-2">
              “
            </span>

            <p className="text-stone-700 text-base sm:text-lg leading-relaxed italic font-normal max-w-2xl mx-auto">
              "{TESTIMONIALS[activeTestimonial].quote}"
            </p>

            {/* Stars */}
            <div className="flex justify-center text-amber-500 gap-1 pt-6">
              {[...Array(TESTIMONIALS[activeTestimonial].rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>

            {/* Author */}
            <div className="pt-6 mt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={TESTIMONIALS[activeTestimonial].avatar}
                  alt={TESTIMONIALS[activeTestimonial].name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-stone-200"
                />
                <div className="text-left">
                  <h4 className="font-serif font-bold text-stone-900 text-base">
                    {TESTIMONIALS[activeTestimonial].name}
                  </h4>
                  <p className="text-xs text-[#E63946] font-medium">
                    {TESTIMONIALS[activeTestimonial].role}
                  </p>
                </div>
              </div>

              <div className="text-xs text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
                Favorite: <span className="font-semibold text-stone-800">{TESTIMONIALS[activeTestimonial].dishLoved}</span>
              </div>
            </div>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() =>
                setActiveTestimonial((prev) =>
                  prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
                )
              }
              className="p-3 rounded-full bg-white border border-stone-300 hover:border-stone-900 text-stone-700 hover:text-stone-900 shadow-sm transition-all cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    activeTestimonial === idx
                      ? 'w-8 bg-[#E63946]'
                      : 'w-2.5 bg-stone-300 hover:bg-stone-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() =>
                setActiveTestimonial((prev) =>
                  prev === TESTIMONIALS.length - 1 ? 0 : prev + 1
                )
              }
              className="p-3 rounded-full bg-white border border-stone-300 hover:border-stone-900 text-stone-700 hover:text-stone-900 shadow-sm transition-all cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. TABLE RESERVATION SECTION
         ========================================================================= */}
      <section id="contact" className="scroll-animated-section relative py-28 border-t border-stone-200/70 bg-[#FAF7F2]">
        <div className="max-w-5xl mx-auto px-6 relative z-20">
          <div className="bg-white rounded-3xl p-8 sm:p-14 border border-stone-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#E63946]">
                  Table Service
                </div>
                <h3 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
                  Reserve Your Culinary Table
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  Join us for intimate evening tasting menus, family dining celebrations,
                  or private chef table experiences.
                </p>
              </div>

              <div className="space-y-4 pt-4 text-xs sm:text-sm text-stone-700 border-t border-stone-100">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#E63946] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-stone-900">Location</p>
                    <p className="text-stone-500">428 Lotus Blossom Way, Culinary Arts District</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#E63946] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-stone-900">Dining Hours</p>
                    <p className="text-stone-500">Tuesday – Sunday: 11:30 AM – 10:30 PM</p>
                    <p className="text-stone-400 text-xs">Monday: Culinary Prep (Closed)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#E63946] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-stone-900">Concierge Desk</p>
                    <p className="text-stone-500">+1 (555) 839-2782 / concierge@tastecraft.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              {reservationSuccess ? (
                <div className="text-center py-12 space-y-4 bg-emerald-50/50 rounded-2xl p-6 border border-emerald-200">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-bold">
                    ✓
                  </div>
                  <h4 className="text-2xl font-serif font-bold text-stone-900">Reservation Confirmed!</h4>
                  <p className="text-xs sm:text-sm text-stone-600">
                    Thank you, <strong className="text-stone-900">{reservationForm.name}</strong>. Your tasting table for{' '}
                    <strong className="text-stone-900">{reservationForm.guests} guests</strong> on{' '}
                    <strong className="text-stone-900">{reservationForm.date} at {reservationForm.time}</strong> is officially booked.
                    We have sent a confirmation email to {reservationForm.email || 'your email'}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleReservationSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Master Kenji"
                        value={reservationForm.name}
                        onChange={(e) =>
                          setReservationForm({ ...reservationForm, name: e.target.value })
                        }
                        className="w-full bg-stone-50 px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-[#E63946]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={reservationForm.email}
                        onChange={(e) =>
                          setReservationForm({ ...reservationForm, email: e.target.value })
                        }
                        className="w-full bg-stone-50 px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-[#E63946]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Guests</label>
                      <select
                        value={reservationForm.guests}
                        onChange={(e) =>
                          setReservationForm({ ...reservationForm, guests: e.target.value })
                        }
                        className="w-full bg-stone-50 px-3 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-[#E63946]"
                      >
                        {[1, 2, 3, 4, 6, 8, 10, 12].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Date</label>
                      <input
                        type="date"
                        required
                        value={reservationForm.date}
                        onChange={(e) =>
                          setReservationForm({ ...reservationForm, date: e.target.value })
                        }
                        className="w-full bg-stone-50 px-3 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#E63946]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Time</label>
                      <select
                        value={reservationForm.time}
                        onChange={(e) =>
                          setReservationForm({ ...reservationForm, time: e.target.value })
                        }
                        className="w-full bg-stone-50 px-3 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#E63946]"
                      >
                        {['12:00', '13:30', '17:30', '19:00', '19:30', '20:30', '21:00'].map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Special Requests / Dietary Needs
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Mild spice preferred, window seat requested..."
                      value={reservationForm.notes}
                      onChange={(e) =>
                        setReservationForm({ ...reservationForm, notes: e.target.value })
                      }
                      className="w-full bg-stone-50 px-4 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-[#E63946]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 bg-[#E63946] hover:bg-[#D62828] text-white font-semibold py-3.5 rounded-full shadow-lg shadow-[#E63946]/30 hover:scale-[1.01] active:scale-98 transition-all cursor-pointer"
                  >
                    Confirm Table Reservation
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. COMPREHENSIVE FOOTER
         ========================================================================= */}
      <footer className="border-t border-stone-200/80 bg-white pt-16 pb-12 relative z-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E63946] flex items-center justify-center text-white shadow-sm font-serif font-bold text-lg">
                味
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-stone-900">
                TasteCraft
              </span>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">
              Curating authentic regional Asian culinary traditions with contemporary fine-dining aesthetics.
              A celebration of fire, steam, and hospitality.
            </p>
            <div className="flex items-center gap-3 pt-2 text-stone-600">
              <a href="#" className="p-2 rounded-full bg-stone-100 hover:bg-[#E63946] hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-stone-100 hover:bg-[#E63946] hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-stone-100 hover:bg-[#E63946] hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-stone-900 text-sm">Quick Links</h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li><a href="#hero" className="hover:text-[#E63946] transition-colors">Home Experience</a></li>
              <li><a href="#menu" className="hover:text-[#E63946] transition-colors">Premium Dishes Menu</a></li>
              <li><a href="#special" className="hover:text-[#E63946] transition-colors">Chef's Specialty</a></li>
              <li><a href="#about" className="hover:text-[#E63946] transition-colors">Our Story & Heritage</a></li>
              <li><a href="#testimonials" className="hover:text-[#E63946] transition-colors">Guest Testimonials</a></li>
              <li><a href="#contact" className="hover:text-[#E63946] transition-colors">Book a Table</a></li>
            </ul>
          </div>

          {/* Hours & Location */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-stone-900 text-sm">Opening Hours & Location</h4>
            <div className="text-xs text-stone-600 space-y-1.5">
              <p><strong className="text-stone-800">Tue – Fri:</strong> 11:30 AM – 10:30 PM</p>
              <p><strong className="text-stone-800">Sat – Sun:</strong> 11:00 AM – 11:00 PM</p>
              <p className="text-stone-400">Monday: Culinary Prep (Closed)</p>
            </div>
            <div className="pt-2">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#E63946] font-semibold hover:underline"
              >
                <span>View Google Maps Location</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-stone-900 text-sm">Culinary Newsletter</h4>
            <p className="text-xs text-stone-600">
              Receive seasonal chef tasting invites and secret dumpling recipes.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Your email address..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full bg-stone-50 px-4 py-2.5 rounded-full border border-stone-300 text-xs focus:outline-none focus:border-[#E63946]"
              />
              <button
                type="submit"
                className="w-full bg-[#E63946] hover:bg-[#D62828] text-white font-semibold text-xs py-2.5 rounded-full shadow-md shadow-[#E63946]/20 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                {newsletterDone ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <span>Subscribe</span>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-12 mt-12 border-t border-stone-200/60 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} TasteCraft Asian Fine Dining. All rights reserved.</p>
          <p className="text-stone-400">Engineered with Smooth GSAP Scroll & Interactive Layout Animations.</p>
        </div>
      </footer>

      {/* =========================================================================
          MODAL 1: DISH DETAIL QUICK-VIEW
         ========================================================================= */}
      {selectedDish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-[#FAF7F2] rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedDish(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-200/70 hover:bg-stone-300 text-stone-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="relative mx-auto w-48 h-48 rounded-full overflow-hidden border-4 border-white plate-shadow shadow-xl">
                <img
                  src={selectedDish.image}
                  alt={selectedDish.name}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=85';
                  }}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-center space-y-1">
                <span className="text-xs uppercase tracking-widest text-[#E63946] font-bold">
                  {selectedDish.category}
                </span>
                <h3 className="text-3xl font-serif font-bold text-stone-900">
                  {selectedDish.name}
                </h3>
                <p className="text-xl font-bold text-stone-900 font-serif">
                  ${selectedDish.price.toFixed(2)}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-stone-200 text-xs sm:text-sm text-stone-600 space-y-2">
                <p className="font-medium text-stone-900">{selectedDish.description}</p>
                <p className="italic text-stone-500">{selectedDish.story}</p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-stone-200 text-xs">
                <span className="font-bold text-stone-800 block mb-2">Ingredients</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDish.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="text-stone-700 bg-stone-100 px-2.5 py-1 rounded-md text-[11px]"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  addToCart(selectedDish);
                  setSelectedDish(null);
                }}
                className="w-full bg-[#E63946] hover:bg-[#D62828] text-white font-semibold py-3.5 rounded-full shadow-lg shadow-[#E63946]/30 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart (${selectedDish.price.toFixed(2)})</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: TABLE RESERVATION MODAL
         ========================================================================= */}
      {isReserveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-[#FAF7F2] rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-stone-200">
            <button
              onClick={() => setIsReserveModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-200/70 hover:bg-stone-300 text-stone-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {reservationSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-900">Table Reserved!</h3>
                <p className="text-sm text-stone-600">
                  Thank you, {reservationForm.name || 'Guest'}. Your tasting reservation for{' '}
                  {reservationForm.guests} guests on {reservationForm.date} at {reservationForm.time} is confirmed.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReservationSubmit} className="space-y-4">
                <div className="text-center space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E63946]">Table Service</span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">Book A Table</h3>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Master Kenji"
                      value={reservationForm.name}
                      onChange={(e) => setReservationForm({ ...reservationForm, name: e.target.value })}
                      className="w-full bg-white px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-[#E63946]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Guests</label>
                      <select
                        value={reservationForm.guests}
                        onChange={(e) => setReservationForm({ ...reservationForm, guests: e.target.value })}
                        className="w-full bg-white px-3 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-[#E63946]"
                      >
                        {[1, 2, 3, 4, 6, 8, 10, 12].map((n) => (
                          <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Date</label>
                      <input
                        type="date"
                        required
                        value={reservationForm.date}
                        onChange={(e) => setReservationForm({ ...reservationForm, date: e.target.value })}
                        className="w-full bg-white px-3 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#E63946]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Time</label>
                      <select
                        value={reservationForm.time}
                        onChange={(e) => setReservationForm({ ...reservationForm, time: e.target.value })}
                        className="w-full bg-white px-3 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#E63946]"
                      >
                        {['12:00', '13:30', '17:30', '19:00', '19:30', '20:30', '21:00'].map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Special Requests</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Mild spice preferred, window seat requested..."
                      value={reservationForm.notes}
                      onChange={(e) => setReservationForm({ ...reservationForm, notes: e.target.value })}
                      className="w-full bg-stone-50 px-4 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-[#E63946]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 bg-[#E63946] hover:bg-[#D62828] text-white font-semibold py-3 rounded-full shadow-lg shadow-[#E63946]/25 transition-all cursor-pointer"
                >
                  Confirm Table Reservation
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          SLIDE-OVER DRAWER: CART
         ========================================================================= */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
          <div className="bg-[#FAF7F2] w-full max-w-md h-full shadow-2xl p-6 flex flex-col justify-between border-l border-stone-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#E63946]" />
                  <h3 className="font-serif font-bold text-xl text-stone-900">Your Culinary Cart</h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-full hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12 text-stone-500 space-y-2">
                    <UtensilsCrossed className="w-10 h-10 mx-auto text-stone-300" />
                    <p className="text-sm font-semibold">Your cart is currently empty.</p>
                    <p className="text-xs text-stone-400">Add any of our handcrafted specialties to start.</p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.dish.id}
                      className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-stone-200"
                    >
                      <img
                        src={item.dish.image}
                        alt={item.dish.name}
                        className="w-14 h-14 rounded-full object-cover border border-stone-200"
                      />
                      <div className="flex-grow">
                        <h4 className="font-serif font-bold text-sm text-stone-900">{item.dish.name}</h4>
                        <span className="text-xs text-[#E63946] font-medium">${item.dish.price.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.dish.id, -1)}
                          className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700 cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.dish.id, 1)}
                          className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {cartItems.length > 0 && (
              <div className="pt-4 border-t border-stone-200 space-y-3">
                <div className="flex items-center justify-between text-base font-bold text-stone-900">
                  <span>Subtotal:</span>
                  <span className="font-serif text-[#E63946]">${cartTotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => {
                    confetti({
                      particleCount: 80,
                      spread: 60,
                      origin: { y: 0.6 }
                    });
                    alert(`Order confirmed for ${cartItems.length} dishes ($${cartTotal.toFixed(2)})! The master wok is firing up!`);
                    setCartItems([]);
                    setIsCartOpen(false);
                  }}
                  className="w-full bg-[#E63946] hover:bg-[#D62828] text-white font-semibold py-3.5 rounded-full shadow-lg shadow-[#E63946]/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Checkout & Order Now</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
