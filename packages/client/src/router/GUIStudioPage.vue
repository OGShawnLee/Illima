<script setup lang="ts">
import GUIHomeSidebar from "@/component/GUIHomeSidebar.vue";
import GUIEditor from "@/component/GUIEditor.vue";
import router from "@/router";
import api from "@/api";
import { AUTH_TOKEN_NAME } from "@/env";
import { onMounted, ref, watch } from "vue";
import { DocumentSchema, isNullish, ProfileSchema } from "shared";
import { Moon, Share, Sun, Trash2 } from "lucide-vue-next";
import { useRoute } from "vue-router";
import { useDark, useDebounceFn, useToggle } from "@vueuse/core";

function handleFetchProfile(auth: string) {
  return api.api.profile.get({ headers: { authorization: auth } });
}

function handleFetchDocumentCollection(auth: string) {
  return api.api.document.get({ headers: { authorization: auth } });
}

const profile = ref<ProfileSchema.ProfileShape>();
const currentDocument = ref<DocumentSchema.DocumentShape>();
const documentCollection = ref<DocumentSchema.DocumentShape[]>([]);
const route = useRoute();
const content = ref("");
const titleRef = ref<HTMLHeadingElement>();
const isDark = useDark();
const handleToggleTheme = useToggle(isDark);

watch(
  () => currentDocument.value,
  () => {
    if (titleRef.value && currentDocument.value) {
      titleRef.value.innerText = currentDocument.value.title;
      titleRef.value.innerHTML = currentDocument.value.title;
    }
  },
);
watch(() => route.params.id, handleFetchDocument, { immediate: true });
onMounted(async () => {
  const auth = localStorage.getItem(AUTH_TOKEN_NAME);

  if (auth == null) {
    router.push("/auth/sign-in");
    return;
  }

  const [profileResult, documentCollectionResult] = await Promise.all([
    handleFetchProfile(auth),
    handleFetchDocumentCollection(auth),
    handleFetchDocument(route.params.id),
  ]);

  if (profileResult.data) {
    profile.value = profileResult.data;
  } else {
    localStorage.removeItem(AUTH_TOKEN_NAME);
    router.push("/auth/sign-in");
  }

  if (documentCollectionResult.data) {
    documentCollection.value = documentCollectionResult.data;
  }
});

async function handleCreateDocument() {
  const auth = localStorage.getItem(AUTH_TOKEN_NAME);

  if (auth == null || isNullish(profile.value)) {
    router.push("/auth/sign-in");
    return;
  }

  const { error } = await api.api.document.post(
    { id_author: profile.value.id_author, title: "New Document", content: "" },
    { headers: { authorization: auth } },
  );

  if (error) {
    console.error("Failed to create document", error);
    return;
  }

  const { data } = await handleFetchDocumentCollection(auth);

  if (data) documentCollection.value = data;
}

async function handleDeleteDocument() {
  const auth = localStorage.getItem(AUTH_TOKEN_NAME);
  const document = currentDocument.value;

  if (isNullish(auth) || isNullish(document)) return;

  const { error } = await api.api
    .document({ id: document.id_document })
    .delete(undefined, { headers: { authorization: auth } });

  if (error) {
    console.error("Failed to delete document", error);
    return;
  }

  router.push("/studio");
  documentCollection.value = documentCollection.value.filter(
    (doc) => doc.id_document != document.id_document,
  );
  currentDocument.value = undefined;
}

async function handleFetchDocument(id: unknown) {
  if (typeof id !== "string" || isNullish(id)) {
    return console.error("Invalid Document ID");
  }

  const auth = localStorage.getItem(AUTH_TOKEN_NAME);

  if (auth === null) {
    router.push("/auth/sign-in");
    return;
  }

  const { data, error } = await api.api.document({ id }).get({ headers: { authorization: auth } });

  if (data) {
    currentDocument.value = data;
    content.value = currentDocument.value.content;
  } else {
    console.log("Failed to fetch document", error);
  }
}

async function updateDocumentTitle(title: string) {
  const auth = localStorage.getItem(AUTH_TOKEN_NAME);
  const doc = currentDocument.value;

  if (isNullish(auth) || isNullish(doc)) return;

  const docInList = documentCollection.value.find((d) => d.id_document === doc.id_document);
  if (docInList) docInList.title = title;

  const { error } = await api.api
    .document({ id: doc.id_document })
    .patch({ ...doc, title }, { headers: { authorization: auth } });

  if (error) {
    console.error("Failed to update title", error);
  }
}

async function updateDocumentContent(content: string) {
  const auth = localStorage.getItem(AUTH_TOKEN_NAME);
  const doc = currentDocument.value;

  if (isNullish(auth) || isNullish(doc)) return;

  const { error } = await api.api.document({ id: doc.id_document }).patch(
    { ...doc, content },
    {
      headers: { authorization: auth },
    },
  );

  if (error) {
    console.error("Failed to update content", e);
  }
}

const debouncedTitleUpdate = useDebounceFn((val: string) => {
  updateDocumentTitle(val);
}, 500);
const debouncedContentUpdate = useDebounceFn((val: string) => {
  updateDocumentContent(val);
}, 500);

function onTitleInput(e: Event) {
  const el = e.target as HTMLElement;
  debouncedTitleUpdate(el.innerText);
}
</script>

<template>
  <div
    class="h-screen flex overflow-hidden transition-colors duration-300 bg-[#FDFDFD] text-gray-900 dark:bg-[#0A0A0A] dark:text-gray-100"
  >
    <GUIHomeSidebar
      :document-collection="documentCollection"
      :profile="profile"
      @on-create-document="handleCreateDocument"
    />

    <main class="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-white dark:bg-[#121212]">
      <header
        class="h-16 border-b flex items-center justify-between px-8 backdrop-blur-md z-10 shrink-0 transition-colors border-gray-50 bg-white/80 dark:border-white/5 dark:bg-[#121212]/80"
      >
        <div
          class="text-[10px] uppercase tracking-[0.3em] font-medium text-gray-300 dark:text-gray-500"
        >
          Studio /
          <span class="text-gray-600 dark:text-gray-200">{{ currentDocument?.title }}</span>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="handleToggleTheme()"
            class="p-2 rounded-lg transition-colors text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
          >
            <Sun v-if="isDark" :size="18" />
            <Moon v-else :size="18" />
          </button>
          <button
            class="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <Share :size="18" />
          </button>
          <button class="p-2 text-gray-300 dark:text-gray-600 hover:text-red-500 transition-colors">
            <Trash2 :size="18" />
          </button>
        </div>
      </header>

      <div class="flex-1 overflow-y-auto custom-scrollbar">
        <article class="max-w-3xl mx-auto px-12 py-20" :key="currentDocument?.id_document">
          <h1
            ref="titleRef"
            contenteditable="true"
            class="text-4xl tracking-tight mb-12 outline-none focus:ring-0 spellcheck-false text-gray-900 dark:text-white empty:before:text-gray-300 dark:empty:before:text-gray-700 empty:before:content-['Untitled']"
            @input="onTitleInput"
          >
            {{ currentDocument?.title }}
          </h1>

          <GUIEditor
            :class="isDark ? 'prose-dark' : 'prose-light'"
            :content="content"
            @on-update="debouncedContentUpdate"
          />
        </article>
      </div>
    </main>
  </div>
</template>
