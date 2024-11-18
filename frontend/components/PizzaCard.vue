<template>
    <div class="flex flex-col">
        <img :src="pizza.image" alt="">
        <div class="title text-center mt-4">{{ pizza.name }}</div>
        <div class="text-gray-500 my-5 description text-container">{{ pizza.description }}</div>
        <div class="flex flex-row justify-between items-center">
            <div class="price">{{ pizza.price }} ₽</div>
            <button class=""
                :class="{ 'btn-primary': quantitypizza(pizza) == 0, 'btn-secondary': quantitypizza(pizza) > 0 }"
                @click="showModal(pizza)">
                <div v-if="quantitypizza(pizza) == 0">
                    Выбрать
                </div>
                <div v-else>Добавить</div>
            </button>
        </div>
    </div>

    <div v-if="selectedPizza"
        class="fixed z-50 inset-0 overflow-y-auto animate__animated animate__fadeIn flex flex-col justify-center items-center">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true" @click="hideModal">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div
            class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-xs sm:max-w-xl md:max-w-3xl w-full">
            <div class="grid sm:grid-cols-2 grid-rows-1 divide-x">
                <div class="place-self-center">
                    <img class="w-64 sm:w-full my-4 px-4" :src="selectedPizza.image" alt="">
                </div>
                <div class="flex flex-col gap-3 p-3">
                    <div class="text-xl text-center pt-2">{{ selectedPizza.name }}</div>
                    <div class="bg-gray-100 rounded-xl p-3 description">{{ selectedPizza.description }}
                    </div>
                    <div class="grow flex flex-col justify-end">
                        <div v-if="selectedPizza.quantity == 0" class="text-center pb-2 description">{{
                            selectedPizza.price
                        }} ₽</div>
                        <hr class="dashed">
                        <div class="mt-3">
                            <button @click="addToCart(selectedPizza)" v-if="selectedPizza.quantity == 0"
                                class="btn-primary w-full">Добавить в
                                корзину</button>
                            <div v-else
                                class="flex flex-row gap-3 items-center justify-end animate__animated animate__fadeIn">
                                <div class="flex flex-row gap-2 items-center w-28">
                                    <button @click="removefromCart(selectedPizza)"
                                        class="w-8 bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-200 active:from-gray-200 active:to-gray-300 text-black text-2xl my-1 rounded-xl hover:shadow-inner active:shadow-none border">
                                        -
                                    </button>
                                    <div>{{ selectedPizza.quantity }}</div>
                                    <button @click="addToCart(selectedPizza)"
                                        class="w-8 bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-200 active:from-gray-200 active:to-gray-300 text-black text-2xl my-1 rounded-xl hover:shadow-inner active:shadow-none border">
                                        +
                                    </button>
                                </div>
                                <div class="grow flex justify-end items-center gap-1">
                                    <div class="price">{{ selectedPizza.price * selectedPizza.quantity }} ₽
                                    </div>
                                    <button class="btn-primary"
                                        @click="navigateTo('/cart'); selectedPizza = null;">Корзина</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

defineProps(['pizza'])

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

const selectedPizza = ref<pizza | null>();

function showModal(pizza: pizza) {
    selectedPizza.value = pizza;
    selectedPizza.value.quantity = quantitypizza(selectedPizza.value);
}

function hideModal() {
    selectedPizza.value = null;
}

function pizzaincart(pizza: pizza) {
    return cartItems.value.some((item) => item.id === pizza.id);
}

function quantitypizza(pizza: pizza) {
    if (cartItems.value.some((item) => item.id === pizza.id)) {
        return cartItems.value.filter((item) => item.id === pizza.id)[0].quantity
    }
    else return 0
}

function addToCart(pizza: pizza, count = 1) {
    pizza.quantity++
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