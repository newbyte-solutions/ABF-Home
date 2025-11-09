// composables/useConfirmation.ts
import { ref } from "vue";

export function useConfirmation() {
  const isVisible = ref(false);
  const title = ref("");
  const message = ref("");
  let resolver: ((result: boolean) => void) | null = null;

  function confirm(newTitle: string, newMessage: string): Promise<boolean> {
    title.value = newTitle;
    message.value = newMessage;
    isVisible.value = true;

    return new Promise((resolve) => {
      resolver = resolve;
    });
  }

  function onConfirm() {
    isVisible.value = false;
    if (resolver) resolver(true);
  }

  function onCancel() {
    isVisible.value = false;
    if (resolver) resolver(false);
  }

  return {
    isVisible,
    title,
    message,
    confirm,
    onConfirm,
    onCancel,
  };
}
