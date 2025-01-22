<template>
    <div class="w-full mt h-fit py-10 flex justify-center items-center bg-gradient-to-br from-blue-700 to-purple-600 drop-shadow-2xl -z-20">
        <h1 class="mt-20 font-bold text-5xl text-white">9. Klasse</h1>
    </div>
    <div class="w-full min-h-screen py-4 bg-white text-black flex flex-col">
        <h2 class="text-center text-2xl font-semibold mb-4">Elevbedrifter</h2>
        <div class="w-full px-0 md:px-10">
            <div class="w-full rounded-lg bg-gray-200 h-56 flex flex-row justify-between items-center px-4">
                <div class="max-w-[200px] max-h-[200px]"><router-link to="/company/_id" class=""><img src="https://placehold.co/200x200" alt="Placeholder image for student company."></router-link></div>
                <div class="max-w-[200px] max-h-[200px]"><router-link to="/company/_id" class=""><img src="https://placehold.co/200x200" alt="Placeholder image for student company."></router-link></div>
                <div class="max-w-[200px] max-h-[200px]"><router-link to="/company/_id" class=""><img src="https://placehold.co/200x200" alt="Placeholder image for student company."></router-link></div>
                <div class="max-w-[200px] max-h-[200px]"><router-link to="/company/_id" class=""><img src="https://placehold.co/200x200" alt="Placeholder image for student company."></router-link></div>
                <div class="max-w-[200px] max-h-[200px]"><router-link to="/company/_id" class=""><img src="https://placehold.co/200x200" alt="Placeholder image for student company."></router-link></div>
            </div>
        </div>
        <h2 class="text-center text-2xl font-semibold my-4">Nyheter</h2>
        <div class="w-full h-fit px-0 md:px-10 flex flex-col md:flex-row items-center justify-center md:space-x-20">
            <router-link to="/nyheter/_id">
                <div class="w-56 h-80 bg-gray-200 hover:scale-110 transition">
                    <img src="https://placehold.co/300x200" alt="Placeholder image for news cards." class="max-w-full max-h-[200px] drop-shadow-xl">
                    <h1 class="text-xl font-semibold text-center my-4">Tittel</h1>
                    <p class="px-2">En kort beskrivelse eller forhåndsvisning av artikkelen.</p>
                </div>
            </router-link>
            <router-link to="/nyheter/_id">
                <div class="w-56 h-80 bg-gray-200 hover:scale-110 transition">
                    <img src="https://placehold.co/300x200" alt="Placeholder image for news cards." class="max-w-full max-h-[200px] drop-shadow-xl">
                    <h1 class="text-xl font-semibold text-center my-4">Tittel</h1>
                    <p class="px-2">En kort beskrivelse eller forhåndsvisning av artikkelen.</p>
                </div>
            </router-link>
            <router-link to="/nyheter/_id">
                <div class="w-56 h-80 bg-gray-200 hover:scale-110 transition">
                    <img src="https://placehold.co/300x200" alt="Placeholder image for news cards." class="max-w-full max-h-[200px] drop-shadow-xl">
                    <h1 class="text-xl font-semibold text-center my-4">Tittel</h1>
                    <p class="px-2">En kort beskrivelse eller forhåndsvisning av artikkelen.</p>
                </div>
            </router-link>
        </div>
        <router-link to="/nyheter" class="w-fit px-10 py-4 mt-10 border-2 border-green-400 bg-transparent hover:bg-green-400 transition mx-auto">
            Se mer
        </router-link>
        <h2 class="text-center text-2xl font-semibold my-10">Klasseliste</h2>
        <div class="w-full px-4 md:px-20">
            <p class="text-center">Liste, Over, Elever, I, Klassen, .</p>
        </div>
        <div class="my-20"></div>
    </div>
</template>