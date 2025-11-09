<template>
    <div class="w-full min-h-screen bg-gray-900 flex flex-col items-center justify-start py-14 px-4">
        <div class="w-full text-center my-8">
            <h1 class="text-3xl font-bold text-white">Opprett Elev bedrift</h1>
            <p class="text-lg text-gray-300 mx-auto max-w-4xl mt-4 px-2">
                Her kan du opprette en bedrift som vil vises på nettsiden. Det er viktig at du dobbelsjekket all informasjon før du sender inn, da dette vil være synlig for alle brukere av systemet. Tullebedrifter eller feilinformasjon kan føre til at bedriften blir fjernet fra systemet.
            </p>

            <div class="w-full mt-6 px-4">
                <form @submit.prevent="handleNewCompany" class="mt-8 max-w-2xl mx-auto bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700">
                    <h2 class="font-bold text-2xl text-center mb-6 text-white">Registrer din bedrift</h2>
                    
                    <div class="space-y-4">
                        <div>
                            <label for="companyName" class="block text-sm font-medium text-gray-300 mb-2">Bedriftsnavn *</label>
                            <input
                                required
                                type="text"
                                v-model="companyName"
                                placeholder="Skriv bedriftsnavn"
                                id="companyName"
                                name="companyName"
                                class="w-full p-3 rounded-lg bg-gray-700/50 text-white placeholder-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                            />
                        </div>
                        
                        <div>
                            <label for="companyEmail" class="block text-sm font-medium text-gray-300 mb-2">E-post *</label>
                            <input
                                required
                                type="email"
                                v-model="companyEmail"
                                placeholder="bedrift@eksempel.no"
                                id="companyEmail"
                                name="companyEmail"
                                class="w-full p-3 rounded-lg bg-gray-700/50 text-white placeholder-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                            />
                        </div>
                        
                        <div>
                            <label for="companyPhone" class="block text-sm font-medium text-gray-300 mb-2">Telefonnummer *</label>
                            <input
                                required
                                type="tel"
                                v-model="companyPhone"
                                placeholder="+47 123 45 678"
                                id="companyPhone"
                                name="companyPhone"
                                class="w-full p-3 rounded-lg bg-gray-700/50 text-white placeholder-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                            />
                        </div>
                        
                        <div>
                            <label for="contactPerson" class="block text-sm font-medium text-gray-300 mb-2">Kontaktperson *</label>
                            <input
                                required
                                type="text"
                                v-model="contactPerson"
                                placeholder="Fornavn Etternavn"
                                id="contactPerson"
                                name="contactPerson"
                                class="w-full p-3 rounded-lg bg-gray-700/50 text-white placeholder-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                            />
                        </div>
                        
                        <div>
                            <label for="companyGrade" class="block text-sm font-medium text-gray-300 mb-2">Klasse *</label>
                            <select
                                required
                                v-model="companyGrade"
                                id="companyGrade"
                                name="companyGrade"
                                class="w-full p-3 rounded-lg bg-gray-700/50 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 cursor-pointer"
                            >
                                <option value="">Velg Klasse</option>
                                <option value="8">8.</option>
                                <option value="9">9.</option>
                                <option value="10">10.</option>
                            </select>
                        </div>
                        
                        <div>
                            <label for="companyFounded" class="block text-sm font-medium text-gray-300 mb-2">Stiftelsesdato *</label>
                            <input
                                required
                                type="date"
                                v-model="companyFounded"
                                id="companyFounded"
                                name="companyFounded"
                                class="w-full p-3 rounded-lg bg-gray-700/50 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                            />
                        </div>
                        
                        <div>
                            <label for="companyLogo" class="block text-sm font-medium text-gray-300 mb-2">Bedriftslogo *</label>
                            <input
                                required
                                type="file"
                                @change="handleLogoUpload"
                                accept="image/*"
                                id="companyLogo"
                                name="companyLogo"
                                class="w-full p-3 rounded-lg bg-gray-700/50 text-white border border-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer transition duration-200"
                            />
                        </div>
                        
                        <div>
                            <label for="companyDescription" class="block text-sm font-medium text-gray-300 mb-2">Beskrivelse (valgfritt)</label>
                            <textarea
                                v-model="companyDescription"
                                placeholder="Kort beskrivelse av bedriften"
                                id="companyDescription"
                                name="companyDescription"
                                rows="3"
                                class="w-full p-3 rounded-lg bg-gray-700/50 text-white placeholder-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none"
                            ></textarea>
                        </div>
                    </div>
                    
                    <button
                        type="submit"
                        :disabled="isSubmitting"
                        class="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] active:scale-[0.98] transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {{ isSubmitting ? 'Registrerer...' : 'Registrer Bedrift' }}
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const config = useRuntimeConfig();

const companyName = ref('');
const companyEmail = ref('');
const companyPhone = ref('');
const contactPerson = ref('');
const companyFounded = ref('');
const companyGrade = ref('');
const companyLogo = ref<File | null>(null);
const companyDescription = ref('');
const isSubmitting = ref(false);

const handleLogoUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        companyLogo.value = target.files[0];
    }
};

const handleNewCompany = async () => {
    if (isSubmitting.value) return;
    
    isSubmitting.value = true;
    
    try {
        const formData = new FormData();
        formData.append('companyName', companyName.value);
        formData.append('companyEmail', companyEmail.value);
        formData.append('companyPhone', companyPhone.value);
        formData.append('companyContactPerson', contactPerson.value);
        formData.append('companyGrade', companyGrade.value);
        formData.append('companyFounded', companyFounded.value);
        
        if (companyLogo.value) {
            formData.append('companyLogo', companyLogo.value);
        }
        
        if (companyDescription.value) {
            formData.append('companyDescription', companyDescription.value);
        }
        
        const response = await axios.post(
            `${config.public.apiBase}/company/new_company`,
            formData,
            {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' },
            }
        );

        if (response.data) {
            // Reset form
            companyName.value = '';
            companyEmail.value = '';
            companyPhone.value = '';
            contactPerson.value = '';
            companyFounded.value = '';
            companyGrade.value = '';
            companyLogo.value = null;
            companyDescription.value = '';
            
            // Reset file input
            const fileInput = document.getElementById('companyLogo') as HTMLInputElement;
            if (fileInput) fileInput.value = '';

            alert('Bedriften ble registrert! 🎉');
        }
    } catch (error: any) {
        console.error('Bedriftsregistrering feilet:', error);
        alert(error.response?.data?.message || 'Registrering feilet. Vennligst prøv igjen.');
    } finally {
        isSubmitting.value = false;
    }
};
</script>