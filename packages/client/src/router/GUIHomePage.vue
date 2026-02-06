<script setup lang="ts">
import GUIHomeSidebar from "@/component/GUIHomeSidebar.vue";
import GUIEditor from "@/component/GUIEditor.vue";
import router from "@/router";
import { API_BASE_URL, AUTH_TOKEN_NAME } from "@/env";
import { onMounted, ref, watch } from "vue";
import { DocumentSchema, isNullish, ProfileSchema, useAwait } from "shared";
import { Share, Trash2 } from "lucide-vue-next";
import { useRoute } from "vue-router";
import { useDebounceFn } from "@vueuse/core";

function handleFetchProfile(auth: string) {
  return useAwait(async () => {
    const response = await fetch(API_BASE_URL + "/api/profile", {
      method: "GET",
      headers: { Authorization: "Bearer " + auth },
    });
    return ProfileSchema.getValidProfile(await response.json());
  });
}

function handleFetchDocumentCollection(auth: string) {
  return useAwait(async () => {
    const response = await fetch(API_BASE_URL + "/api/document", {
      method: "GET",
      headers: { Authorization: "Bearer " + auth },
    });
    const data = await response.json();
    return data as DocumentSchema.DocumentShape[];
  });
}

const profile = ref<ProfileSchema.ProfileShape>();
const currentDocument = ref<DocumentSchema.DocumentShape>();
const documentCollection = ref<DocumentSchema.DocumentShape[]>([]);
const route = useRoute();
const content = ref("");
const titleRef = ref<HTMLHeadingElement>();

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

  try {
    const response = await fetch(API_BASE_URL + "/api/document", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + auth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_author: profile.value.id_author,
        title: "New Document",
        content: "",
      }),
    });

    if (response.ok && response.status === 201) {
      const { data } = await handleFetchDocumentCollection(auth);

      if (data) documentCollection.value = data;
    }
  } catch (e) {
    console.error(e);
  }
}

async function handleDeleteDocument() {
  const document = currentDocument.value;

  if (isNullish(document)) {
    return console.error("Invalid Document");
  }

  const auth = localStorage.getItem(AUTH_TOKEN_NAME);

  if (auth === null) {
    router.push("/auth/sign-in");
    return;
  }

  try {
    const response = await fetch(API_BASE_URL + "/api/document/" + document.id_document, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + auth },
    });

    if (response.status === 204) {
      router.push("/home");
      documentCollection.value = documentCollection.value.filter(
        (doc) => doc.id_document != document.id_document,
      );
      currentDocument.value = undefined;
    }
  } catch (e) {
    console.error(e);
  }
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

  try {
    const response = await fetch(API_BASE_URL + "/api/document/" + id, {
      method: "GET",
      headers: { Authorization: "Bearer " + auth },
    });
    const data = DocumentSchema.getValidDocument(await response.json());

    currentDocument.value = data;
    content.value = currentDocument.value.content;
  } catch (e) {
    console.error(e);
  }
}

async function updateDocumentTitle(title: string) {
  const auth = localStorage.getItem(AUTH_TOKEN_NAME);
  const idDocument = currentDocument.value?.id_document;

  if (isNullish(auth) || isNullish(idDocument)) return;

  const docInList = documentCollection.value.find((d) => d.id_document === idDocument);
  if (docInList) docInList.title = title;

  try {
    await fetch(API_BASE_URL + "/api/document/" + idDocument, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + auth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...currentDocument.value, title }),
    });
  } catch (e) {
    console.error("Failed to update title:", e);
  }
}

async function updateDocumentContent(content: string) {
  const auth = localStorage.getItem(AUTH_TOKEN_NAME);
  const idDocument = currentDocument.value?.id_document;

  if (isNullish(auth) || isNullish(idDocument)) return;

  try {
    await fetch(API_BASE_URL + "/api/document/" + idDocument, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + auth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...currentDocument.value, content }),
    });
  } catch (e) {
    console.error("Failed to update content:", e);
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
  <div class="h-screen bg-[#FDFDFD] flex overflow-hidden">
    <GUIHomeSidebar
      :document-collection="documentCollection"
      :profile="profile"
      @on-create-document="handleCreateDocument"
    />
    <main class="flex-1 flex flex-col min-w-0 bg-white h-full overflow-hidden">
      <header
        class="h-16 border-b border-gray-50 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md z-10 shrink-0"
      >
        <div class="text-[10px] uppercase tracking-[0.3em] text-gray-300">
          Studio / {{ currentDocument?.title }}
        </div>
        <div class="flex items-center gap-2">
          <button
            class="p-2 text-gray-400 hover:text-gray-900 transition-colors"
            title="Share Document"
          >
            <Share :size="18" />
          </button>
          <button
            class="p-2 text-gray-300 hover:text-red-500 transition-colors"
            title="Delete Document"
            @click="handleDeleteDocument"
          >
            <Trash2 :size="18" />
          </button>
        </div>
      </header>
      <div class="flex-1 overflow-y-auto">
        <article class="max-w-3xl mx-auto px-12 py-20" :key="currentDocument?.id_document">
          <h1
            ref="titleRef"
            contenteditable="true"
            class="text-4xl tracking-tight text-gray-900 mb-12 outline-none focus:ring-0 empty:before:content-['Untitled'] empty:before:text-gray-300"
            @input="onTitleInput"
            spellcheck="false"
          >
            {{ currentDocument?.title }}
          </h1>
          <GUIEditor :content="content" @on-update="debouncedContentUpdate" />
        </article>
      </div>
    </main>
  </div>
</template>
