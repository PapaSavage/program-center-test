<template>
    <div v-for="pizza in cartItems" class="flex flex-row justify-between gap-4 pt-10">
        <img class="w-32 h-32" :src="pizza.image" alt="">
        <div class="flex flex-col justify-between">
            <div>
                <div class="flex flex-row items-center gap-1">{{ pizza.name }}
                    <span class="block sm:hidden">/ {{ pizza.price * pizza.quantity }}₽</span>
                </div>
                <div class="font-light text-xs text-container-sm">{{ pizza.description }}</div>
            </div>
            <div class="flex sm:hidden flex-row ">
                <div class="flex flex-row gap-2 items-center w-28">
                    <button @click="removefromCart(pizza)"
                        class="w-8 bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-200 active:from-gray-200 active:to-gray-300 text-black text-2xl my-1 rounded-xl hover:shadow-inner active:shadow-none border">
                        -
                    </button>
                    <div>{{ pizza.quantity }}</div>
                    <button @click="addToCart(pizza)"
                        class="w-8 bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-200 active:from-gray-200 active:to-gray-300 text-black text-2xl my-1 rounded-xl hover:shadow-inner active:shadow-none border">
                        +
                    </button>
                </div>
                <button class="text-red-500 text-sm text-light" @click="clearitem(pizza)">Убрать</button>
            </div>
        </div>
        <div class="price pt-2 hidden sm:block">{{ pizza.price * pizza.quantity }}₽</div>
        <div class="hidden sm:flex flex-col items-center justify-between">
            <div class="flex flex-row gap-2 items-center justify-center w-36">
                <button @click="removefromCart(pizza)"
                    class="w-8 bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-200 active:from-gray-200 active:to-gray-300 text-black text-2xl my-1 rounded-xl hover:shadow-inner active:shadow-none border">
                    -
                </button>
                <div>{{ pizza.quantity }}</div>
                <button @click="addToCart(pizza)"
                    class="w-8 bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-200 active:from-gray-200 active:to-gray-300 text-black text-2xl my-1 rounded-xl hover:shadow-inner active:shadow-none border">
                    +
                </button>
            </div>
            <button class="text-red-500 text-sm text-light" @click="clearitem(pizza)">Убрать</button>
        </div>
    </div>
    <button class="text-red-500 text-sm text-light pt-4" @click="cartStore.clearCart(); navigateTo('/')">Очистить
        корзину</button>
</template>


<script setup lang="ts">

interface pizza {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity?: number | any;
    image: string;
}

const cartStore = useCartStore();
const { items: cartItems, totalItems, totalPrice } = storeToRefs(cartStore);

function quantitypizza(pizza: pizza) {
    if (cartItems.value.some((item) => item.id === pizza.id)) {
        return cartItems.value.filter((item) => item.id === pizza.id)[0].quantity
    }
    else return 0
}

function addToCart(pizza: pizza, count = 1) {
    cartStore.addItem({
        id: pizza.id,
        name: pizza.name,
        description: pizza.description,
        price: pizza.price,
        quantity: count,
        image: pizza.image
    });
}

function removefromCart(pizza: pizza) {
    pizza.quantity--
    if (quantitypizza(pizza) == 0) {
        cartStore.removeItem(pizza.id)
        if (totalItems.value == 0) {
            navigateTo("/")
        }
    }
    else {
        cartStore.updateItemQuantity(pizza.id, pizza.quantity)
    }
}

function clearitem(pizza: pizza) {
    cartStore.removeItem(pizza.id);
    if (totalItems.value == 0) {
        navigateTo("/")
    }
}

</script>