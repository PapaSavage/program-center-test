<template>
    <h1 class="py-5 animate__animated animate__fadeIn">Пицца</h1>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 animate__animated animate__fadeIn pb-20">
        <PizzaCard v-for="pizza in pizzas" :key="pizza.id" :pizza="pizza" />
    </div>
    <NuxtLink v-if="totalItems > 0" to="/cart"
        class="fixed bottom-5 right-5 bg-black p-3 px-5 rounded-full flex gap-2 text-white shadow-2xl animate__animated animate__fadeIn">
        Корзина
        <span class="text-primary flex flex-row items-center">{{ totalPrice
        }}₽
        </span>
    </NuxtLink>
</template>

<script setup lang="ts">

useHead({
    title: "ням-ням"
});

const test = ref(true)

interface pizza {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity?: number | any;
    image: string;
}
const pizzas = ref<pizza[]>()

await useFetch('http://127.0.0.1:8000/api/pizzas').then(response => {
    pizzas.value = response.data.value as pizza[];
    console.log(pizzas.value)
})

const cartStore = useCartStore();
const { items: cartItems, totalItems, totalPrice } = storeToRefs(cartStore);

</script>