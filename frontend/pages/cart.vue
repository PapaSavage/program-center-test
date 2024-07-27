<template>
    <h1 class="py-5 animate__animated animate__fadeIn">Корзина</h1>
    <div class="grid grid-rows-2 sm:grid-rows-1 grid-cols-2 sm:grid-cols-3 gap-10 animate__animated animate__fadeIn">
        <div class="col-span-2 divide-y divide-dashed flex flex-col gap-6 max-h-[600px] overflow-scroll overflow-x-hidden">
            <div v-for="pizza in cartItems" class="flex flex-row justify-between gap-4 pt-10">
                <img class="w-32 h-32" :src="pizza.image" alt="">
                <div>
                    <div>{{ pizza.name }}</div>
                    <div class="font-light text-xs text-container-sm">{{ pizza.description }}</div>
                </div>
                <div class="price pt-2">{{ pizza.price * pizza.quantity }}₽</div>
                <div class="">
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
                </div>
            </div>
            <div v-for="pizza in cartItems" class="flex flex-row justify-between gap-4 pt-10">
                <img class="w-32 h-32" :src="pizza.image" alt="">
                <div>
                    <div>{{ pizza.name }}</div>
                    <div class="font-light text-xs text-container-sm">{{ pizza.description }}</div>
                </div>
                <div class="price pt-2">{{ pizza.price * pizza.quantity }}₽</div>
                <div class="">
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
                </div>
            </div>
            <div v-for="pizza in cartItems" class="flex flex-row justify-between gap-4 pt-10">
                <img class="w-32 h-32" :src="pizza.image" alt="">
                <div>
                    <div>{{ pizza.name }}</div>
                    <div class="font-light text-xs text-container-sm">{{ pizza.description }}</div>
                </div>
                <div class="price pt-2">{{ pizza.price * pizza.quantity }}₽</div>
                <div class="">
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
                </div>
            </div>
        </div>
        <div style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
            class="max-h-48 rounded-xl p-6 gap-6 flex flex-col divide-y divide-dashed animate__animated animate__fadeIn">
            <button class="btn-primary w-full">Перейти к оформлению</button>
            <div class="grow ">
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
    }
    else {
        cartStore.updateItemQuantity(pizza.id, pizza.quantity)
    }
}

</script>