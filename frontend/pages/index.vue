<template>
    <h1 class="py-5">Пиццы</h1>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10">
        <div class="flex flex-col">
            <img src="/img/Pepperoni-Pizza.png" alt="">
            <h2 class="text-center">Пепперони</h2>
            <div class="text-gray-500 my-5 text-sm">Пикантная пепперони, увеличенная порция моцареллы, томаты, фирменный
                томатный
                соус
            </div>
            <div class="flex flex-row justify-between items-center pt-">
                <div>340 ₽</div>
                <button class="btn-primary" @click="addToCart({
                    id: 1,
                    name: 'Пепперони',
                    description: 'Пикантная пепперони, увеличенная порция моцареллы, томаты, фирменный томатный соус',
                    price: 340,
                    quantity: 1,
                    image: '/img/Pepperoni-Pizza.png'
                })">Выбрать</button>
            </div>
        </div>

    </div>
    <div>{{ totalPrice }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '~/stores/cart';
import { storeToRefs } from 'pinia';

useHead({
    title: "ням-ням"
});


const cartStore = useCartStore();
const { items: cartItems, totalItems, totalPrice } = storeToRefs(cartStore);

interface pizza {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
}


function addToCart(product: pizza) {
    cartStore.addItem({
        id: product.id,
        name: product.name,
        description: product.name,
        price: product.price,
        quantity: product.quantity,
        image: product.image
    });

}

</script>