<template>
    <NuxtLink class="text-primary hover:underline" href="/cart">К корзине</NuxtLink>
    <h1 class="py-5 animate__animated animate__fadeIn pb-10">Оформление заказа</h1>

    <div v-if="isOrderSuccessful"
        class="fixed bottom-4 right-4 text-sm bg-green-600 text-white p-4 rounded-lg shadow-lg animate__animated animate__fadeIn">
        Заказ успешно оформлен! Мы скоро с вами свяжемся.
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 gap-16">
        <div class="col-span-2">
            <div class="grid grid-cols-2 gap-4">
                <div class="col-span-2 sm:col-span-1">
                    <label class="block text-sm font-medium text-gray-700">ФИО</label>
                    <input v-model="ordercred.name" :class="{ 'border-red-500': !validName }"
                        placeholder="Иванов Иван Иванович" type="text" />
                    <span v-if="!validName" class="text-red-500 text-xs">Введите ФИО</span>
                </div>
                <div class="col-span-2 sm:col-span-1">
                    <label class="block text-sm font-medium text-gray-700">Номер</label>
                    <input v-model="ordercred.phone" :class="{ 'border-red-500': !validPhone }" placeholder="+79999999999"
                        type="text" />
                    <span v-if="!validPhone" class="text-red-500 text-xs">Введите корректный номер телефона, начиная с
                        +</span>
                </div>
                <div class="col-span-2">
                    <label class="block text-sm font-medium text-gray-700">Адрес</label>
                    <input v-model="ordercred.address" :class="{ 'border-red-500': !validAddress }"
                        placeholder="ул. Пушкина 9" type="text" />
                    <span v-if="!validAddress" class="text-red-500 text-xs">Введите адрес</span>
                </div>
                <div class="col-span-2">
                    <label class="block text-sm font-medium text-gray-700">Комментарий к заказу</label>
                    <textarea v-model="ordercred.comment" placeholder="Оставьте комментарий"></textarea>
                </div>
            </div>
        </div>
        <div style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
            class="col-span-2 sm:col-span-1 max-h-44 rounded-xl p-6 gap-3 flex flex-col animate__animated animate__fadeIn">
            <div>
                <div class="flex flex-row items-center justify-between">
                    <div class="title">Итого</div>
                    <div class="font-bold">{{ totalPrice }} ₽</div>
                </div>
                <div class="flex flex-row items-center justify-between py-2">
                    <div class="text-sm">Товары </div>
                    <div class="font-bold">{{ totalItems }}шт</div>
                </div>
            </div>
            <hr class="dotted">
            <button :disabled="!isFormValid" @click="submitOrder"
                :class="{ 'btn-primary-disabled': !isFormValid, 'btn-primary': isFormValid }" class="w-full text-center">
                Оформить заказ
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
useHead({
    title: "ням-ням"
});

const cartStore = useCartStore();
const { items: cartItems, totalItems, totalPrice } = storeToRefs(cartStore);



interface ordercredential {
    name: string;
    phone: string;
    address: string;
    comment?: string;
}

interface ResponseData {
    message?: string;
    order_id?: number;
}

interface CartItem {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
}



const ordercred = ref<ordercredential>({ name: '', phone: '', address: '', comment: '' });

const isOrderSuccessful = ref(false);


const validName = computed(() => ordercred.value.name.trim() !== '');
const validPhone = computed(() => /^\+\d{11,15}$/.test(ordercred.value.phone));
const validAddress = computed(() => ordercred.value.address.trim() !== '');
const isFormValid = computed(() => validName.value && validPhone.value && validAddress.value);


const submitOrder = async () => {

    if (isFormValid.value) {
        const order = {
            fio: ordercred.value.name,
            phone: ordercred.value.phone,
            address: ordercred.value.address,
            comment: ordercred.value.comment,
            listofpizza: cartItems.value.map((item: CartItem) => ({
                id: item.id,
                quantity: item.quantity,
            })),
        }
        try {
            const data = await $fetch<ResponseData>('http://127.0.0.1:8000/api/create-order', {
                method: 'post',
                body: order,
            });

            if (data.message === 'success') {
                isOrderSuccessful.value = true;
                setTimeout(() => { isOrderSuccessful.value = false; }, 4000);
                ordercred.value = { name: '', phone: '', address: '', comment: '' };
                cartStore.clearCart();
                setTimeout(() => { navigateTo('/'); }, 4000);
            } else {
                console.error('Order submission failed:', data);
            }
        } catch (error) {
            console.error('An error occurred while submitting the order:', error);
        }
    }
}
</script>

<style scoped>
.border-red-500 {
    border-color: #f87171;
}
</style>
