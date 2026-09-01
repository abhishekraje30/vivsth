import { Image } from 'expo-image';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, shadow } from '@vivahspot/shared/tokens';

import {
  CATEGORIES,
  VENDORS,
  badgesFor,
  formatPrice,
  type Vendor,
} from '@/mocks/catalog';

/** Ported from the prototype's index.html home screen. Mock data — no backend yet. */
export default function HomeScreen() {
  return (
    <View className="bg-bg flex-1">
      <SafeAreaView edges={['top']} className="bg-surface">
        <AppBar />
      </SafeAreaView>

      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-10"
        showsVerticalScrollIndicator={false}
      >
        <SearchBar />
        <Hero />

        <SectionHead title="Services" action="See all" />
        <ServiceGrid />

        <SectionHead title="Featured near you" />
        <View className="gap-4 px-5">
          {VENDORS.slice(0, 3).map((v) => (
            <VendorCard key={v.id} vendor={v} />
          ))}
        </View>

        <SectionHead title="Trending now" action="See all" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-4 px-5"
        >
          {VENDORS.slice(3).map((v) => (
            <View key={v.id} className="w-64">
              <VendorCard vendor={v} />
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
}

function AppBar() {
  return (
    <View className="flex-row items-center justify-between px-5 py-3">
      <View>
        <Text className="text-2xl font-bold">
          <Text className="text-text">Vivah</Text>
          <Text className="text-accent">Spot</Text>
        </Text>
        <Text className="text-text-soft text-xs">Big day, sorted.</Text>
      </View>

      <View className="flex-row items-center gap-3">
        <Pressable className="border-border flex-row items-center gap-1 rounded-pill border px-3 py-1.5">
          <Text className="text-accent text-xs">📍</Text>
          <Text className="text-text text-sm font-medium">Pune</Text>
          <Text className="text-text-soft text-xs">▾</Text>
        </Pressable>
        <View className="bg-accent-soft h-10 w-10 items-center justify-center rounded-pill">
          <Text className="text-accent-dark text-base font-semibold">A</Text>
        </View>
      </View>
    </View>
  );
}

function SearchBar() {
  return (
    <View className="px-5 pb-1 pt-4">
      <View
        className="bg-surface border-border flex-row items-center gap-2 rounded-pill border py-1.5 pl-4 pr-1.5"
        style={shadow.native}
      >
        <Text className="text-text-soft">🔍</Text>
        <TextInput
          placeholder="Search venues, caterers, decor…"
          placeholderTextColor={colors.textSoft}
          className="text-text flex-1 py-2 text-base"
        />
        <Pressable className="bg-accent rounded-pill px-4 py-2">
          <Text className="text-sm font-semibold text-white">Search</Text>
        </Pressable>
      </View>
    </View>
  );
}

function Hero() {
  return (
    <View className="mt-4 px-5">
      <View className="h-56 overflow-hidden rounded-xl">
        <Image
          source={require('@/assets/catalog/hero.jpg')}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
          contentFit="cover"
        />
        <View className="flex-1 justify-end bg-black/35 p-5">
          <Text className="text-3xl font-bold leading-9 text-white">
            Plan your perfect wedding
          </Text>
          <Text className="mt-1.5 text-sm text-white/90">
            Trusted vendors for every part of your big day — all in one place.
          </Text>
          <Pressable className="bg-accent mt-4 self-start rounded-pill px-5 py-2.5">
            <Text className="text-sm font-semibold text-white">Explore Services</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function SectionHead({ title, action }: { title: string; action?: string }) {
  return (
    <View className="flex-row items-end justify-between px-5 pb-3 pt-7">
      <Text className="text-text text-xl font-bold">{title}</Text>
      {action ? <Text className="text-accent text-sm font-medium">{action}</Text> : null}
    </View>
  );
}

function ServiceGrid() {
  return (
    <View className="flex-row flex-wrap gap-y-4 px-5">
      {CATEGORIES.map((c) => (
        <Pressable key={c.slug} className="w-1/3 items-center px-1">
          <View className="border-border h-[70px] w-[70px] overflow-hidden rounded-pill border-2">
            <Image source={c.image} style={{ width: '100%', height: '100%' }} contentFit="cover" />
          </View>
          <Text className="text-text mt-2 text-center text-xs font-medium" numberOfLines={2}>
            {c.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

function VendorCard({ vendor }: { vendor: Vendor }) {
  const badges = badgesFor(vendor);
  return (
    <Pressable
      className="bg-surface border-border overflow-hidden rounded-lg border"
      style={shadow.native}
    >
      <View className="h-40">
        <Image
          source={vendor.image}
          style={{ width: '100%', height: '100%' }}
          contentFit="cover"
        />
        <View className="absolute right-2 top-2 rounded-pill bg-black/60 px-2 py-1">
          <Text className="text-xs font-semibold text-white">★ {vendor.rating}</Text>
        </View>
      </View>

      <View className="p-3.5">
        {badges.length > 0 && (
          <View className="mb-1.5 flex-row gap-1.5">
            {badges.map((b) => (
              <View key={b.key} className="bg-accent-soft rounded-pill px-2 py-0.5">
                <Text className="text-accent-dark text-[10px] font-semibold">
                  {b.icon} {b.label}
                </Text>
              </View>
            ))}
          </View>
        )}

        <Text className="text-text text-base font-semibold" numberOfLines={1}>
          {vendor.name}
        </Text>
        <Text className="text-text-soft mt-0.5 text-xs">📍 {vendor.city}</Text>

        <View className="border-border mt-3 flex-row items-center justify-between border-t pt-3">
          <Text className="text-text text-base font-bold">
            {formatPrice(vendor.priceFrom)}
            <Text className="text-text-soft text-xs font-normal"> / {vendor.unit}</Text>
          </Text>
          <View className="bg-accent rounded-pill px-4 py-1.5">
            <Text className="text-xs font-semibold text-white">View</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
