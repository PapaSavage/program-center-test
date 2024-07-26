<template>
    <header
        class="sticky top-0 px-4 py-4 sm:container mx-auto flex flex-row items-center justify-between backdrop-blur-lg bg-white/30 z-5">
        <a href="/" class="flex flex-row items-center gap-1">
            <img src="/img/pizza-logo.png" class="h-12 w-12" alt="" />
            <div class="font-bold text-xl">НЯМ-НЯМ</div>
        </a>
        <button
            class="bg-black p-3 px-5 rounded-full flex flex-row items-center justify-center gap-2 text-white shadow-2xl">
            Корзина
            <span class="text-xs text-primary flex flex-row items-center">{{ totalPrice
                }}₽
            </span></button>
    </header>
    <div class="px-4 sm:container">
        <slot />
    </div>
</template>

<script setup lang="ts">

const cartStore = useCartStore();
const { items: cartItems, totalItems, totalPrice } = storeToRefs(cartStore);

</script>