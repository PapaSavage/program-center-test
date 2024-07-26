import { ref, computed } from "vue";
import { defineStore } from "pinia";

interface CartItem {
	id: number;
	name: string;
	description: string;
	price: number;
	quantity: number;
	image: string;
}

export const useCartStore = defineStore("cart", () => {
	const items = ref<CartItem[]>([]);

	const totalItems = computed(() => {
		return items.value.reduce((total, item) => total + item.quantity, 0);
	});

	const totalPrice = computed(() => {
		return items.value.reduce(
			(total, item) => total + item.price * item.quantity,
			0
		);
	});

	function addItem(item: CartItem) {
		const existingItem = items.value.find((i) => i.id === item.id);
		if (existingItem) {
			existingItem.quantity += item.quantity;
		} else {
			items.value.push(item);
		}
	}

	function removeItem(itemId: number) {
		items.value = items.value.filter((item) => item.id !== itemId);
	}

	function clearCart() {
		items.value = [];
	}

	function updateItemQuantity(itemId: number, quantity: number) {
		const item = items.value.find((i) => i.id === itemId);
		if (item) {
			item.quantity = quantity;
		}
		if (item?.quantity === 0) {
			removeItem(itemId);
		}
	}

	return {
		items,
		totalItems,
		totalPrice,
		addItem,
		removeItem,
		clearCart,
		updateItemQuantity,
	};
});
