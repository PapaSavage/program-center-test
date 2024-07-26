<template>
    <header
        class="sticky top-0 px-4 py-4 sm:container mx-auto flex flex-row items-center justify-between backdrop-blur-lg bg-white/30 z-40">
        <a href="/" class="flex flex-row items-center gap-1">
            <img src="/img/pizza-logo.png" class="h-12 w-12" alt="" />
            <div class="font-bold text-xl">НЯМ-НЯМ</div>
        </a>
        <button class="bg-black p-3 px-5 rounded-full text-white shadow-2xl">Корзина</button>
    </header>
    <div class="px-4 sm:container">
        <slot />
    </div>
</template>