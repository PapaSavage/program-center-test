<template>
    <header
        class="sticky top-0 px-4 py-4 sm:container mx-auto flex flex-row items-center justify-between backdrop-blur-lg bg-white/30 z-50">
        <a href="/" class="flex flex-row items-center gap-1">
            <img src="/img/pizza-logo.png" class="h-12 w-12" alt="" />
            <div class="font-bold text-xl">НЯМ-НЯМ</div>
        </a>
        <NuxtLink v-if="route.name == 'cart'" to="/" class="btn-primary animate__animated animate__fadeIn">К выбору
        </NuxtLink>
        <!-- <NuxtLink v-if="route.name == 'order'" to="/cart" class="btn-primary animate__animated animate__fadeIn">К корзине
        </NuxtLink> -->
    </header>
    <div class="px-4 sm:container">
        <slot />
    </div>
</template>

<script setup lang="ts">

const route = useRoute()

const cartStore = useCartStore();
const { items: cartItems, totalItems, totalPrice } = storeToRefs(cartStore);


</script>