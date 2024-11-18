<template>
    <h1 class="py-5 animate__animated animate__fadeIn">Корзина</h1>
    <div class="grid sm:grid-rows-1 grid-cols-2 sm:grid-cols-3 gap-10 animate__animated animate__fadeIn">
        <div class="col-span-2 divide-y divide-dashed flex flex-col gap-6 max-h-[600px] overflow-scroll overflow-x-hidden">
            <CartOfPizza />
        </div>
        <div style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
            class="col-span-2 sm:col-span-1 sm:max-h-48 rounded-xl p-6 gap-6 flex flex-col divide-y divide-dashed animate__animated animate__fadeIn">
            <NuxtLink to="/order" class="btn-primary w-full text-center">Перейти к оформлению</NuxtLink>
            <div class="grow">
                <div class="flex flex-row items-center justify-between pt-4">
                    <div class="title">Корзина</div>
                    <div class="description">{{ totalItems }} товаров</div>
                </div>
                <div class="flex flex-row items-center justify-between py-2">
                    <div class="text-sm">Товары ({{ totalItems }})</div>
                    <div class="font-bold">{{ totalPrice }} ₽</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

useHead({
    title: "ням-ням"
});

const cartStore = useCartStore();
const { items: cartItems, totalItems, totalPrice } = storeToRefs(cartStore);

</script>